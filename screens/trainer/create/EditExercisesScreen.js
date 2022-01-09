import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {
  addExercises,
  addTrainingUser,
  editExercises,
  editRequest,
  handleError,
} from '../../../Networking';
import DraggableFlatList from 'react-native-draggable-flatlist';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import trainingsStyles from '../../../styles/TrainingsStyles';
import eRequestStyles from '../styles/ERequestStyles';
import tdStyles from '../../../styles/TrainingDetailsStyles';
import {grey, grey4, grey5, white} from '../../../styles/Colors';
import Bolts from '../../components/Bolts';
import {Picker} from '@react-native-picker/picker';
import {Snackbar} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';

const EditExercisesScreen = ({navigation, route}) => {
  const [oSelectedExercises, setOSelectedExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [changed, setChanged] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setSelectedExercises([]);
      setSelectedExercises(route.params.selectedExercises);
      setOSelectedExercises([]);
      setOSelectedExercises(route.params.selectedExercises);

      const onBackPress = () => {
        console.log('BACK');
        navigation.navigate('AddExercises', {
          request: route.params.request !== null ? route.params.request : null,
          training: route.params.training,
          selectedExercises: oSelectedExercises,
          edit: route.params.edit,
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        clearState();
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [
      navigation,
      oSelectedExercises,
      route.params.edit,
      route.params.request,
      route.params.training,
    ]),
  );

  const clearState = () => {
    console.log('CLEARED EDIT');
    setOSelectedExercises([]);
    setSelectedExercises([]);
    setChanged(false);
    setVisible(false);
    setMessage('');
  };

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const renderSelectedItem = (item, index, drag, isActive) => {
    return (
      <View
        style={[
          eRequestStyles.selectedExercisesCard,
          {marginTop: index === 0 ? 0 : '3%'},
          {backgroundColor: isActive ? grey : white},
        ]}>
        <View style={eRequestStyles.positionDrag}>
          <TouchableOpacity
            onLongPress={drag}
            style={eRequestStyles.positionDragBtn}>
            <FontAwesome5 name={'bars'} size={RFValue(20)} color={grey} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let selectedAdd = selectedExercises;
              const addedItem = {
                id: item.id,
                image: item.image,
                name: item.name,
                video: item.video,
                key: item.key + '_' + selectedExercises.length,
                selected: item.selected,
                type: item.type,
                time: item.time,
                repetitions: item.repetitions,
              };
              console.log('ADDED: ' + addedItem.key);
              selectedAdd.push(addedItem);
              setSelectedExercises(selectedAdd);
              setChanged(!changed);
            }}
            style={eRequestStyles.positionDragBtn}>
            <FontAwesome5 name={'plus'} size={RFValue(20)} color={grey} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let selectedAdd = selectedExercises;
              selectedAdd.splice(index, 1);
              setSelectedExercises(selectedAdd);
              setChanged(!changed);
            }}
            style={eRequestStyles.positionDragBtn}>
            <FontAwesome5 name={'minus'} size={RFValue(20)} color={grey} />
          </TouchableOpacity>
        </View>
        <View style={eRequestStyles.exerciseDetailsContent}>
          <View style={eRequestStyles.exerciseNameContent}>
            <Text style={eRequestStyles.exerciseName}>
              {index + 1}
              {'.'}
              {item.name}
            </Text>
          </View>
          <View style={eRequestStyles.pickerExerciseContent}>
            <Picker
              selectedValue={item.type}
              style={eRequestStyles.pickerExercise}
              onValueChange={(itemValue, itemIndex) => {
                item.type = itemValue;
                setChanged(!changed);
              }}>
              <Picker.Item
                style={styles.pickerItem}
                label="Time"
                value="Time"
              />
              <Picker.Item
                style={styles.pickerItem}
                label="Repetitions"
                value="Repetitions"
              />
            </Picker>
            <TextInput
              placeholder={
                route.params.edit !== null &&
                item.time !== null &&
                item.repetitions !== null &&
                route.params.edit
                  ? item.type === 'Time'
                    ? item.time.toString()
                    : item.repetitions.toString()
                  : item.type === 'Time'
                  ? 'Seconds'
                  : 'Repetitions'
              }
              maxLength={10}
              keyboardType="numeric"
              style={eRequestStyles.inputExercise}
              placeholderTextColor={grey4}
              onChangeText={text => {
                if (item.type === 'Time') {
                  item.time = text.replace(/[^0-9]/g, '');
                  item.repetitions = 0;
                } else {
                  item.time = 0;
                  item.repetitions = text.replace(/[^0-9]/g, '');
                }
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const handleAddExercises = () => {
    let undefinedExe = selectedExercises.filter(e => {
      return (
        e.time === null ||
        e.time === '' ||
        e.repetitions === null ||
        e.repetitions === ''
      );
    });

    if (undefinedExe.length > 0) {
      console.log(selectedExercises);
      toggleSnackbar('Number of undefined exercises ' + undefinedExe.length);
    } else {
      let addExe = [];
      selectedExercises.map(exe => {
        addExe.push({
          exerciseId: exe.id,
          time: parseInt(exe.time),
          repetitions: parseInt(exe.repetitions),
        });
      });
      console.log(addExe);
      if (route.params.edit !== null && route.params.edit) {
        editExercises(route.params.training.id, addExe)
          .then(response => {
            toggleSnackbar('Edited exercises');
            wait(2000).then(() => {
              clearState();
              navigation.navigate('TrainingsE');
            });
          })
          .catch(error => {
            handleError({navigation, error});
          });
      } else {
        addExercises(route.params.training.id, addExe)
          .then(response => {
            if (route.params.request !== null) {
              editRequest(route.params.request.id, {status: 'done'})
                .then(response => {
                  console.log(
                    'Request ' +
                      response.data.id +
                      ' status: ' +
                      response.data.status,
                  );
                })
                .catch(error => console.log(error));
              if (
                route.params.training.type === 'custom' &&
                route.params.request.user !== null
              ) {
                addTrainingUser(
                  route.params.request.user.id,
                  route.params.training.id,
                )
                  .then(response => {
                    console.log(
                      'Assigned ' +
                        response.data.training.name +
                        ' to ' +
                        response.data.user.username,
                    );
                  })
                  .catch(error => {
                    handleError({navigation, error});
                  });
              }
            }
            toggleSnackbar('Added exercises');
            wait(2000).then(() => {
              clearState();
              navigation.navigate('TrainingsE');
            });
          })
          .catch(error => {
            handleError({navigation, error});
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={trainingsStyles.card}>
        <View style={trainingsStyles.imageContent}>
          <View style={trainingsStyles.cardContent}>
            <TouchableOpacity
              style={eRequestStyles.goBack}
              onPress={() => {
                console.log('BACK');
                navigation.navigate('AddExercises', {
                  request:
                    route.params.request !== null ? route.params.request : null,
                  training: route.params.training,
                  selectedExercises: oSelectedExercises,
                  edit: route.params.edit,
                });
              }}>
              <View>
                <FontAwesome5
                  name={'arrow-left'}
                  size={RFValue(20)}
                  color={white}
                />
              </View>
            </TouchableOpacity>
            <Text style={trainingsStyles.name}>
              {route.params.training.name} {route.params.training.difficulty}
            </Text>
            <View style={trainingsStyles.bolts}>
              <Bolts
                difficulty={route.params.training.difficulty}
                size={RFValue(25)}
              />
            </View>
            <TouchableOpacity
              style={eRequestStyles.goBack}
              onPress={() => {
                navigation.navigate('TrainingsE');
              }}>
              <View>
                <FontAwesome5
                  name={'times-circle'}
                  size={RFValue(20)}
                  color={white}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Image
            style={trainingsStyles.image}
            source={{
              uri: 'data:image/png;base64,' + route.params.training.image,
            }}
          />
        </View>
      </View>
      <View style={eRequestStyles.exercisesContent}>
        {selectedExercises !== null &&
        selectedExercises.length !== null &&
        selectedExercises.length > 0 ? (
          <DraggableFlatList
            style={eRequestStyles.selectedExercises}
            data={selectedExercises}
            keyExtractor={item => `draggable-item-${item.key}`}
            extraData={changed}
            onDragEnd={({data}) => setSelectedExercises(data)}
            renderItem={({item, index, drag, isActive}) =>
              renderSelectedItem(item, index, drag, isActive)
            }
          />
        ) : (
          <View style={eRequestStyles.requestsEmpty}>
            <Text style={eRequestStyles.requestsEmptyText}>
              No exercises picked!
            </Text>
          </View>
        )}
      </View>
      <View style={tdStyles.btnContainer}>
        <TouchableOpacity
          style={tdStyles.btn}
          onPress={() => {
            handleAddExercises();
          }}>
          <Text style={tdStyles.btnText}>
            {route.params.edit ? 'Edit' : 'Create'} training
          </Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        style={styles.snackbar}
        wrapperStyle={styles.snackbarWrapper}
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

export default EditExercisesScreen;
