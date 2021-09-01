import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../iron_muscle_android/styles/LoginStyles';
import {JWToken, requestAuth} from './Networking';
import {_removeData, _storeData} from './AsyncStorageManager';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      username: null,
      password: null,
    };
  }
  async componentDidMount() {
    await _removeData(JWToken);
  }

  auth = async () => {
    let username = this.state.username;
    let password = this.state.password;
    if (username != null && password != null) {
      await requestAuth(username, password).then(async r => {
        if (r.status === 200) {
          let token = r.data.jwt;
          if (token != null) {
            await _storeData(JWToken, token).then(
              this.state.navigation.navigate('Home'),
            );
          }
        } else {
          alert(r.status + ' ' + r.data.message);
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./images/dumbell.jpg')}
            style={styles.loginImage}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="User name"
              placeholderTextColor="#8c8c8c"
              onChangeText={username => this.setState({username: username})}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#8c8c8c"
              secureTextEntry={true}
              onChangeText={password => this.setState({password: password})}
            />
          </View>
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.auth()}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity
            onPress={() => this.state.navigation.navigate('Register')}
            style={styles.registerButton}>
            <Text style={styles.registerText}>Dont have an account? </Text>
            <Text style={[styles.registerText, styles.signupText]}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
