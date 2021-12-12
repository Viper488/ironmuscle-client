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
} from 'react-native';
import styles from '../../../styles/Styles';
import trainingsStyles from '../../../styles/TrainingsStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  createRequest,
  deleteDoneRequests,
  getUserRequests,
  handleError,
} from '../../../Networking';
import requestStyles from '../../../styles/RequestStyles';
import {black2, blue3, green, grey, red, white} from '../../../styles/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import exerciseStyles from '../../../styles/ExerciseStyles';
import profileStyles from '../../../styles/ProfileStyles';
import {Snackbar} from 'react-native-paper';
import {getDate, getDateTime} from '../../functions/Functions';
import {Picker} from '@react-native-picker/picker';
import {RFValue} from 'react-native-responsive-fontsize';

const RequestsScreen = ({navigation, route}) => {
  const [requests, setRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const allStatus = ['all', 'new', 'in progress', 'done'];
  const [status, setStatus] = useState('all');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bodyPart, setBodyPart] = useState('Abdominal');
  const [difficulty, setDifficulty] = useState('beginner');

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [changed, setChanged] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getUserRequests(page, 100, status === 'all' ? '' : status, query)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setRequests([...requests, ...response.data.requests]);
          console.log('Fetched ' + page);
        })
        .catch(error => {
          handleError({navigation, error});
        });
    }, [changed, status, query, page]),
  );

  const loadMoreRequests = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  const handleSearch = text => {
    if (text.length >= 3) {
      setRequests([]);
      setPage(0);
      setQuery(text);
      console.log('Query: ' + query);
      console.log('Preparing to fetch page ' + page);
    } else if (text.length === 0) {
      setRequests([]);
      setPage(0);
      setQuery('');
    }
  };

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const saveRequest = () => {
    let request = {
      title: title,
      description: description,
      bodyPart: bodyPart,
      difficulty: difficulty,
      status: 'new',
    };
    console.log('Request: ' + request.bodyPart);
    createRequest(request)
      .then(response => {
        console.log(response.data);
        setTitle('');
        setDescription('');
        setBodyPart('');
        setDifficulty('');
        setModalVisible(false);
        setRequests([]);
        setPage(0);
        setChanged(!changed);
        toggleSnackbar(
          'Created request at ' + getDate(response.data.created_at),
        );
      })
      .catch(error => {
        handleError({navigation, error});
      });
  };

  const renderRequest = (item, index) => {
    return (
      <View style={[requestStyles.card, {marginTop: index === 0 ? 0 : '3%'}]}>
        <View style={requestStyles.titleContent}>
          <Text style={requestStyles.title}>
            {item.title + ' ' + item.difficulty}
          </Text>
          <Text
            style={[
              requestStyles.status,
              {
                color:
                  item.status === 'done'
                    ? green
                    : item.status === 'in progress'
                    ? blue3
                    : red,
              },
            ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <View style={requestStyles.descriptionContent}>
          <View>
            <Text style={requestStyles.bodyPart}>
              {item.bodyPart.toUpperCase()}
            </Text>
            <Text style={requestStyles.description}>{item.description}</Text>
          </View>
          <View>
            {item.trainer !== null ? (
              <View style={requestStyles.trainer}>
                <FontAwesome5 name={'user-tie'} size={RFValue(30)} color={grey} />
                <Text style={requestStyles.description}>{item.trainer.username}</Text>
              </View>
            ) : undefined}
          </View>
        </View>
        <View style={requestStyles.timeContent}>
          <View>
            <Text style={requestStyles.time}>Created: </Text>
            <Text style={requestStyles.time}>
              {getDateTime(item.created_at)}
            </Text>
          </View>
          {item.resolved_at === null ? undefined : (
            <View>
              <Text style={requestStyles.time}>Resolved: </Text>
              <Text style={requestStyles.time}>
                {getDateTime(item.resolved_at)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
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
              <FontAwesome5 name={'arrow-left'} size={RFValue(50)} color={white} />
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
                <Picker.Item style={styles.pickerItem} label="Abdominal" value="abdominal" />
                <Picker.Item style={styles.pickerItem} label="Arms" value="arms" />
                <Picker.Item style={styles.pickerItem} label="Back" value="back" />
                <Picker.Item style={styles.pickerItem} label="Chest" value="chest" />
                <Picker.Item style={styles.pickerItem} label="Legs" value="legs" />
              </Picker>
            </View>
            <View style={requestStyles.pickerContent}>
              <Picker
                selectedValue={difficulty}
                style={requestStyles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setDifficulty(itemValue)
                }>
                <Picker.Item style={styles.pickerItem} label="Beginner" value="beginner" />
                <Picker.Item style={styles.pickerItem} label="Mediocre" value="mediocre" />
                <Picker.Item style={styles.pickerItem} label="Pro" value="pro" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => saveRequest()}>
              <Text style={styles.btnText}>Create request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={trainingsStyles.formContent}>
        <View style={trainingsStyles.inputContainer}>
          <FontAwesome5
            name={'search'}
            size={RFValue(20)}
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
                setRequests([]);
                setStatus(s);
                setPage(0);
                setChanged(!changed);
              }}>
              <View
                style={[
                  requestStyles.typeContent,
                  {backgroundColor: status === s ? green : black2},
                ]}>
                <Text style={requestStyles.type}>{s}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        style={[requestStyles.requestsList, {backgroundColor: green}]}
        data={requests}
        keyExtractor={item => {
          return item.id;
        }}
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreRequests}
        renderItem={({item, index}) => renderRequest(item, index)}
      />
      <TouchableOpacity
        style={requestStyles.floatingBtn}
        onPress={() => setModalVisible(true)}>
        <FontAwesome5 name={'plus'} size={RFValue(30)} color={black2} />
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
