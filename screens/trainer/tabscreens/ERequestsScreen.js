import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/Styles';
import {blue, green} from '../../../styles/Colors';
import requestStyles from '../../../styles/RequestStyles';
import {useFocusEffect} from '@react-navigation/native';
import {getRequests, JWToken, RefreshToken} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import eRequestStyles from '../styles/ERequestStyles';

const ERequestsScreen = ({navigation, route}) => {
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getRequests(page, 100)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setRequests([...requests, ...response.data.requests]);
          console.log('Fetched ' + page);
        })
        .catch(error => {
          console.log(error);
        });

      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to log out?', [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: async () => {
              await _removeData(JWToken);
              await _removeData(RefreshToken);

              navigation.navigate('Login');
              return true;
            },
          },
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [page, navigation]),
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRequests([]);
    getRequests(0, 100)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setRequests([...requests, ...response.data.requests]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        console.log(error);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadMoreERequests = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={eRequestStyles.requests}
        data={requests}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreERequests}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                eRequestStyles.card,
                {marginTop: index === 0 ? 0 : '3%'},
              ]}>
              <View style={eRequestStyles.titleContent}>
                <Text style={requestStyles.title}>
                  {item.id + ' ' + item.title + ' ' + item.difficulty}
                </Text>
                <Text
                  style={[
                    requestStyles.status,
                    {
                      color:
                        item.status === 'DONE'
                          ? green
                          : item.status === 'IN PROGRESS'
                          ? blue
                          : 'red',
                    },
                  ]}>
                  {item.status}
                </Text>
              </View>
              <View style={eRequestStyles.bodyPart}>
                <Text style={eRequestStyles.bodyPartText}>{item.bodyPart}</Text>
              </View>
              <View style={eRequestStyles.description}>
                <Text>{item.description}</Text>
              </View>
              <View style={eRequestStyles.cardFooter}>
                <TouchableOpacity
                  style={eRequestStyles.btn}
                  onPress={() => {
                      console.log(item.title);
                    navigation.navigate('CreateTraining', {
                      user: item.user,
                      name: item.title,
                      difficulty: item.difficulty,
                      training: null,
                    });
                  }}>
                  <Text style={eRequestStyles.btnText}>Create training</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ERequestsScreen;
