import 'react-native-gesture-handler';
import React from 'react';
import {Alert, BackHandler, Text, View} from 'react-native';
import styles from '../../styles/Styles';
import exerciseStyles from '../../styles/ExerciseStyles';
import ShowExercise from './ShowExercise';
import StopTraining from './StopTraining';
import {useFocusEffect} from '@react-navigation/native';

const ExerciseScreen = ({navigation, route}) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Hold on!',
          'Are you sure you want to quit training. Your progress will not be saved?',
          [
            {
              text: 'No',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'YES',
              onPress: () => {
                navigation.navigate('TrainingDetails', {
                  type: route.params.type,
                  training: route.params.training,
                  exercises: route.params.exercises,
                });
                return true;
              },
            },
          ],
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation, route.params.id, route.params.type]),
  );
  return (
    <View style={styles.container}>
      <View style={exerciseStyles.titleContent}>
        <Text style={exerciseStyles.title}>{route.params.training.name}</Text>
      </View>
      <View style={exerciseStyles.exerciseContent}>
        {route.params.index < route.params.length ? (
          <ShowExercise
            navigation={navigation}
            index={route.params.index}
            training={route.params.training}
            exercises={route.params.exercises}
            length={route.params.length}
          />
        ) : (
          <StopTraining
            navigation={navigation}
            training={route.params.training}
          />
        )}
      </View>
    </View>
  );
};

export default ExerciseScreen;
