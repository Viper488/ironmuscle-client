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
  Animated,
} from 'react-native';
import styles from '../../styles/Styles';
import homeStyles from '../../styles/HomeStyles';
import {
  deleteRequest,
  deleteTraining,
  getStandardTrainings,
  getTrainingDetails,
  getTrainingsByUser,
  JWToken,
  RefreshToken,
} from '../../Networking';
import {_removeData, _storeData} from '../../AsyncStorageManager';
import {black, black2, grey, white, yellow} from '../../styles/Colors';
import trainingsStyles from '../../styles/TrainingsStyles';
import {useFocusEffect} from '@react-navigation/native';
import Bolts from '../components/Bolts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import filter from 'lodash.filter';
import historyStyles from '../../styles/HistoryStyles';
import {Swipeable} from 'react-native-gesture-handler';

const HomeScreen = ({navigation, route}) => {
  const [trainings, setTrainings] = useState({});
  const [trainingsNoFilter, setTrainingsNoFilter] = useState({});
  const [type, setType] = useState('STANDARD');

  useFocusEffect(
    React.useCallback(() => {
      getStandardTrainings()
        .then(response => {
          console.log(response.data);
          setTrainings(response.data);
          setTrainingsNoFilter(response.data);
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
      setTrainings(trainingsNoFilter);
    } else {
      const filteredData = filter(trainings, item => {
        return contains(item, text);
      });
      setTrainings(filteredData);
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

  const swipeRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          width: '100%',
          justifyContent: 'center',
          marginTop: '3%',
        }}>
        <Animated.Text
          style={{
            marginLeft: 'auto',
            marginRight: 50,
            fontSize: 24,
            color: white,
            fontWeight: 'bold',
            transform: [{scale}],
          }}>
          Delete training
        </Animated.Text>
      </Animated.View>
    );
  };

  const animatedDelete = trainingId => {
    Animated.timing(new Animated.Value(250), {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      deleteTraining(trainingId)
        .then(response => {
          setTrainings(prevState => prevState.filter(t => t.id !== trainingId));
        })
        .catch(error => {
          console.log(error);
        });
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
                  setTrainings(response.data);
                  setTrainingsNoFilter(response.data);
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
                  setTrainings(response.data);
                  setTrainingsNoFilter(response.data);
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
        {type === 'CUSTOM' && trainingsNoFilter.length === 0 ? (
          <View style={trainingsStyles.notificationList}>
            <Text style={historyStyles.noTrainingsText}>
              No trainings to show yet
            </Text>
          </View>
        ) : (
          <FlatList
            style={trainingsStyles.notificationList}
            data={trainings}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item, index}) => {
              return type === 'CUSTOM' ? (
                <Swipeable
                  renderRightActions={swipeRight}
                  rightThreshold={-200}
                  onSwipeableOpen={() => animatedDelete(item.id)}>
                  <Animated.View
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
                  </Animated.View>
                </Swipeable>
              ) : (
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
