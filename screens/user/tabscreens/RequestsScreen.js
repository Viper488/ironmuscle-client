import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import styles from '../../../styles/Styles';
import trainingsStyles from '../../../styles/TrainingsStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  createRequest,
  deleteDoneRequests,
  deleteRequest,
  getStandardTrainings,
  getTrainingsByUser,
  getUserRequests,
} from '../../../Networking';
import requestStyles from '../../../styles/RequestStyles';
import {black2, blue, green, grey, white} from '../../../styles/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import filter from 'lodash.filter';
import exerciseStyles from '../../../styles/ExerciseStyles';
import profileStyles from '../../../styles/ProfileStyles';
import {Snackbar} from 'react-native-paper';
import {getDate} from '../../functions/Functions';
import {Swipeable} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

const RequestsScreen = ({navigation, route}) => {
  const [requests, setRequests] = useState([]);
  const [fullRequests, setFullRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const allStatus = ['All', 'New', 'In Progress', 'Done'];
  const [status, setStatus] = useState('All');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bodyPart, setBodyPart] = useState('Abdominal');
  const [difficulty, setDifficulty] = useState('Beginner');

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      updateRequestsList();
    }, []),
  );

  const updateRequestsList = () => {
    getUserRequests()
      .then(response => {
        setRequests(response.data);
        setFullRequests(response.data);
        setStatus('All');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearch = text => {
    if (text === '') {
      setRequests(fullRequests);
    } else {
      const filteredData = filter(requests, item => {
        return contains(item, text);
      });
      setRequests(filteredData);
    }
  };

  const contains = (item, query) => {
    let lowerQuery = query.toLowerCase();
    if (item.title.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    if (item.description.toLowerCase().includes(lowerQuery)) {
      return true;
    }
    return item.status.toLowerCase().includes(lowerQuery);
  };

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const swipeRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          width: '100%',
          justifyContent: 'center',
          marginTop: '3%',
        }}>
        <Animated.Text
          style={{
            marginLeft: 'auto',
            marginRight: 50,
            fontSize: 24,
            color: white,
            fontWeight: 'bold',
            transform: [{scale}],
          }}>
          Delete request
        </Animated.Text>
      </Animated.View>
    );
  };

  const animatedDelete = requestId => {
    Animated.timing(new Animated.Value(250), {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      deleteRequest(requestId)
        .then(response => {
          console.log(response.status);
          toggleSnackbar('Deleted request');
          updateRequestsList();
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={exerciseStyles.modalContent}>
          <TouchableOpacity
            style={exerciseStyles.exitModalBtn}
            onPress={() => setModalVisible(false)}>
            <View>
              <FontAwesome5 name={'arrow-left'} size={50} color={white} />
            </View>
          </TouchableOpacity>
          <View style={profileStyles.modalBody}>
            <Text style={styles.btnText}>New training request</Text>
            <View style={styles.inputView}>
              <TextInput
                maxLength={255}
                style={styles.textInput}
                placeholder={'Title'}
                placeholderTextColor="#8c8c8c"
                onChangeText={title => setTitle(title)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                maxLength={255}
                style={styles.textInput}
                placeholder={'Description'}
                placeholderTextColor="#8c8c8c"
                onChangeText={description => setDescription(description)}
              />
            </View>
            <View style={requestStyles.pickerContent}>
              <Picker
                selectedValue={bodyPart}
                style={requestStyles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setBodyPart(itemValue)
                }>
                <Picker.Item label="Abdominal" value="Abdominal" />
                <Picker.Item label="Arms" value="Arms" />
                <Picker.Item label="Back" value="Back" />
                <Picker.Item label="Chest" value="Chest" />
                <Picker.Item label="Legs" value="Legs" />
              </Picker>
            </View>
            <View style={requestStyles.pickerContent}>
              <Picker
                selectedValue={difficulty}
                style={requestStyles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setDifficulty(itemValue)
                }>
                <Picker.Item label="Beginner" value="Mediocre" />
                <Picker.Item label="Mediocre" value="Mediocre" />
                <Picker.Item label="Pro" value="Pro" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                let request = {
                  title: title,
                  description: description,
                  bodyPart: bodyPart,
                  difficulty: difficulty,
                };
                console.log('Request: ' + request.bodyPart);
                createRequest(request)
                  .then(response => {
                    console.log(response.data);
                    updateRequestsList();
                    setTitle('');
                    setDescription('');
                    setBodyPart('');
                    setDifficulty('');
                    setModalVisible(false);
                    toggleSnackbar(
                      'Created request at ' + getDate(response.data.created_at),
                    );
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }}>
              <Text style={styles.btnText}>Create request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      <View style={requestStyles.types}>
        {allStatus.map(s => {
          return (
            <TouchableOpacity
              style={requestStyles.typeBtn}
              onPress={() => {
                if (s === 'All') {
                  setRequests(fullRequests);
                } else {
                  setRequests(
                    fullRequests.filter(
                      r => r.status.toLowerCase() === s.toLowerCase(),
                    ),
                  );
                }
                setStatus(s);
              }}>
              <View
                style={[
                  requestStyles.typeContent,
                  {backgroundColor: status === s ? grey : black2},
                ]}>
                <Text style={requestStyles.type}>{s}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        style={requestStyles.notificationList}
        data={requests}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item, index}) => {
          return (
            <Swipeable
              renderRightActions={swipeRight}
              rightThreshold={-200}
              onSwipeableOpen={() => animatedDelete(item.id)}>
              <Animated.View
                style={[
                  requestStyles.card,
                  {marginTop: index === 0 ? 0 : '3%'},
                ]}>
                <View style={requestStyles.titleContent}>
                  <Text style={requestStyles.title}>
                    {item.title + ' ' + item.difficulty}
                  </Text>
                  <Text
                    style={[
                      requestStyles.status,
                      {
                        color:
                          item.status === 'DONE'
                            ? green
                            : item.status === 'IN PROGRESS'
                            ? blue
                            : 'red',
                      },
                    ]}>
                    {item.status}
                  </Text>
                </View>
                <View style={requestStyles.descriptionContent}>
                  <Text>{item.bodyPart}</Text>
                  <Text>{item.description}</Text>
                </View>
              </Animated.View>
            </Swipeable>
          );
        }}
      />

      <TouchableOpacity
        style={requestStyles.floatingBtn}
        onPress={() => setModalVisible(true)}>
        <FontAwesome5 name={'plus'} size={30} color={black2} />
      </TouchableOpacity>
      <TouchableOpacity
        style={requestStyles.floatingBtn2}
        onPress={() =>
          Alert.alert(
            'Delete requests',
            "Are you sure you want to delete all 'DONE' requests?",
            [
              {
                text: 'No',
                onPress: () => null,
                style: 'cancel',
              },
              {
                text: 'YES',
                onPress: () => {
                  deleteDoneRequests()
                    .then(response => {
                      updateRequestsList();
                      toggleSnackbar("'DONE' requests deleted!");
                    })
                    .catch(error => {
                      console.log(error);
                    });
                },
              },
            ],
          )
        }>
        <FontAwesome5 name={'minus'} size={20} color={black2} />
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

export default RequestsScreen;
