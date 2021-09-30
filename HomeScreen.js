import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {getWelcome} from './Networking';
import styles from './styles/Styles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      welcome: '',
    };
  }

  async componentDidMount() {
    await getWelcome().then(response => {
      if (response.status === 200) {
        this.setState({welcome: response.data});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Text>{this.state.welcome}</Text>

        </SafeAreaView>
      </View>
    );
  }
}

export default HomeScreen;
