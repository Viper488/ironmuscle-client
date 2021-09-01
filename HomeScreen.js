import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {getWelcome} from './Networking';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      welcome: '',
    };
  }

  async componentDidMount() {
    await getWelcome().then(async r => {
      if (r.status === 200) {
        alert(r.data);
        this.setState({welcome: r.data});
      }
    });
  }

  render() {
    return (
      <View>
        <SafeAreaView>
          <Text>{this.state.welcome}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

export default HomeScreen;
