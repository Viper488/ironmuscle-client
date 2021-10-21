import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from '../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {saveUserActivity} from '../../Networking';

const StopTraining = ({navigation}, training) => {
  return (
    <View style={styles.container}>
      <Text>
        {'Congratulations you finished ' +
          training.name +
          ' ' +
          training.difficulty +
          ' training !!!'}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Trainings');
        }}>
        <Text
          style={styles.btnText}
          onPress={() => {
            saveUserActivity(training.id)
              .then(response => {
                console.log(response.data.trainingDate);
              })
              .catch(error => {
                console.log(error);
              });
          }}>
          Go back!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StopTraining;
