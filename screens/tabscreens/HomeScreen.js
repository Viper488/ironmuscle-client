import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  TextInput,
  FlatList,
} from 'react-native';
import styles from '../../styles/Styles';
import homeStyles from '../../styles/HomeStyles';
import {
  getStandardTrainings,
  getTrainingDetails,
  getTrainingsByUser,
  JWToken,
  RefreshToken,
} from '../../Networking';
import {_removeData, _storeData} from '../../AsyncStorageManager';
import {black, black2, grey, yellow} from '../../styles/Colors';
import trainingsStyles from '../../styles/TrainingsStyles';
import {useFocusEffect} from '@react-navigation/native';
import Bolts from '../components/Bolts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import filter from 'lodash.filter';
import historyStyles from '../../styles/HistoryStyles';

const HomeScreen = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [fullData, setFullData] = useState({});
  const [type, setType] = useState('STANDARD');

  useFocusEffect(
    React.useCallback(() => {
      getStandardTrainings()
        .then(response => {
          console.log(response.data);
          setData(response.data);
          setFullData(response.data);
          setType('STANDARD');
        })
        .catch(error => {
          console.log(error);
        });
      //}

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
    }, [navigation]),
  );

  const handleSearch = text => {
    if (text === '') {
      setData(fullData);
    } else {
      const filteredData = filter(data, item => {
        return contains(item, text);
      });
      setData(filteredData);
    }
  };

  const contains = (item, query) => {
    let lowerQuery = query.toLowerCase();
    if (item.name.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    if (item.difficulty.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    return item.points == lowerQuery;
  };

  const cardClickEventListener = item => {
    getTrainingDetails(item.id)
      .then(response => {
        let i = 1;
        response.data.exercises.forEach(exercise => {
          exercise.key = i;
          i++;
        });
        navigation.navigate('TrainingDetails', {
          type: item.type,
          training: response.data.training,
          exercises: response.data.exercises,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={[styles.container, {padding: '2.5%'}]}>
      <View style={homeStyles.trainingsContent}>
        <View style={trainingsStyles.formContent}>
          <View style={trainingsStyles.inputContainer}>
            <FontAwesome5
              name={'search'}
              size={20}
              color={grey}
              style={trainingsStyles.searchIcon}
            />
            <TextInput
              style={trainingsStyles.inputs}
              placeholder="Search"
              underlineColorAndroid="transparent"
              onChangeText={query => handleSearch(query)}
            />
          </View>
        </View>
        <View style={homeStyles.types}>
          <TouchableOpacity
            style={homeStyles.typeBtn}
            onPress={() => {
              getStandardTrainings()
                .then(response => {
                  console.log(response.data);
                  setData(response.data);
                  setFullData(response.data);
                  setType('STANDARD');
                })
                .catch(error => {
                  console.log(error);
                });
            }}>
            <View
              style={[
                homeStyles.typeContent,
                {backgroundColor: type === 'STANDARD' ? grey : black2},
              ]}>
              <Text style={homeStyles.type}>STANDARD</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyles.typeBtn}
            onPress={() => {
              getTrainingsByUser()
                .then(response => {
                  console.log(response.data);
                  setData(response.data);
                  setFullData(response.data);
                  setType('CUSTOM');
                })
                .catch(error => {
                  console.log(error);
                });
            }}>
            <View
              style={[
                homeStyles.typeContent,
                {backgroundColor: type === 'CUSTOM' ? grey : black2},
              ]}>
              <Text style={homeStyles.type}>CUSTOM</Text>
            </View>
          </TouchableOpacity>
        </View>
        {type === 'CUSTOM' && fullData.length === 0 ? (
          <View style={trainingsStyles.notificationList}>
            <Text style={historyStyles.noTrainingsText}>No trainings to show yet</Text>
          </View>
        ) : (
          <FlatList
            style={trainingsStyles.notificationList}
            data={data}
            keyExtractor={item => {
              return item.id;
            }}
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
                    </View>
                    <Image
                      style={trainingsStyles.image}
                      source={{uri: item.image}}
                    />
                  </View>
                  <TouchableOpacity
                    style={trainingsStyles.content}
                    onPress={() => {
                      cardClickEventListener(item);
                    }}>
                    <FontAwesome5
                      name={'play-circle'}
                      size={50}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
