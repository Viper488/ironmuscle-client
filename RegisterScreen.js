import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles/Styles';
import {requestRegister} from './Networking';
import {Snackbar} from 'react-native-paper';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      username: null,
      email: null,
      name: null,
      lastName: null,
      password: null,
      confirmPassword: null,
      visible: false,
      message: '',
      timePassed: false,
    };
  }

  toggleSnackbar = message => {
    this.setState({message: message});
    this.setState({visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  register = async () => {
    let request = {
      name: this.state.name,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      roles: ['USER'],
    };

    await requestRegister(request).then(response => {
      if (response.status === 200) {
        this.toggleSnackbar('Registered successfully!').then(() => {
          this.state.navigation.navigate('Login');
        });
      } else {
        this.toggleSnackbar(response.data);
      }
    });
  };

  validate = () => {
    if (this.state.username == null) {
      this.toggleSnackbar('Username is empty!');
      return false;
    } else if (this.state.email == null) {
      this.toggleSnackbar('Email is empty!');
      return false;
    } else if (this.state.password == null) {
      this.toggleSnackbar('Password is empty!');
      return false;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.toggleSnackbar('Passwords are different!');
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username."
            placeholderTextColor="#8c8c8c"
            onChangeText={username => this.setState({username: username})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email."
            placeholderTextColor="#8c8c8c"
            onChangeText={email => this.setState({email: email})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Name."
            placeholderTextColor="#8c8c8c"
            onChangeText={name => this.setState({name: name})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Last name."
            placeholderTextColor="#8c8c8c"
            onChangeText={lastName => this.setState({lastName: lastName})}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password."
            placeholderTextColor="#8c8c8c"
            secureTextEntry={true}
            onChangeText={password => this.setState({password: password})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm password."
            placeholderTextColor="#8c8c8c"
            secureTextEntry={true}
            onChangeText={confirmPassword =>
              this.setState({confirmPassword: confirmPassword})
            }
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => (this.validate() ? this.register() : null)}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
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

export default RegisterScreen;
