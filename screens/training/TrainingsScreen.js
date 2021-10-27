import 'react-native-gesture-handler';
import filter from 'lodash.filter';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  BackHandler,
} from 'react-native';
import styles from '../../styles/Styles';
import trainingsStyles from '../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  getTrainingDetails,
  getTrainingsByType,
  getTrainingsByUser,
} from '../../Networking';
import {useFocusEffect} from '@react-navigation/native';
import Bolts from '../components/Bolts';

const TrainingsScreen = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [fullData, setFullData] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      if (route.params.type === 'custom') {
        getTrainingsByUser()
          .then(response => {
            console.log(response.data);
            setData(response.data);
            setFullData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        getTrainingsByType(route.params.type)
          .then(response => {
            console.log(response.data);
            setData(response.data);
            setFullData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }

      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, route.params.type]),
  );

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

  return (
    <View style={styles.container}>
      <View style={trainingsStyles.formContent}>
        <View style={trainingsStyles.inputContainer}>
          <Image
            style={[trainingsStyles.icon, trainingsStyles.inputIcon]}
            source={{
              uri: 'https://png.icons8.com/search/androidL/100/000000',
            }}
          />
          <TextInput
            style={trainingsStyles.inputs}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={query => handleSearch(query)}
          />
        </View>
      </View>

      <FlatList
        style={trainingsStyles.notificationList}
        data={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <View style={trainingsStyles.card}>
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
                <FontAwesome5 name={'play-circle'} size={50} color={'black'} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TrainingsScreen;
