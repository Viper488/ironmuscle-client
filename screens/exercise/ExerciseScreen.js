import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from '../../styles/Styles';
import exerciseStyles from '../../styles/ExerciseStyles';
import ShowExercise from './ShowExercise';
import StopTraining from './StopTraining';

const ExerciseScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <View style={exerciseStyles.titleContent}>
        <Text style={exerciseStyles.title}>{route.params.training.name}</Text>
      </View>
      <View style={exerciseStyles.exerciseContent}>
        {route.params.index < route.params.length
          ? ShowExercise(
              {navigation},
              route.params.index,
              route.params.training,
              route.params.exercises,
              route.params.length,
            )
          : StopTraining({navigation})}
      </View>
    </View>
  );
};

export default ExerciseScreen;
