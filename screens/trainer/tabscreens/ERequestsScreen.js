import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/Styles';
import {blue, green, grey} from '../../../styles/Colors';
import requestStyles from '../../../styles/RequestStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  editRequest,
  getRequests,
  JWToken,
  RefreshToken,
} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import eRequestStyles from '../styles/ERequestStyles';
import trainingsStyles from '../../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ERequestsScreen = ({navigation, route}) => {
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getRequests(page, 100, 'NEW', query)
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
    }, [query, page, navigation]),
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRequests([]);
    getRequests(0, 100, 'NEW', query)
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
  }, [query]);

  const loadMoreERequests = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text.length >= 3) {
      setRequests([]);
      setPage(0);
      setQuery(text);
      console.log('Query: ' + query);
      console.log('Preparing to fetch page ' + page);
    } else if (text.length === 0) {
      setRequests([]);
      setPage(0);
      setQuery('');
    }
  };
  const renderSearch = () => {
    return (
      <View style={trainingsStyles.formContent}>
        <View style={trainingsStyles.inputContainer}>
          <FontAwesome5
            name={'search'}
            size={20}
            color={grey}
            style={trainingsStyles.searchIcon}
          />
          <TextInput
            maxLength={255}
            style={trainingsStyles.inputs}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={text => handleSearch(text)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderSearch()}
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
                    editRequest(item.id, {status: 'IN PROGRESS'})
                      .then(response => {
                        console.log(
                          'Request ' +
                            response.data.id +
                            ' status: ' +
                            response.data.status,
                        );
                      })
                      .catch(error => console.log(error));
                    navigation.navigate('CreateTraining', {
                      request: item,
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
