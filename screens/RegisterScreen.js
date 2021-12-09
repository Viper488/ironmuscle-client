import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/Styles';
import {handleError, requestRegister} from '../Networking';
import {Snackbar} from 'react-native-paper';
import requestStyles from '../styles/RequestStyles';
import {Picker} from '@react-native-picker/picker';
import exerciseStyles from '../styles/ExerciseStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {white} from '../styles/Colors';

const RegisterScreen = ({navigation, route}) => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
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
    roles.push('USER');
    let request = {
      username: username,
      email: email,
      password: password,
      roles: roles,
    };

    requestRegister(request)
      .then(response => {
        toggleSnackbar('Registered successfully!');
        wait(2000).then(() => navigation.navigate('Login'));
      })
      .catch(error => {
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
    } else if (password == null) {
      toggleSnackbar('Password is empty!');
      return false;
    } else if (password !== confirmPassword) {
      toggleSnackbar('Passwords are different!');
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
      <TouchableOpacity
        style={styles.exitBtn}
        onPress={() => navigation.navigate('Login')}>
        <View>
          <FontAwesome5 name={'arrow-left'} size={RFValue(50)} color={white} />
        </View>
      </TouchableOpacity>
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
      <View style={styles.inputView}>
        <TextInput
          maxLength={255}
          style={styles.textInput}
          placeholder="Password."
          placeholderTextColor="#8c8c8c"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          maxLength={255}
          style={styles.textInput}
          placeholder="Confirm password."
          placeholderTextColor="#8c8c8c"
          secureTextEntry={true}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => (validate() ? register() : undefined)}>
        <Text style={styles.btnText}>Register</Text>
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

export default RegisterScreen;
