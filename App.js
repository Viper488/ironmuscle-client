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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import NetInfo from '@react-native-community/netinfo';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import {Provider as PaperProvider} from 'react-native-paper';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ProfileScreen from './screens/ProfileScreen';
const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Trainings'}
      backBehavior={'initialRoute'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Trainings') {
            iconName = 'dumbbell';
            size = focused ? 25 : 20;
            color = focused ? '#0eb05f' : '#555';
          } else if (route.name === 'Requests') {
            iconName = 'align-justify';
            size = focused ? 25 : 20;
            color = focused ? '#0eb05f' : '#555';
          } else if (route.name === 'Profile') {
            iconName = 'user';
            size = focused ? 25 : 20;
            color = focused ? '#0eb05f' : '#555';
          } else if (route.name === 'Ranking') {
            iconName = 'award';
            size = focused ? 25 : 20;
            color = focused ? '#0eb05f' : '#555';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0eb05f',
        tabBarInactiveTintColor: '#555',
        tabBarActiveBackgroundColor: '#333',
        tabBarInactiveBackgroundColor: '#222326',
        tabBarLabelStyle: {fontSize: 14},
      })}>
      <Tab.Screen
        name="Trainings"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Requests"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Ranking"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

class App extends Component {
  componentDidMount() {
    NetInfo.fetch().then(networkState => {
      console.log('Connection type - ', networkState.type);
      console.log('Is connected? - ', networkState.isConnected);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      trainings: [],
    };
  }

  render() {
    return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            backBehavior={'initialRoute'}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Reset"
              component={ResetPasswordScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

export default App;
