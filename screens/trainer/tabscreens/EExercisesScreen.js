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
import {
  getExercises,
  getTrainings,
  JWToken,
  RefreshToken,
} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import filter from 'lodash.filter';
import trainingsStyles from '../../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {black2, grey, white} from '../../../styles/Colors';
import eRequestStyles from '../styles/ERequestStyles';
import requestStyles from '../../../styles/RequestStyles';
import tdStyles from '../../../styles/TrainingDetailsStyles';

const EExercisesScreen = ({navigation, route}) => {
  const [exercises, setExercises] = useState([]);
  const [fullExercises, setFullExercises] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getExercises(page, 30)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setExercises([...exercises, ...response.data.exercises]);
          setFullExercises([...exercises, ...response.data.exercises]);
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
    setExercises([]);
    setFullExercises([]);
    getExercises(0, 30)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setExercises([...exercises, ...response.data.exercises]);
        setFullExercises([...exercises, ...response.data.exercises]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        console.log(error);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadMoreTrainings = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text === '') {
      setExercises(fullExercises);
    } else {
      const filteredData = filter(exercises, item => {
        return contains(item, text);
      });
      setExercises(filteredData);
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
        data={exercises}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreTrainings}
        renderItem={({item, index}) => {
          return (
            <View style={[tdStyles.card, {marginTop: index === 0 ? 0 : '3%'}]}>
              <Text style={tdStyles.exerciseName}>{item.name}</Text>
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

export default EExercisesScreen;
