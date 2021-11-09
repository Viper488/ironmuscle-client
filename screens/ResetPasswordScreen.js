import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/Styles';
import {Snackbar} from 'react-native-paper';
import {requestPasswordReset} from '../Networking';

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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

  sendRequest = async () => {
    let email = this.state.email;
    if (email === '') {
      this.toggleSnackbar('Email can not be empty');
    } else {
      await requestPasswordReset(email).then(response => {
        if (response.status === 200) {
          this.props.navigation.navigate('Login', {
            message: 'Request sent to ' + email,
          });
        } else {
          this.toggleSnackbar(response.data.message);
        }
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            maxLength={255}
            style={styles.textInput}
            placeholder="Email."
            placeholderTextColor="#8c8c8c"
            onChangeText={email => this.setState({email: email})}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => this.sendRequest()}>
          <Text style={styles.btnText}>Send request</Text>
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

export default ResetPasswordScreen;
