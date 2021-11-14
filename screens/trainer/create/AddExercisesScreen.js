import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from '../../../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {
  addExercises,
  getExercises,
  JWToken,
  RefreshToken,
} from '../../../Networking';
import {_removeData} from '../../../AsyncStorageManager';
import DraggableFlatList from 'react-native-draggable-flatlist';
import filter from 'lodash.filter';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import trainingsStyles from '../../../styles/TrainingsStyles';
import eRequestStyles from '../styles/ERequestStyles';
import tdStyles from '../../../styles/TrainingDetailsStyles';
import {grey, grey4, grey5, white} from '../../../styles/Colors';
import Bolts from '../../components/Bolts';
import requestStyles from '../../../styles/RequestStyles';
import {Picker} from '@react-native-picker/picker';
import {Snackbar} from 'react-native-paper';

const AddExercisesScreen = ({navigation, route}) => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selected, setSelected] = useState(false);
  const [fullExercises, setFullExercises] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getExercises(page, 100)
        .then(response => {
          response.data.exercises.forEach(item =>
            Object.assign(item, {
              key: item.id + item.name,
              selected: false,
              type: 'Repetitions',
              value: null,
            }),
          );
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setExercises([...exercises, ...response.data.exercises]);
          setFullExercises([...exercises, ...response.data.exercises]);
          console.log('Fetched ' + page);
        })
        .catch(error => {
          console.log(error);
        });

      const onBackPress = () => {
        if (selected) {
          setSelected(false);
          return false;
        } else {
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [page, navigation]),
  );

  const clearState = () => {
    setExercises([]);
    setSelectedExercises([]);
    setSelected(false);
    setFullExercises([]);
    setRefreshing(false);
    setChanged(false);
    setPage(0);
    setTotalPages(0);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setExercises([]);
    setFullExercises([]);
    getExercises(0, 100)
      .then(response => {
        response.data.exercises.forEach(item =>
          Object.assign(item, {selected: false}),
        );

        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setExercises([...exercises, ...response.data.exercises]);
        setFullExercises([...exercises, ...response.data.exercises]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        console.log(error);
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadMoreExercises = () => {
    if (!selected) {
      let newPage = page + 1;
      if (newPage < totalPages) {
        setPage(newPage);
        console.log('Preparing to fetch ' + newPage);
      }
    }
  };

  const handleSearch = text => {
    if (text === '') {
      setExercises(fullExercises);
    } else {
      const filteredData = filter(exercises, item => {
        return contains(item, text);
      });
      setExercises(filteredData);
    }
  };

  const contains = (item, query) => {
    let lowerQuery = query.toLowerCase();
    return item.name.toLowerCase().includes(lowerQuery);
  };

  const renderSearch = () => {
    return selected ? (
      <View />
    ) : (
      <View style={trainingsStyles.formContent}>
        <View style={trainingsStyles.inputContainer}>
          <FontAwesome5
            name={'search'}
            size={20}
            color={grey}
            style={trainingsStyles.searchIcon}
          />
          <TextInput
            maxLength={255}
            style={trainingsStyles.inputs}
            placeholder="Search"
            underlineColorAndroid="transparent"
            onChangeText={query => handleSearch(query)}
          />
        </View>
      </View>
    );
  };

  const renderItem = (item, index) => {
    return (
      <View style={[tdStyles.card, {marginTop: index === 0 ? 0 : '3%'}]}>
        <Text style={tdStyles.exerciseName}>{item.name}</Text>
        <CheckBox
          value={item.selected}
          onValueChange={() => {
            item.selected = !item.selected;
            setChanged(!changed);
          }}
        />
      </View>
    );
  };

  const renderSelectedItem = (item, index, drag, isActive) => {
    return (
      <View
        style={[
          eRequestStyles.selectedExercisesCard,
          {marginTop: index === 0 ? 0 : '3%'},
          {backgroundColor: isActive ? grey : white},
        ]}>
        <TouchableOpacity
          style={eRequestStyles.positionDrag}
          onLongPress={drag}>
          <Text style={eRequestStyles.position}>
            {index + 1}
            {'.'}
          </Text>
        </TouchableOpacity>
        <View style={eRequestStyles.exerciseDetailsContent}>
          <View style={eRequestStyles.exerciseNameContent}>
            <Text style={eRequestStyles.exerciseName}>{item.name}</Text>
          </View>
          <View style={eRequestStyles.pickerExerciseContent}>
            <Picker
              selectedValue={item.type}
              style={eRequestStyles.pickerExercise}
              onValueChange={(itemValue, itemIndex) => {
                item.type = itemValue;
                setChanged(!changed);
              }}>
              <Picker.Item label="Time" value="Time" />
              <Picker.Item label="Repetitions" value="Repetitions" />
            </Picker>
            <TextInput
              maxLength={10}
              keyboardType="numeric"
              style={eRequestStyles.inputExercise}
              placeholder={item.type === 'Time' ? 'Seconds' : 'Repetitions'}
              placeholderTextColor={grey4}
              onChangeText={text => {
                item.value = text.replace(/[^0-9]/g, '');
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderFlatlist = () => {
    return (
      <FlatList
        style={eRequestStyles.requests}
        data={exercises}
        keyExtractor={item => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        extraData={changed}
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreExercises}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    );
  };

  const renderDraggableFlatlist = () => {
    return (
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
    );
  };

  const handleAddExercises = () => {
    if (!selected) {
      setSelectedExercises(
        exercises.filter(e => {
          return e.selected;
        }),
      );
      setSelected(true);
    } else {
      let undefinedExe = selectedExercises.filter(e => {
        return e.value === '' || e.value === null;
      }).length;
      if (undefinedExe > 0) {
        toggleSnackbar('Number of undefined exercises ' + undefinedExe);
      } else {
        let addExe = [];
        selectedExercises.map(exe => {
          addExe.push({
            exerciseId: exe.id,
            time: exe.type === 'Time' ? parseInt(exe.value) : 0,
            repetitions: exe.type === 'Repetitions' ? parseInt(exe.value) : 0,
          });
        });
        console.log(addExe);

        addExercises(route.params.training.id, addExe)
          .then(response => {
            toggleSnackbar('Added exercises');
            wait(2000).then(() => {
              clearState();
              navigation.navigate('TrainingsE');
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={trainingsStyles.card}>
        <View style={trainingsStyles.imageContent}>
          <View style={trainingsStyles.cardContent}>
            <Text style={trainingsStyles.name}>
              {route.params.training.name} {route.params.training.difficulty}
            </Text>
            <View style={trainingsStyles.bolts}>
              <Bolts difficulty={route.params.training.difficulty} size={25} />
            </View>
          </View>
          <Image
            style={trainingsStyles.image}
            source={{uri: route.params.training.image}}
          />
        </View>
      </View>
      {renderSearch()}
      <View style={eRequestStyles.exercisesContent}>
        {selected ? renderDraggableFlatlist() : renderFlatlist()}
      </View>
      <View style={tdStyles.btnContainer}>
        <TouchableOpacity
          style={tdStyles.btn}
          onPress={() => handleAddExercises()}>
          <Text style={tdStyles.btnText}>
            {selected ? 'Add exercises' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
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

export default AddExercisesScreen;
