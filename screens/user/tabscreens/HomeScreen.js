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
import styles from '../../../styles/Styles';
import homeStyles from '../../../styles/HomeStyles';
import {
  deleteTraining,
  getTrainingDetails,
  getUserTrainings,
  JWToken,
  RefreshToken,
} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import {black, black2, green, grey} from '../../../styles/Colors';
import trainingsStyles from '../../../styles/TrainingsStyles';
import {useFocusEffect} from '@react-navigation/native';
import Bolts from '../../components/Bolts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeScreen = ({navigation, route}) => {
  const [trainings, setTrainings] = useState([]);
  const [type, setType] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getUserTrainings(page, 100, type, query)
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
    }, [type, query, page, navigation]),
  );

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

  const handleTypeChange = text => {
    setTrainings([]);
    setPage(0);
    setType(text);
    console.log('Type: ' + type);
    console.log('Preparing to fetch page ' + page);
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

  const loadMoreTrainings = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  return (
    <View style={styles.container}>
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
              maxLength={255}
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
              handleTypeChange('');
            }}>
            <View
              style={[
                homeStyles.typeContent,
                {backgroundColor: type === '' ? green : black2},
              ]}>
              <Text style={homeStyles.type}>ALL</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyles.typeBtn}
            onPress={() => {
              handleTypeChange('standard');
            }}>
            <View
              style={[
                homeStyles.typeContent,
                {backgroundColor: type === 'standard' ? green : black2},
              ]}>
              <Text style={homeStyles.type}>STANDARD</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={homeStyles.typeBtn}
            onPress={() => {
              handleTypeChange('custom');
            }}>
            <View
              style={[
                homeStyles.typeContent,
                {backgroundColor: type === 'custom' ? green : black2},
              ]}>
              <Text style={homeStyles.type}>CUSTOM</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          style={[trainingsStyles.notificationList, {backgroundColor: green}]}
          data={trainings}
          keyExtractor={item => {
            return item.id;
          }}
          onEndReachedThreshold={0.4}
          onEndReached={loadMoreTrainings}
          renderItem={({item, index}) => {
            /*              return type === 'CUSTOM' ? (
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
              ) : (*/
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
      </View>
    </View>
  );
};

export default HomeScreen;
