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
import styles from '../styles/Styles';
import trainingsStyles from '../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getTrainingsByType, getTrainingsByUser} from '../Networking';
import {useFocusEffect} from '@react-navigation/native';
import Bolts from './components/Bolts';

const TrainingsScreen = ({navigation, route}) => {
  const [data, setData] = useState({});
  const [fullData, setFullData] = useState({});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let type = route.params.type;
      if (type === 'custom') {
        let response = await getTrainingsByUser();
        console.log(response.data);
        setData(response.data);
        setFullData(response.data);
      } else {
        let response = await getTrainingsByType(type);
        console.log(response.data);
        setData(response.data);
        setFullData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [route.params.type]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Home');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  const cardClickEventListener = item => {
    navigation.navigate('TrainingDetails', {
      id: item.id,
      type: item.type,
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

  const renderTags = items => {
    return items.map(tag => {
      return (
        <View key={tag} style={trainingsStyles.btnColor}>
          <Text>{tag}</Text>
        </View>
      );
    });
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
            <View style={[trainingsStyles.card, {borderColor: item.color}]}>
              <Image
                style={[trainingsStyles.image, trainingsStyles.imageContent]}
                source={{uri: item.image}}
              />

              <View style={trainingsStyles.bolts}>
                <Bolts difficulty={item.difficulty} />
              </View>
              <View style={trainingsStyles.cardContent}>
                <Text style={trainingsStyles.name}>{item.name}</Text>
              </View>
              <View style={trainingsStyles.content}>
                <View
                  style={[
                    trainingsStyles.cardContent,
                    trainingsStyles.tagsContent,
                  ]}>
                  {renderTags([item.difficulty, item.points])}
                </View>

                <View style={trainingsStyles.playBtn}>
                  <TouchableOpacity
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
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TrainingsScreen;
