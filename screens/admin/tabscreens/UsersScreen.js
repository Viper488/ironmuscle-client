import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/native';
import {getUsers, JWToken, RefreshToken} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import filter from 'lodash.filter';
import trainingsStyles from '../../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {black2, grey} from '../../../styles/Colors';
import eRequestStyles from '../../trainer/styles/ERequestStyles';
import tdStyles from '../../../styles/TrainingDetailsStyles';
import requestStyles from '../../../styles/RequestStyles';

const UsersScreen = ({navigation, route}) => {
  const [users, setUsers] = useState([]);
  const [fullUsers, setFullUsers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getUsers(page, 100)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setUsers([...users, ...response.data.users]);
          setFullUsers([...users, ...response.data.users]);
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
    setUsers([]);
    setFullUsers([]);
    getUsers(0, 100)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setUsers([...users, ...response.data.users]);
        setFullUsers([...users, ...response.data.users]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        console.log(error);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadMoreUsers = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text === '') {
      setUsers(fullUsers);
    } else {
      const filteredData = filter(users, item => {
        return contains(item, text);
      });
      setUsers(filteredData);
    }
  };

  const contains = (item, query) => {
    let lowerQuery = query.toLowerCase();
    return item.name.toLowerCase().includes(lowerQuery);
  };

  return (
    <View style={styles.container}>
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
            onChangeText={query => handleSearch(query)}
          />
        </View>
      </View>
      <FlatList
        style={eRequestStyles.requests}
        data={users}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreUsers}
        renderItem={({item, index}) => {
          return (
            <View style={[tdStyles.card, {marginTop: index === 0 ? 0 : '3%'}]}>
              <Text style={tdStyles.exerciseName}>{item.username}</Text>
            </View>
          );
        }}
      />
      <TouchableOpacity style={requestStyles.floatingBtn} onPress={() => {}}>
        <FontAwesome5 name={'plus'} size={30} color={black2} />
      </TouchableOpacity>
    </View>
  );
};

export default UsersScreen;
