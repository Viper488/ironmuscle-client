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
        <TouchableOpacity
          style={{
            marginTop: '2.5%',
            borderRadius: 30,
            backgroundColor: 'blue',
            flex: 1,
            width: '100%',
          }}
          onPress={() => {
            this.showTrainings('STANDARD');
          }}>
          <Image
            style={homeStyles.image}
            source={require('../../images/gym.jpg')}
            resizeMode={'cover'}
          />
          <Text style={homeStyles.title}>STANDARD</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
