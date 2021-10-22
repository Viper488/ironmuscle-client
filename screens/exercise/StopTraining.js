import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Image, Text, View} from 'react-native';
import styles from '../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {saveUserActivity} from '../../Networking';
import stopTrainingStyles from '../../styles/StopTrainingStyles';
import {useFocusEffect} from '@react-navigation/native';

const StopTraining = ({navigation, training, length, startTime, endTime}) => {
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('Trainings');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  const toHHMMSS = sec_num => {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };

  return (
    <View style={styles.container}>
      <View style={stopTrainingStyles.content}>
        <View style={stopTrainingStyles.finishedContent}>
          <Image
            source={require('../../images/champ.png')}
            style={stopTrainingStyles.finishedImage}
          />
          <Text style={stopTrainingStyles.finishedText}>
            {'Congratulations you finished training ' +
              training.name +
              ' at ' +
              training.difficulty +
              ' difficulty level !!!'}
          </Text>
        </View>
        <View style={stopTrainingStyles.headerContent}>
          <View style={stopTrainingStyles.statisticsContent}>
            <Text style={stopTrainingStyles.headerText}>Exercises:</Text>
            <Text style={stopTrainingStyles.statisticsText}>{length}</Text>
          </View>
          <View style={stopTrainingStyles.statisticsContent}>
            <Text style={stopTrainingStyles.headerText}>Time:</Text>
            <Text style={stopTrainingStyles.statisticsText}>
              {toHHMMSS(new Date(endTime - startTime).getSeconds())}
            </Text>
          </View>
        </View>
      </View>
      <View style={stopTrainingStyles.controlBtnContent}>
        <TouchableOpacity
          style={stopTrainingStyles.btn}
          onPress={() => {
            navigation.navigate('Trainings');
          }}>
          <Text style={stopTrainingStyles.btnText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stopTrainingStyles.btn}
          onPress={() => {
            navigation.navigate('Leaderboard');
          }}>
          <Text style={stopTrainingStyles.btnText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stopTrainingStyles.btn}
          onPress={() => {
            navigation.navigate('History');
          }}>
          <Text style={stopTrainingStyles.btnText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StopTraining;
