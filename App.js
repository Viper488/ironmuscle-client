/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomDrawer from './screens/CustomDrawer';
import RegisterScreen from './screens/RegisterScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeScreen from './screens/user/tabscreens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import TrainingDetailsScreen from './screens/user/training/TrainingDetailsScreen';
import ExerciseScreen from './screens/user/exercise/ExerciseScreen';
import HistoryScreen from './screens/user/tabscreens/HistoryScreen';
import RankingScreen from './screens/user/tabscreens/RankingScreen';
import RequestsScreen from './screens/user/tabscreens/RequestsScreen';
import {black, grey3, grey4, white} from './styles/Colors';
import ERequestsScreen from './screens/trainer/tabscreens/ERequestsScreen';
import ETrainingsScreen from './screens/trainer/tabscreens/ETrainingsScreen';
import CreateTrainingScreen from './screens/trainer/create/CreateTrainingScreen';
import AddExercisesScreen from './screens/trainer/create/AddExercisesScreen';
import EditExercisesScreen from './screens/trainer/create/EditExercisesScreen';
import UsersScreen from './screens/admin/tabscreens/UsersScreen';
import CreateUser from './screens/admin/create/CreateUser';
import MyERequestsScreen from './screens/trainer/tabscreens/MyERequestsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const UserHomeTab = () => {
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

const TrainerHomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={'RequestsE'}
      backBehavior={'initialRoute'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'RequestsE') {
            iconName = 'align-justify';
            size = focused ? 25 : 20;
            color = focused ? white : grey3;
          } else if (route.name === 'MyRequests') {
            iconName = 'award';
            size = focused ? 25 : 20;
            color = focused ? white : grey3;
          } else if (route.name === 'TrainingsE') {
            iconName = 'dumbbell';
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
        name="RequestsE"
        component={ERequestsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="MyRequests"
        component={MyERequestsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="TrainingsE"
        component={ETrainingsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const UserHome = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="UHome"
        component={UserHomeTab}
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

const TrainerHome = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="EHome"
        component={TrainerHomeTab}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="CreateTraining"
        component={CreateTrainingScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="AddExercises"
        component={AddExercisesScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="EditExercises"
        component={EditExercisesScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const AdminHome = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="AUsers"
        component={UsersScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="ACreateUser"
        component={CreateUser}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" backBehavior={'initialRoute'}>
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
            name="UserHome"
            component={UserHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TrainerHome"
            component={TrainerHome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AdminHome"
            component={AdminHome}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
