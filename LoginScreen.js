import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../iron_muscle_android/styles/Styles';
import loginStyles from '../iron_muscle_android/styles/LoginStyles';
import {createAuthorizationHeader, JWToken, requestAuth} from './Networking';
import {_storeData} from './AsyncStorageManager';
import {Snackbar} from 'react-native-paper';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      username: null,
      password: null,
      visible: false,
      message: '',
    };
  }

  toggleSnackbar = message => {
    this.setState({message: message});
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  auth = async () => {
    let username = this.state.username;
    let password = this.state.password;
    if (username != null && password != null) {
      await requestAuth(username, password).then(response => {
        if (response.status === 200) {
          let token = response.data.jwt;
          if (token != null) {
            _storeData(JWToken, token).then(
              createAuthorizationHeader().then(
                this.state.navigation.navigate('Home'),
              ),
            );
          }
        } else {
          this.toggleSnackbar(response.data.message);
          console.log(response.status + ' ' + response.data.message);
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={loginStyles.imageContainer}>
          <Image
            source={require('./images/dumbell.jpg')}
            style={loginStyles.loginImage}
            resizeMode={'cover'}
          />
        </View>
        <View style={loginStyles.loginContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="User name"
              placeholderTextColor="#8c8c8c"
              onChangeText={username => this.setState({username: username})}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor="#8c8c8c"
              secureTextEntry={true}
              onChangeText={password => this.setState({password: password})}
            />
          </View>
          <TouchableOpacity
            style={loginStyles.forgotBtn}
            onPress={() => {
              this.state.navigation.navigate('Reset');
            }}>
            <Text style={loginStyles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.auth()}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.registerContainer}>
          <TouchableOpacity
            onPress={() => this.state.navigation.navigate('Register')}
            style={loginStyles.registerButton}>
            <Text style={loginStyles.registerText}>Dont have an account? </Text>
            <Text style={[loginStyles.registerText, loginStyles.signupText]}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
        {
          <Snackbar
            visible={this.state.visible}
            onDismiss={this.onDismissSnackBar}
            action={{
              label: 'Close',
              onPress: () => {
                this.setState({visible: false});
              },
            }}>
            {this.state.message}
          </Snackbar>
        }
      </View>
    );
  }
}

export default LoginScreen;
