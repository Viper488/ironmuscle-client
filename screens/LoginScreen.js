import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../styles/Styles';
import loginStyles from '../styles/LoginStyles';
import {JWToken, RefreshToken, requestAuth} from '../Networking';
import {_storeData} from '../AsyncStorageManager';
import {Snackbar} from 'react-native-paper';
import jwt_decode from 'jwt-decode';

const LoginScreen = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPassword('');
  }, []);
  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const auth = () => {
    requestAuth(username, password)
      .then(response => {
        let jwtToken = response.data.access_token;
        let rftToken = response.data.refresh_token;
        if (jwtToken != null && rftToken != null) {
          let decoded = jwt_decode(jwtToken);
          console.log(decoded);
          _storeData(RefreshToken, rftToken).then(() => {
            _storeData(JWToken, jwtToken).then(() => {
              if (decoded.authorities.includes('EMPLOYEE')) {
                navigation.navigate('EmployeeHome');
              } else {
                navigation.navigate('UserHome');
              }
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
        toggleSnackbar(error.response.data.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={loginStyles.imageContainer}>
        <Image
          source={require('../images/dumbell.jpg')}
          style={styles.image}
          resizeMode={'cover'}
        />
      </View>
      <View style={loginStyles.loginContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#8c8c8c"
            onChangeText={formUsername => setUsername(formUsername)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#8c8c8c"
            secureTextEntry={true}
            onChangeText={formPassword => setPassword(formPassword)}
          />
        </View>
        <TouchableOpacity
          style={loginStyles.forgotBtn}
          onPress={() => {
            navigation.navigate('Reset');
          }}>
          <Text style={loginStyles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            auth();
          }}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyles.registerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={loginStyles.registerButton}>
          <Text style={loginStyles.registerText}>Dont have an account? </Text>
          <Text style={[loginStyles.registerText, loginStyles.signupText]}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
      {
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
      }
    </View>
  );
};

export default LoginScreen;
