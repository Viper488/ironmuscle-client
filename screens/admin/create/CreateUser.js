import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Snackbar} from 'react-native-paper';
import requestStyles from '../../../styles/RequestStyles';
import {Picker} from '@react-native-picker/picker';
import {initializeRegister, requestRegister} from '../../../Networking';
import styles from '../../../styles/Styles';

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
        console.log(error);
        toggleSnackbar(error.response.data);
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
          <Picker.Item label="User" value="USER" />
          <Picker.Item label="Trainer" value="TRAINER" />
          <Picker.Item label="Admin" value="ADMIN" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => (validate() ? register() : undefined)}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
      <Snackbar
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
