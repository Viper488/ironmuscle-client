import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {
  getUsers,
  handleError,
  JWToken,
  lockUser,
  RefreshToken,
} from '../../../Networking';
import {_removeData, _storeData, LOGIN} from '../../../AsyncStorageManager';
import trainingsStyles from '../../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {black2, grey, grey6} from '../../../styles/Colors';
import eRequestStyles from '../../trainer/styles/ERequestStyles';
import tdStyles from '../../../styles/TrainingDetailsStyles';
import requestStyles from '../../../styles/RequestStyles';
import rankingStyles from '../../../styles/RankingStyles';
import {RFValue} from 'react-native-responsive-fontsize';
import usersStyles from '../styles/UsersStyles';

const UsersScreen = ({navigation, route}) => {
  const [changed, setChanged] = useState(false);
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      console.log('Request: ' + query);
      getUsers(page, 100, query)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setUsers([...users, ...response.data.users]);
          console.log('Fetched Page ' + page);
          console.log('Fetched Length ' + response.data.users.length);
        })
        .catch(error => {
          if (error) {
            handleError({navigation, error});
          }
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
              await _storeData(LOGIN, 'false');

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
    setUsers([]);
    console.log('Request: ' + query);
    getUsers(0, 100, query)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setUsers(response.data.users);
        console.log('Fetched Page ' + page);
        console.log('Fetched Length ' + response.data.users.length);
        console.log('Fetched Length ' + users.length);
      })
      .catch(error => {
        if (error) {
          handleError({navigation, error});
        }
      });
    wait(2000).then(() => setRefreshing(false));
  }, [query]);

  const loadMoreUsers = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text.length >= 3) {
      setUsers([]);
      setPage(0);
      setQuery(text);
      console.log('Query: ' + query);
      console.log('Preparing to fetch page ' + page);
    } else if (text.length === 0) {
      setUsers([]);
      setPage(0);
      setQuery('');
    }
  };

  return (
    <View style={styles.container}>
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
      <FlatList
        style={eRequestStyles.requests}
        data={users}
        extraData={changed}
        keyExtractor={item => {
          return item.id;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreUsers}
        renderItem={({item, index}) => {
          return (
            <View
              style={[usersStyles.card, {marginTop: index === 0 ? 0 : '3%'}]}>
              <View style={usersStyles.avatarContent}>
                <Image
                  style={rankingStyles.avatarItem}
                  source={{
                    uri: 'data:image/png;base64,' + item.icon,
                  }}
                />
              </View>
              <Text style={tdStyles.exerciseName}>
                {item.username}: {item.roles.map(r => r.name)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  let lock = !item.locked;
                  lockUser(item.id, {email: null, lock: lock})
                    .then(response => {
                      item.locked = lock;
                      setChanged(!changed);
                      console.log(
                        'User ' + item.username + ' is ' + item.locked,
                      );
                    })
                    .catch(error => console.log(error));
                }}>
                <FontAwesome5
                  name={item.locked ? 'lock-open' : 'lock'}
                  color={black2}
                  size={RFValue(20)}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={requestStyles.floatingBtn}
        onPress={() => {
          navigation.navigate('ACreateUser');
        }}>
        <FontAwesome5 name={'plus'} size={RFValue(30)} color={black2} />
      </TouchableOpacity>
    </View>
  );
};

export default UsersScreen;
