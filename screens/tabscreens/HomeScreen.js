import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import styles from '../../styles/Styles';
import homeStyles from '../../styles/HomeStyles';
import {getTrainingsByType, JWToken, RefreshToken} from '../../Networking';
import {_removeData, _storeData} from '../../AsyncStorageManager';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to log out?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: async () => {
          await _removeData(JWToken);
          await _removeData(RefreshToken);

          this.props.navigation.navigate('Login');
          return true;
        },
      },
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  showTrainings = type => {
    this.props.navigation.navigate('TrainingsList', {
      type: type.toLowerCase(),
    });
  };

  render() {
    return (
      <View style={[styles.container, {padding: '2.5%'}]}>
        <TouchableOpacity
          style={{
            borderRadius: 30,
            flex: 1,
            backgroundColor: 'orange',
            width: '100%',
          }}
          onPress={() => {
            this.showTrainings('CUSTOM');
          }}>
          <Image
            style={homeStyles.image}
            source={require('../../images/custom.jpg')}
            resizeMode={'cover'}
          />
          <Text style={[homeStyles.title, {left: '5%', bottom: '5%'}]}>
            CUSTOM
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            paddingTop: '2.5%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              width: '50%',
              marginRight: '2%',
            }}>
            <TouchableOpacity
              style={{
                marginBottom: '2.5%',
                marginRight: '1.75%',
                borderRadius: 30,
                backgroundColor: 'blue',
                flex: 1,
                width: '100%',
              }}
              onPress={() => {
                this.showTrainings('GYM');
              }}>
              <Image
                style={homeStyles.image}
                source={require('../../images/gym.jpg')}
                resizeMode={'cover'}
              />
              <Text style={homeStyles.title}>GYM</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: '2.5%',
                marginRight: '1.75%',
                borderRadius: 30,
                backgroundColor: 'yellow',
                flex: 1,
                width: '100%',
              }}
              onPress={() => {
                this.showTrainings('RUNNING');
              }}>
              <Image
                style={homeStyles.image}
                source={require('../../images/running.jpg')}
                resizeMode={'cover'}
              />
              <Text style={homeStyles.title}>RUNNING</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', flex: 1, width: '50%'}}>
            <TouchableOpacity
              style={{
                marginBottom: '2.5%',
                marginRight: '1.75%',
                borderRadius: 30,
                backgroundColor: 'green',
                flex: 1,
                width: '100%',
              }}
              onPress={() => {
                this.showTrainings('YOGA');
              }}>
              <Image
                style={homeStyles.image}
                source={require('../../images/yoga.jpg')}
                resizeMode={'cover'}
              />
              <Text style={homeStyles.title}>YOGA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: '2.5%',
                marginRight: '1.75%',
                borderRadius: 30,
                backgroundColor: 'red',
                flex: 1,
                width: '100%',
              }}
              onPress={() => {
                this.showTrainings('CROSSFIT');
              }}>
              <Image
                style={homeStyles.image}
                source={require('../../images/crossfit.jpg')}
                resizeMode={'cover'}
              />
              <Text style={homeStyles.title}>CROSSFIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
