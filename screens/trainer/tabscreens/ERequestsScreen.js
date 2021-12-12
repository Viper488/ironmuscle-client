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
import {blue, blue3, green, grey, red} from '../../../styles/Colors';
import requestStyles from '../../../styles/RequestStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  editRequest,
  getRequests,
  handleError,
  JWToken,
  RefreshToken,
} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import eRequestStyles from '../styles/ERequestStyles';
import trainingsStyles from '../../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getDateTime} from '../../functions/Functions';
import {RFValue} from 'react-native-responsive-fontsize';

const ERequestsScreen = ({navigation, route}) => {
  const [requests, setRequests] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getRequests(page, 100, 'new', query)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setRequests([...requests, ...response.data.requests]);
          console.log('Fetched ' + page);
        })
        .catch(error => {
          handleError({navigation, error});
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
    getRequests(0, 100, 'new', query)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setRequests([...requests, ...response.data.requests]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        handleError({navigation, error});
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
            size={RFValue(20)}
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

  const renderRequest = (item, index) => {
    return (
      <View style={[requestStyles.card, {marginTop: index === 0 ? 0 : '3%'}]}>
        <View style={requestStyles.titleContent}>
          <Text style={requestStyles.title}>
            {item.title + ' ' + item.difficulty}
          </Text>
          <Text
            style={[
              requestStyles.status,
              {
                color:
                  item.status === 'done'
                    ? green
                    : item.status === 'in progress'
                    ? blue3
                    : red,
              },
            ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <View style={requestStyles.descriptionContent}>
          <View>
            <Text style={requestStyles.bodyPart}>
              {item.bodyPart.toUpperCase()}
            </Text>
            <Text style={requestStyles.description}>{item.description}</Text>
          </View>
          <View>
            {item.user !== null ? (
              <View style={requestStyles.trainer}>
                <FontAwesome5 name={'user'} size={RFValue(30)} color={grey} />
                <Text style={requestStyles.description}>{item.user.username}</Text>
              </View>
            ) : undefined}
          </View>
        </View>
        <View style={requestStyles.timeContent}>
          <View>
            <Text style={requestStyles.time}>Created: </Text>
            <Text style={requestStyles.time}>
              {getDateTime(item.created_at)}
            </Text>
          </View>
          {item.resolved_at === null ? undefined : (
            <View>
              <Text style={requestStyles.time}>Resolved: </Text>
              <Text style={requestStyles.time}>
                {getDateTime(item.resolved_at)}
              </Text>
            </View>
          )}
        </View>
        <View style={eRequestStyles.cardFooter}>
          <TouchableOpacity
            style={eRequestStyles.btn}
            onPress={() => {
              navigation.navigate('CreateTraining', {
                request: item,
              });
            }}>
            <Text style={eRequestStyles.btnText}>Create training</Text>
          </TouchableOpacity>
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
        renderItem={({item, index}) => renderRequest(item, index)}
      />
    </View>
  );
};

export default ERequestsScreen;
