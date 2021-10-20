import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import styles from '../../styles/Styles';
import trainingsStyles from '../../styles/TrainingsStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import {getTrainingDetails} from '../../Networking';
import tdStyles from '../../styles/TrainingDetailsStyles';
import Bolts from '../components/Bolts';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {grey, white} from '../../styles/Colors';

const TrainingDetailsScreen = ({navigation, route}) => {
  const [training, setTraining] = useState({});
  const [exercises, setExercises] = useState([]);
  const [originalExercises, setOriginalExercises] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let response = await getTrainingDetails(route.params.id);
      setTraining(response.data.training);
      let i = 1;
      response.data.exercises.forEach(exercise => {
        exercise.key = i;
        i++;
      });
      let exercises = response.data.exercises;
      setExercises(exercises);
      setOriginalExercises(exercises);
    } catch (error) {
      console.log(error);
    }
    return () => {};
  }, [route.params.id]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log(exercises);
        console.log(originalExercises);
        setExercises(originalExercises);
        navigation.navigate('TrainingsList', {
          type: route.params.type,
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [exercises, navigation, originalExercises, route.params.type]),
  );

  const displayTime = duration => {
    let minutes = Math.floor(duration / 60);
    if (minutes < 10) {
      return '0' + minutes + ':' + (duration - 60 * minutes);
    }
    return minutes + ':' + (duration - 60 * minutes);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: training.image}} style={tdStyles.imageBanner} />
      <Text style={tdStyles.trainingName}>
        {training.name + ' ' + training.difficulty}
      </Text>
      <Text style={tdStyles.trainingLength}>
        {exercises.length + ' exercises'}
      </Text>
      <View style={tdStyles.bolts}>
        <Bolts difficulty={training.difficulty} />
      </View>
      <TouchableOpacity
        style={tdStyles.btn}
        onPress={() => {
          navigation.navigate('Exercise', {
            index: 0,
            training: training,
            exercises: exercises,
            length: exercises.length,
          });
        }}>
        <Text style={tdStyles.btnText}>START</Text>
      </TouchableOpacity>
      <View style={tdStyles.contentList}>
        <DraggableFlatList
          style={trainingsStyles.notificationList}
          data={exercises}
          keyExtractor={(item, index) => `draggable-item-${item.key}`}
          renderItem={({item, index, drag, isActive}) => {
            return (
              <View
                style={[
                  tdStyles.card,
                  {backgroundColor: isActive ? grey : white},
                ]}>
                <TouchableOpacity style={tdStyles.dragBtn} onLongPress={drag}>
                  <FontAwesome5 name={'bars'} size={50} color={grey} />
                </TouchableOpacity>
                <Text style={tdStyles.exerciseName}>{item.name}</Text>
                <View style={tdStyles.exerciseDuration}>
                  <Text style={tdStyles.exerciseDurationText}>
                    {item.time === 0
                      ? 'x' + item.repetitions
                      : displayTime(item.time)}
                  </Text>
                </View>
              </View>
            );
          }}
          onDragEnd={({data}) => setExercises(data)}
        />
      </View>
    </View>
  );
};

export default TrainingDetailsScreen;
