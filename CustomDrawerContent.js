import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      trainings: [],
    };
  }
  render() {
    const navigation = this.state.navigation;
    return (
      <DrawerContentScrollView>
        <Text>Fitness</Text>
      </DrawerContentScrollView>
    );
  }
}

export default CustomDrawerContent;
