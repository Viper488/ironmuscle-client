import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles/LoginStyles';
import {requestAuth, requestRegister} from './Networking';
import {_storeData} from './AsyncStorageManager';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  }
  register = async () => {
    let request = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    if (request.firstName == null) {
      alert('First name is empty!');
    } else if (request.lastName == null) {
      alert('Last name is empty!');
    } else if (request.username == null) {
      alert('Username is empty!');
    } else if (request.email == null) {
      alert('Email is empty!');
    } else if (request.password == null) {
      alert('Password is empty!');
    } else {
      await requestRegister(request).then(async r => {
        if (r != null) {
          this.state.navigation.navigate('Login');
        } else {
          alert('Failed to register!');
        }
      });
    }
  };

  confirmPassword = () => {
    if (this.state.password !== null) {
      return this.state.password === this.state.confirmPassword;
    } else {
      return false;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="First name."
            placeholderTextColor="#003f5c"
            onChangeText={firstName => this.setState({firstName: firstName})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Last name."
            placeholderTextColor="#003f5c"
            onChangeText={lastName => this.setState({lastName: lastName})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username."
            placeholderTextColor="#003f5c"
            onChangeText={username => this.setState({username: username})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email."
            placeholderTextColor="#003f5c"
            onChangeText={email => this.setState({email: email})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => this.setState({password: password})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm password."
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={confirmPassword =>
              this.setState({confirmPassword: confirmPassword})
            }
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() =>
            this.confirmPassword()
              ? this.register()
              : alert('Passwords are different!')
          }>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RegisterScreen;
