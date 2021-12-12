import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../../styles/Styles';
import requestStyles from '../../../styles/RequestStyles';
import {Picker} from '@react-native-picker/picker';
import {createTraining, editRequest, handleError} from '../../../Networking';
import {Snackbar} from 'react-native-paper';

const CreateTrainingScreen = ({navigation, route}) => {
  const [name, setName] = useState(
    route.params.request != null && route.params.request.title !== null
      ? route.params.request.title
      : null,
  );
  const [type, setType] = useState(
    route.params.request !== null && route.params.request.user !== null
      ? 'custom'
      : 'standard',
  );
  const [difficulty, setDifficulty] = useState(
    route.params.request !== null && route.params.request.difficulty !== null
      ? route.params.request.difficulty
      : 'beginner',
  );

  const [image, setImage] = useState(
    route.params.request !== null && route.params.request.bodyPart !== null
      ? route.params.request.bodyPart
      : 'abdominal',
  );

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const clearState = () => {
    setName('');
    setType('standard');
    setDifficulty('beginner');
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
        difficulty === 'beginner' ? 10 : difficulty === 'mediocre' ? 20 : 30;

      let training = {
        name: name,
        type: type,
        image: image,
        difficulty: difficulty,
        points: points,
      };

      createTraining(training)
        .then(trainingResponse => {
          toggleSnackbar(
            'Training ' + trainingResponse.data.name + ' created!',
          );
          console.log(trainingResponse.data);
          //clearState();
          if (route.params.request !== null) {
            editRequest(route.params.request.id, {
              status: 'in progress',
              training: trainingResponse.data,
            })
              .then(requestResponse => {
                console.log(
                  'Request ' +
                    requestResponse.data.id +
                    ' status: ' +
                    requestResponse.data.status,
                );
                wait(2000).then(() => {
                  navigation.navigate('AddExercises', {
                    request: requestResponse.data,
                    training: trainingResponse.data,
                    selectedExercises: [],
                    edit: false,
                  });
                });
              })
              .catch(error => handleError(error));
          } else {
            wait(2000).then(() => {
              navigation.navigate('AddExercises', {
                request: null,
                training: trainingResponse.data,
                selectedExercises: [],
                edit: false,
              });
            });
          }
        })
        .catch(error => {
          handleError({navigation, error});
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          maxLength={255}
          style={styles.textInput}
          placeholder={
            route.params.request !== null && route.params.request.title !== null
              ? route.params.request.title
              : 'Training title'
          }
          placeholderTextColor="#8c8c8c"
          onChangeText={name => setName(name)}
        />
      </View>
      <View style={requestStyles.labelContent}>
        <Text style={requestStyles.label}>Type:</Text>
      </View>
      <View style={requestStyles.pickerContent}>
        <Picker
          selectedValue={type}
          style={requestStyles.picker}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
          <Picker.Item style={styles.pickerItem} label="Standard" value="standard" />
          <Picker.Item style={styles.pickerItem} label="Custom" value="custom" />
        </Picker>
      </View>
      <View style={requestStyles.labelContent}>
        <Text style={requestStyles.label}>Difficulty:</Text>
      </View>
      <View style={requestStyles.pickerContent}>
        <Picker
          selectedValue={difficulty}
          style={requestStyles.picker}
          onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}>
          <Picker.Item style={styles.pickerItem} label="Beginner" value="beginner" />
          <Picker.Item style={styles.pickerItem} label="Mediocre" value="mediocre" />
          <Picker.Item style={styles.pickerItem} label="Pro" value="pro" />
        </Picker>
      </View>
      <View style={requestStyles.labelContent}>
        <Text style={requestStyles.label}>Image:</Text>
      </View>
      <View style={requestStyles.pickerContent}>
        <Picker
          selectedValue={image}
          style={requestStyles.picker}
          onValueChange={(itemValue, itemIndex) => setImage(itemValue)}>
          <Picker.Item style={styles.pickerItem} label="Abdominal" value="abdominal" />
          <Picker.Item style={styles.pickerItem} label="Arms" value="arms" />
          <Picker.Item style={styles.pickerItem} label="Chest" value="chest" />
          <Picker.Item style={styles.pickerItem} label="Legs" value="legs" />
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
