import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {
  getTrainingDetails,
  getTrainings,
  JWToken,
  RefreshToken,
} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import eRequestStyles from '../styles/ERequestStyles';
import trainingsStyles from '../../../styles/TrainingsStyles';
import Bolts from '../../components/Bolts';
import requestStyles from '../../../styles/RequestStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {black2, grey, white} from '../../../styles/Colors';

const ETrainingsScreen = ({navigation, route}) => {
  const [trainings, setTrainings] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getTrainings(page, 100, query)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setTrainings([...trainings, ...response.data.trainings]);
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
    setTrainings([]);
    getTrainings(0, 100, query)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTrainings([...trainings, ...response.data.trainings]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        console.log(error);
      });
    wait(2000).then(() => setRefreshing(false));
  }, [query]);

  const loadMoreTrainings = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text.length >= 3) {
      setTrainings([]);
      setPage(0);
      setQuery(text);
      console.log('Query: ' + query);
      console.log('Preparing to fetch page ' + page);
    } else if (text.length === 0) {
      setTrainings([]);
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
      <FlatList
        style={eRequestStyles.requests}
        data={trainings}
        keyExtractor={(item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreTrainings}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                trainingsStyles.card,
                {marginTop: index === 0 ? 0 : '3%'},
              ]}>
              <View style={trainingsStyles.imageContent}>
                <View style={trainingsStyles.cardContent}>
                  <Text style={trainingsStyles.name}>
                    {item.name} {item.difficulty}
                  </Text>
                  <View style={trainingsStyles.bolts}>
                    <Bolts difficulty={item.difficulty} size={25} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      getTrainingDetails(item.id)
                        .then(response => {
                          if (
                            response.data.exercises !== null &&
                            response.data.exercises.length > 0
                          ) {
                            response.data.exercises.forEach((e, i) =>
                              Object.assign(e, {
                                key: e.id + '_' + i,
                                selected: true,
                                type: e.time === 0 ? 'Repetitions' : 'Time',
                              }),
                            );
                          }

                          console.log(response.data.exercises);
                          navigation.navigate('EditExercises', {
                            request: null,
                            training: item,
                            edit: true,
                            selectedExercises: response.data.exercises,
                          });
                        })
                        .catch(error => {
                          console.log(error);
                        });
                    }}>
                    <FontAwesome5
                      name={'cog'}
                      size={20}
                      color={white}
                      style={trainingsStyles.searchIcon}
                    />
                  </TouchableOpacity>
                </View>
                <Image
                  style={trainingsStyles.image}
                  source={{uri: item.image}}
                />
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={requestStyles.floatingBtn}
        onPress={() => {
          navigation.navigate('CreateTraining', {
            request: null,
            training: null,
          });
        }}>
        <FontAwesome5 name={'plus'} size={30} color={black2} />
      </TouchableOpacity>
    </View>
  );
};

export default ETrainingsScreen;
