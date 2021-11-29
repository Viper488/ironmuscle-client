import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
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
import {getExercises, handleError} from '../../../Networking';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import trainingsStyles from '../../../styles/TrainingsStyles';
import eRequestStyles from '../styles/ERequestStyles';
import tdStyles from '../../../styles/TrainingDetailsStyles';
import {grey} from '../../../styles/Colors';
import Bolts from '../../components/Bolts';
import {Snackbar} from 'react-native-paper';

const AddExercisesScreen = ({navigation, route}) => {
  const [exercises, setExercises] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getExercises(page, 1000, query)
        .then(response => {
          response.data.exercises.forEach((item, index) =>
            Object.assign(item, {
              key: item.id,
              selected: false,
              type: 'Repetitions',
              time: null,
              repetitions: null,
            }),
          );

          if (route.params.selectedExercises.length > 0) {
            console.log('FROM BACK');
            console.log(route.params.selectedExercises.length);
            route.params.selectedExercises.forEach(s => {
              response.data.exercises.forEach(e => {
                if (s.id === e.id) {
                  e.selected = true;
                  e.type = s.type;
                  e.time = s.time;
                  e.repetitions = s.repetitions;
                }
              });
            });
          }

          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setExercises([...exercises, ...response.data.exercises]);
          console.log('Fetched ' + page);
        })
        .catch(error => {
          handleError({navigation, error});
        });

      const onBackPress = () => {
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [route.params.selectedExercises, query, page, navigation]),
  );

  const clearState = () => {
    console.log('CLEARED ADD');
    setExercises([]);
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
    getExercises(0, 1000, query)
      .then(response => {
        response.data.exercises.forEach((item, index) =>
          Object.assign(item, {
            key: item.id,
            selected: false,
            type: 'Repetitions',
            time: null,
            repetitions: null,
          }),
        );

        if (route.params.selectedExercises.length > 0) {
          console.log('FROM BACK');
          console.log(route.params.selectedExercises.length);
          route.params.selectedExercises.forEach(s => {
            response.data.exercises.forEach(e => {
              if (s.id === e.id) {
                e.selected = true;
                e.type = s.type;
                e.time = s.time;
                e.repetitions = s.repetitions;
              }
            });
          });
        }

        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setExercises([...exercises, ...response.data.exercises]);
        console.log('Fetched ' + page);
      })
      .catch(error => {
        handleError({navigation, error});
      });
    wait(2000).then(() => setRefreshing(false));
  }, [query]);

  const loadMoreExercises = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text.length >= 3) {
      setExercises([]);
      setPage(0);
      setQuery(text);
      console.log('Query: ' + query);
      console.log('Preparing to fetch page ' + page);
    } else if (text.length === 0) {
      setExercises([]);
      setPage(0);
      setQuery('');
    }
  };

  const renderSearch = () => {
    return (
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
            onChangeText={text => handleSearch(text)}
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

  const handleAddSelected = () => {
    const selectedExe = exercises.filter(e => {
      return e.selected;
    });
    console.log('SEND SELECTED:' + selectedExe.length);
    if (selectedExe.length > 0) {
      clearState();
      navigation.navigate('EditExercises', {
        request: route.params.request,
        training: route.params.training,
        selectedExercises: selectedExe,
        edit: route.params.edit,
      });
    } else {
      toggleSnackbar('Please select at least one exercise.');
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
      <View style={eRequestStyles.exercisesContent}>{renderFlatlist()}</View>
      <View style={tdStyles.btnContainer}>
        <TouchableOpacity
          style={tdStyles.btn}
          onPress={() => {
            handleAddSelected();
          }}>
          <Text style={tdStyles.btnText}>Next</Text>
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
