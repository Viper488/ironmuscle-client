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
import {getUserRequests, handleError} from '../../../Networking';
import requestStyles from '../../../styles/RequestStyles';
import {black2, blue3, green, grey, red} from '../../../styles/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Snackbar} from 'react-native-paper';
import {getDate, getDateTime} from '../../functions/Functions';
import eRequestStyles from '../styles/ERequestStyles';
import {RFValue} from 'react-native-responsive-fontsize';

const RequestsScreen = ({navigation, route}) => {
  const [requests, setRequests] = useState([]);
  const allStatus = ['all', 'in progress', 'done'];
  const [status, setStatus] = useState('all');

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
            {item.user !== null ? (
              <View style={requestStyles.trainer}>
                <FontAwesome5 name={'user'} size={RFValue(30)} color={grey} />
                <Text style={requestStyles.description}>
                  {item.user.username}
                </Text>
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
        {item.status !== 'done' ? (
          <View style={eRequestStyles.cardFooter}>
            <TouchableOpacity
              style={eRequestStyles.btn}
              onPress={() => {
                navigation.navigate('AddExercises', {
                  request: item,
                  training: item.training,
                  selectedExercises: [],
                  edit: false,
                });
              }}>
              <Text style={eRequestStyles.btnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : undefined}
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
      {requests.length > 0 ? (
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
      ) : (
        <View style={requestStyles.requestsEmpty}>
          <Text style={requestStyles.requestsEmptyText}>
            No requests found
          </Text>
        </View>
      )}
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

export default RequestsScreen;
