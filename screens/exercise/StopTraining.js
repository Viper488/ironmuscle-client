import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Text, View} from 'react-native';
import styles from '../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {saveUserActivity} from '../../Networking';
import exerciseStyles from '../../styles/ExerciseStyles';

const StopTraining = ({navigation, training}) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    saveUserActivity(training.id)
      .then(response => {
        console.log('TrainingDate: ' + response.data.trainingDate);
        setDate(response.data.trainingDate);
      })
      .catch(error => {
        console.log(error);
      });
  }, [training.id]);

  return (
    <View style={styles.container}>
      <Text style={exerciseStyles.exerciseName}>
        {'Congratulations you finished ' +
          training.name +
          ' ' +
          training.difficulty +
          ' training !!!'}
      </Text>
      <TouchableOpacity
        style={exerciseStyles.btn}
        onPress={() => {
          navigation.navigate('Trainings');
        }}>
        <Text style={exerciseStyles.btnText}>Go back!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={exerciseStyles.btn}
        onPress={() => {
          navigation.navigate('Trainings');
        }}>
        <Text style={exerciseStyles.btnText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={exerciseStyles.btn}
        onPress={() => {
          navigation.navigate('Trainings');
        }}>
        <Text style={exerciseStyles.btnText}>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StopTraining;
