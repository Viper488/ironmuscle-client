import 'react-native-gesture-handler';
import React, {Component, useEffect, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import styles from '../../styles/Styles';
import profileStyles from '../../styles/ProfileStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Snackbar} from 'react-native-paper';
import {changePassword, getMyself} from '../../Networking';

class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      passwordModalVisible: false,
      icon: 'cog',
      editable: false,
      visible: false,
      message: '',
      user: {
        id: '',
        username: '',
        email: '',
        name: '',
        lastName: '',
      },
      password: '',
      newPassword: '',
      confirmPassword: '',
    };
  }
  async componentDidMount() {
    await getMyself()
      .then(response => {
        console.log(response.status);
        this.setState({user: response.data});
      })
      .catch(error => {
        console.log(error.status);
        console.log(error);
      });
  }

  changePasswordRequest = async () => {
    let password = this.state.password;
    let newPassword = this.state.newPassword;
    let confirmPassword = this.state.confirmPassword;

    if (password === '') {
      this.toggleSnackbar('Password can not be empty');
    } else if (newPassword === '') {
      this.toggleSnackbar('New password can not be empty');
    } else if (confirmPassword === '') {
      this.toggleSnackbar('Confirm password');
    } else if (newPassword === password) {
      this.toggleSnackbar('New password can not be the same as old password');
    } else if (newPassword !== confirmPassword) {
      this.toggleSnackbar('Confirm password is different than new password');
    } else {
      let request = {oldPassword: password, newPassword: newPassword};
      await changePassword(request)
        .then(response => {
          this.setState({
            passwordModalVisible: !this.state.passwordModalVisible,
          });
          console.log(response.status);
          console.log('Password changed');
          this.toggleSnackbar('Password changed');
        })
        .catch(error => {
          console.log(error.status);
          console.log(error.response.data.message);
          this.toggleSnackbar(error.response.data.message);
          if (error.response.status === 401) {
            this.props.navigation.navigate('Login');
          }
        });
    }
  };

  toggleSnackbar = message => {
    this.setState({message: message, visible: true});
  };

  onDismissSnackBar = () => {
    this.setState({visible: false});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={profileStyles.header}>
          <View style={profileStyles.headerContent}>
            <Image
              style={profileStyles.avatar}
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar2.png',
              }}
            />
            <Text style={profileStyles.name}>
              {this.state.user.name + ' ' + this.state.user.lastName}
            </Text>
            <Text>{this.state.user.email}</Text>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: !this.state.modalVisible});
          }}>
          <View style={profileStyles.modalBody}>
            <Text style={styles.btnText}>Edit profile</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter new email'}
                placeholderTextColor="#8c8c8c"
                onChangeText={email => {
                  const user = Object.assign({}, this.state.user, {
                    email: email,
                  });
                  this.setState({user: user});
                }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter new name'}
                placeholderTextColor="#8c8c8c"
                onChangeText={name => {
                  const user = Object.assign({}, this.state.user, {
                    name: name,
                  });
                  this.setState({user: user});
                }}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                placeholder={'Enter new last name'}
                placeholderTextColor="#8c8c8c"
                onChangeText={lastName => {
                  const user = Object.assign({}, this.state.user, {
                    lastName: lastName,
                  });
                  this.setState({user: user});
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.setState({
                  modalVisible: !this.state.modalVisible,
                });
              }}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.setState({
                  modalVisible: !this.state.modalVisible,
                });
              }}>
              <Text style={styles.btnText}>Abort changes</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.passwordModalVisible}>
          <View style={profileStyles.modalBody}>
            <Text style={styles.btnText}>Change password</Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'Current password'}
                placeholderTextColor="#8c8c8c"
                onChangeText={password => this.setState({password: password})}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'New password'}
                placeholderTextColor="#8c8c8c"
                onChangeText={newPassword =>
                  this.setState({newPassword: newPassword})
                }
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'Confirm password'}
                placeholderTextColor="#8c8c8c"
                onChangeText={confirmPassword =>
                  this.setState({confirmPassword: confirmPassword})
                }
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.changePasswordRequest().then(undefined);
              }}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.setState({
                  passwordModalVisible: !this.state.passwordModalVisible,
                });
              }}>
              <Text style={styles.btnText}>Abort changes</Text>
            </TouchableOpacity>
          </View>
          {
            <Snackbar
              visible={this.state.visible}
              onDismiss={() => this.onDismissSnackBar}
              action={{
                label: 'Close',
                onPress: () => {
                  this.setState({visible: false});
                },
              }}>
              {this.state.message}
            </Snackbar>
          }
        </Modal>
        <View style={profileStyles.body}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({
                passwordModalVisible: !this.state.passwordModalVisible,
              });
            }}>
            <Text style={styles.btnText}>Change password</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={profileStyles.btn}
          onPress={() => {
            this.setState({
              modalVisible: !this.state.modalVisible,
            });
          }}>
          <FontAwesome5 name={'cog'} size={25} color={'white'} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default HistoryScreen;
