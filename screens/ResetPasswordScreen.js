import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/Styles';
import {Snackbar} from 'react-native-paper';
import {requestPasswordReset} from '../Networking';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {RFValue} from 'react-native-responsive-fontsize';
import {white} from '../styles/Colors';

const ResetPasswordScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const sendRequest = () => {
    let t_email = email;
    if (t_email === '') {
      toggleSnackbar('Email can not be empty');
    } else {
      requestPasswordReset(t_email)
        .then(response => {
          if (response.status === 200) {
            navigation.navigate('Login', {
              message: 'Request sent to ' + email,
            });
          } else {
            toggleSnackbar(response.data.message);
          }
        })
        .catch(error => {
          toggleSnackbar(error.response.data.message);
        });
    }
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
          placeholder="Email."
          placeholderTextColor="#8c8c8c"
          onChangeText={email => setEmail(email)}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => sendRequest()}>
        <Text style={styles.btnText}>Reset password</Text>
      </TouchableOpacity>
      {
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
      }
    </View>
  );
};

export default ResetPasswordScreen;
