import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {getWelcome, USER} from '../Networking';
import styles from '../styles/Styles';
import homeStyles from '../styles/HomeStyles';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <View style={[styles.container, {padding: '2.5%'}]}>
        <TouchableOpacity
          style={{
            borderRadius: 30,
            flex: 1,
            backgroundColor: 'red',
            width: '100%',
          }}>
          <Image
            style={homeStyles.image}
            source={require('../images/crossfit.jpg')}
            resizeMode={'cover'}
          />
          <Text style={[homeStyles.title, {left: '5%', bottom: '5%'}]}>
            CROSSFIT
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            paddingTop: '2.5%',
          }}>
          <View style={{flexDirection: 'column', flex: 1, width: '50%'}}>
            <TouchableOpacity
              style={{
                marginBottom: '2.5%',
                marginRight: '1.75%',
                borderRadius: 30,
                backgroundColor: 'blue',
                flex: 1,
                width: '100%',
              }}>
              <Image
                style={homeStyles.image}
                source={require('../images/gym.jpg')}
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
              }}>
              <Image
                style={homeStyles.image}
                source={require('../images/running.jpg')}
                resizeMode={'cover'}
              />
              <Text style={homeStyles.title}>RUNNING</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginLeft: '1.75%',
              borderRadius: 30,
              backgroundColor: 'green',
              flex: 1,
              width: '50%',
            }}>
            <Image
              style={homeStyles.image}
              source={require('../images/yoga.jpg')}
              resizeMode={'cover'}
            />
            <Text style={[homeStyles.title, {bottom: '5%'}]}>YOGA</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
