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
import {createDrawerNavigator} from '@react-navigation/drawer';
import NetInfo from '@react-native-community/netinfo';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from './screens/CustomDrawer';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/tabscreens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TrainingDetailsScreen from './screens/training/TrainingDetailsScreen';
import ExerciseScreen from './screens/exercise/ExerciseScreen';
import HistoryScreen from './screens/tabscreens/HistoryScreen';
import RankingScreen from './screens/tabscreens/RankingScreen';
import RequestsScreen from './screens/tabscreens/RequestsScreen';
import {black, grey3, grey4, white} from './styles/Colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
            color = focused ? white : grey3;
          } else if (route.name === 'Requests') {
            iconName = 'align-justify';
            size = focused ? 25 : 20;
            color = focused ? white : grey3;
          } else if (route.name === 'History') {
            iconName = 'user';
            size = focused ? 25 : 20;
            color = focused ? white : grey3;
          } else if (route.name === 'Leaderboard') {
            iconName = 'award';
            size = focused ? 25 : 20;
            color = focused ? white : grey3;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: white,
        tabBarInactiveTintColor: grey3,
        tabBarActiveBackgroundColor: grey4,
        tabBarInactiveBackgroundColor: black,
        tabBarLabelStyle: {fontSize: 14},
      })}>
      <Tab.Screen
        name="Trainings"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Leaderboard"
        component={RankingScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const DrawerHome = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="TrainingDetails"
        component={TrainingDetailsScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Exercise"
        component={ExerciseScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

class App extends Component {
  /*  componentDidMount() {
    NetInfo.fetch().then(networkState => {
      console.log('Connection type - ', networkState.type);
      console.log('Is connected? - ', networkState.isConnected);
    });
  }*/

  constructor(props) {
    super(props);
    this.state = {};
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
              name="DrawerHome"
              component={DrawerHome}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

export default App;
