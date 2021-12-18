import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import styles from '../styles/Styles';
import loginStyles from '../styles/LoginStyles';
import {
  getExercises,
  handleError,
  JWToken,
  RefreshToken,
  requestAuth,
} from '../Networking';
import {
  _removeData,
  _retrieveData,
  _storeData,
  LOGIN,
  PASSWORD,
  USERNAME,
} from '../AsyncStorageManager';
import {Snackbar} from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import CheckBox from '@react-native-community/checkbox';
import {green} from '../styles/Colors';
import {useFocusEffect} from '@react-navigation/native';

const LoginScreen = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [logged, setLogged] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      _retrieveData(LOGIN).then(l => {
        if (l === 'true') {
          setLogged(true);
          _retrieveData(USERNAME).then(u => {
            setUsername(u);
            _retrieveData(PASSWORD).then(p => {
              setPassword(p);
              if (u !== undefined && p !== undefined) {
                auth(u, p);
              }
            });
          });
        } else {
          setLogged(false);
          setUsername('');
          setPassword('');
        }
      });
      return () => {
        setUsername('');
        setPassword('');
      };
    }, []),
  );

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const auth = (username, password) => {
    console.log('Requesting with username: ' + username);
    console.log('Requesting with password: ' + password);
    requestAuth(username, password)
      .then(response => {
        let jwtToken = response.data.access_token;
        let rftToken = response.data.refresh_token;
        if (jwtToken != null && rftToken != null) {
          let decoded = jwt_decode(jwtToken);
          console.log(decoded);
          _storeData(RefreshToken, rftToken).then(() => {
            _storeData(JWToken, jwtToken).then(() => {
              if (logged) {
                _storeData(LOGIN, logged.toString()).then(() => {
                  _storeData(USERNAME, username).then(() => {
                    _storeData(PASSWORD, password).then(() => {});
                  });
                });
              } else {
                _storeData(LOGIN, logged.toString()).then(() => {
                  _removeData(USERNAME).then(() => {
                    _removeData(PASSWORD).then(() => {});
                  });
                });
              }

              if (decoded.authorities.includes('ADMIN')) {
                navigation.navigate('AdminHome');
              } else if (decoded.authorities.includes('TRAINER')) {
                navigation.navigate('TrainerHome');
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
            maxLength={255}
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#8c8c8c"
            onChangeText={formUsername => setUsername(formUsername)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            maxLength={255}
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#8c8c8c"
            secureTextEntry={true}
            onChangeText={formPassword => setPassword(formPassword)}
          />
        </View>
        <View style={loginStyles.optionsContent}>
          <View style={loginStyles.loggedContent}>
            <CheckBox
              tintColor={green}
              onCheckColor={'white'}
              onFillColor={green}
              onTintColor={green}
              value={logged}
              onValueChange={() => {
                setLogged(!logged);
                _storeData(LOGIN, (!logged).toString()).then(() => {});
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setLogged(!logged);
                _storeData(LOGIN, (!logged).toString()).then(() => {});
              }}>
              <Text style={loginStyles.forgotText}>Stay logged in</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={loginStyles.forgotBtn}
            onPress={() => {
              navigation.navigate('Reset');
            }}>
            <Text style={loginStyles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            auth(username, password);
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

export default LoginScreen;
