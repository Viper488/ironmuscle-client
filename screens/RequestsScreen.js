import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View} from 'react-native';
import styles from '../styles/Styles';

class RequestsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <View style={styles.container} />;
  }
}

export default RequestsScreen;
