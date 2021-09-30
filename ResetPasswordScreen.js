import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles/Styles';
import {Snackbar} from 'react-native-paper';

class ResetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
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

  sendRequest = () => {
    let email = this.state.email;
    if (email === '') {
      this.toggleSnackbar('Email can not be empty');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
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
