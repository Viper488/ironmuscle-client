import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Snackbar} from 'react-native-paper';
import requestStyles from '../../../styles/RequestStyles';
import {Picker} from '@react-native-picker/picker';
import {handleError, initializeRegister} from '../../../Networking';
import styles from '../../../styles/Styles';
import exerciseStyles from '../../../styles/ExerciseStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {white} from '../../../styles/Colors';

const CreateUser = ({navigation, route}) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState('USER');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const register = async () => {
    let roles = [];
    roles.push(role);
    let request = {
      username: username,
      email: email,
      roles: roles,
    };

    initializeRegister(request)
      .then(response => {
        console.log('Created');
        toggleSnackbar('Created successfully!');
        wait(2000).then(() => navigation.navigate('AUsers'));
      })
      .catch(error => {
        handleError({navigation, error});
        toggleSnackbar(error.response.data.message);
      });
  };

  const validate = () => {
    if (username == null) {
      toggleSnackbar('Username is empty!');
      return false;
    } else if (email == null) {
      toggleSnackbar('Email is empty!');
      return false;
    } else {
      return true;
    }
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  return (
    <View style={styles.container}>
      <View style={requestStyles.createUserBack}>
        <TouchableOpacity
          style={exerciseStyles.exitModalBtn}
          onPress={() => navigation.navigate('AUsers')}>
          <View>
            <FontAwesome5
              name={'arrow-left'}
              size={RFValue(50)}
              color={white}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={requestStyles.createUserContent}>
        <View style={styles.inputView}>
          <TextInput
            maxLength={255}
            style={styles.textInput}
            placeholder="Username."
            placeholderTextColor="#8c8c8c"
            onChangeText={username => setUsername(username)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            maxLength={255}
            style={styles.textInput}
            placeholder="Email."
            placeholderTextColor="#8c8c8c"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <View style={requestStyles.pickerContent}>
          <Picker
            selectedValue={role}
            style={requestStyles.picker}
            onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
            <Picker.Item style={styles.pickerItem} label="User" value="USER" />
            <Picker.Item
              style={styles.pickerItem}
              label="Trainer"
              value="TRAINER"
            />
            <Picker.Item
              style={styles.pickerItem}
              label="Admin"
              value="ADMIN"
            />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => (validate() ? register() : undefined)}>
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        style={styles.snackbar}
        wrapperStyle={styles.snackbarWrapper}
        visible={visible}
        onDismiss={onDismissSnackBar}
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

export default CreateUser;
