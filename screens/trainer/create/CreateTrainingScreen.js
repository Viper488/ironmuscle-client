import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../../styles/Styles';
import requestStyles from '../../../styles/RequestStyles';
import {Picker} from '@react-native-picker/picker';
import {createTraining} from '../../../Networking';
import {Snackbar} from 'react-native-paper';

const CreateTrainingScreen = ({navigation, route}) => {
  const [name, setName] = useState(
    route.params.request !== null && route.params.request.name !== null
      ? route.params.request.name
      : undefined,
  );
  const [type, setType] = useState(
    route.params.request !== null && route.params.request.user !== null
      ? 'custom'
      : 'standard',
  );
  const [difficulty, setDifficulty] = useState(
    route.params.request !== null && route.params.request.difficulty !== null
      ? route.params.request.difficulty
      : 'Beginner',
  );
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const clearState = () => {
    setName('');
    setType('standard');
    setDifficulty('Beginner');
    setVisible(false);
    setMessage('');
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const saveTraining = () => {
    if (name === '') {
      console.log(name);
      toggleSnackbar('Training name can not be empty');
    } else {
      console.log(name);
      let points =
        difficulty === 'Beginner' ? 10 : difficulty === 'Mediocre' ? 20 : 30;

      let training = {
        name: name,
        type: type,
        image:
          'https://passionsport.pl/wp-content/uploads/2016/04/Fotolia_1000x77-min.jpg',
        difficulty: difficulty,
        points: points,
      };

      createTraining(training)
        .then(response => {
          toggleSnackbar('Training ' + response.data.name + ' created!');
          wait(2000).then(() => {
            clearState();
            navigation.navigate('AddExercises', {
              request:
                route.params.request !== null ? route.params.request : null,
              training: response.data,
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          maxLength={255}
          style={styles.textInput}
          placeholder={'Training name'}
          placeholderTextColor="#8c8c8c"
          onChangeText={name => setName(name)}
        />
      </View>
      <View style={requestStyles.pickerContent}>
        <Picker
          selectedValue={type}
          style={requestStyles.picker}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
          <Picker.Item label="Standard" value="standard" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>
      </View>
      <View style={requestStyles.pickerContent}>
        <Picker
          selectedValue={difficulty}
          style={requestStyles.picker}
          onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}>
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Mediocre" value="Mediocre" />
          <Picker.Item label="Pro" value="Pro" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => saveTraining()}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
      <Snackbar
        visible={visible}
        onDismiss={() => onDismissSnackBar()}
        action={{
          label: 'Close',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

export default CreateTrainingScreen;
