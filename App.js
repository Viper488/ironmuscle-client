/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NetInfo from '@react-native-community/netinfo';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
class App extends Component {
  componentDidMount() {
    NetInfo.fetch().then(networkState => {
      console.log('Connection type - ', networkState.type);
      console.log('Is connected? - ', networkState.isConnected);
    });
    //getTrainings().then(r => this.setState({trainings: r}));
  }

  constructor(props) {
    super(props);
    this.state = {
      trainings: [],
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
