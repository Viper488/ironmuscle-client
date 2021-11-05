import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Alert, BackHandler, Image, Text, View} from 'react-native';
import styles from '../../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {saveUserActivity} from '../../../Networking';
import stopTrainingStyles from '../../../styles/StopTrainingStyles';
import {useFocusEffect} from '@react-navigation/native';
import {getDate, toHHMMSS} from '../../functions/Functions';
import {Snackbar} from 'react-native-paper';

const StopTraining = ({navigation, training, length, startTime, endTime}) => {
  const [trainingDate, setTrainingDate] = useState('');

  useEffect(() => {
    saveUserActivity(training.id, new Date(endTime - startTime).getSeconds())
      .then(response => {
        console.log('TrainingDate: ' + response.data.trainingDate);
        setTrainingDate(response.data.trainingDate);
      })
      .catch(error => {
        console.log(error);
      });
  }, [endTime, startTime, training.id, training.name]);

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

  return (
    <View style={styles.container}>
      <View style={stopTrainingStyles.content}>
        <View style={stopTrainingStyles.finishedContent}>
          <Image
            source={require('../../../images/champ.png')}
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
          <View style={stopTrainingStyles.statisticsContent}>
            <Text style={stopTrainingStyles.headerText}>Date:</Text>
            <Text style={stopTrainingStyles.statisticsText}>
              {getDate(trainingDate)}
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
