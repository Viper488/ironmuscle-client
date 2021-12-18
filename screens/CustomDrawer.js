import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import styles from '../styles/Styles';
import profileStyles from '../styles/ProfileStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Snackbar} from 'react-native-paper';
import {
  changeEmail,
  changeIcon,
  changePassword,
  getMyself,
  handleError,
  JWToken,
  RefreshToken,
} from '../Networking';
import exerciseStyles from '../styles/ExerciseStyles';
import {white} from '../styles/Colors';
import {useFocusEffect} from '@react-navigation/native';
import ImagePicker from 'react-native-document-picker';
import {_removeData, _storeData, LOGIN} from '../AsyncStorageManager';
import {RFValue} from 'react-native-responsive-fontsize';

const CustomDrawer = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getMyself()
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          handleError({navigation, error});
        });
    }, []),
  );

  const logOut = () => {
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
          await _storeData(LOGIN, 'false');

          navigation.navigate('Login');
        },
      },
    ]);
  };

  const changePasswordRequest = () => {
    let password = password;
    let newPassword = newPassword;
    let confirmPassword = confirmPassword;

    if (password === '') {
      toggleSnackbar('Password can not be empty');
    } else if (newPassword === '') {
      toggleSnackbar('New password can not be empty');
    } else if (confirmPassword === '') {
      toggleSnackbar('Confirm password');
    } else if (newPassword === password) {
      toggleSnackbar('New password can not be the same as old password');
    } else if (newPassword !== confirmPassword) {
      toggleSnackbar('Confirm password is different than new password');
    } else {
      let request = {oldPassword: password, newPassword: newPassword};
      changePassword(request)
        .then(response => {
          setPasswordModalVisible(!passwordModalVisible);
          console.log(response.status);
          console.log('Password changed');
          toggleSnackbar('Password changed');
        })
        .catch(error => {
          handleError({navigation, error});
          toggleSnackbar(error.response.data.message);
        });
    }
  };

  const toggleSnackbar = message => {
    setMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => {
    setVisible(false);
  };

  const pickFile = async () => {
    try {
      const res = await ImagePicker.pick({
        type: [ImagePicker.types.images],
      });
      console.log(res[0]);

      const data = new FormData();
      data.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });

      changeIcon(data)
        .then(response => {
          console.log(response.status);
          toggleSnackbar('Image uploaded successfully');
          getMyself()
            .then(response => {
              setUser(response.data);
            })
            .catch(error => {
              handleError({navigation, error});
            });
        })
        .catch(error => {
          handleError({navigation, error});
          toggleSnackbar(error.response.data.message);
        });
    } catch (err) {
      if (ImagePicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={profileStyles.header}>
        <View style={profileStyles.headerContent}>
          <Image
            style={profileStyles.avatar}
            source={{
              uri: 'data:image/png;base64,' + user.icon,
            }}
          />
          <TouchableOpacity onPress={pickFile} style={styles.cogBtn}>
            <FontAwesome5 name={'cog'} size={RFValue(20)} color={white} />
          </TouchableOpacity>
          <Text style={profileStyles.name}>{user.username}</Text>
          <Text style={profileStyles.email}>{user.email}</Text>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={exerciseStyles.modalContent}>
          <TouchableOpacity
            style={exerciseStyles.exitModalBtn}
            onPress={() => setModalVisible(false)}>
            <View>
              <FontAwesome5
                name={'arrow-left'}
                size={RFValue(50)}
                color={white}
              />
            </View>
          </TouchableOpacity>

          <View style={profileStyles.modalBody}>
            <Text style={profileStyles.changeText}>Change email</Text>
            <Text style={profileStyles.changeDesc}>
              Before you change email. Note that you will have to confirm the
              new one before you log in.
            </Text>
            <View style={styles.inputView}>
              <TextInput
                maxLength={255}
                style={styles.textInput}
                placeholder={'Enter new email'}
                placeholderTextColor="#8c8c8c"
                onChangeText={email => {
                  setEmail(email);
                }}
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                changeEmail({email: email, lock: null})
                  .then(response => {
                    toggleSnackbar('Email changed!');
                    setModalVisible(!modalVisible);
                    navigation.navigate('Login');
                  })
                  .catch(error => {
                    handleError({navigation, error});
                    toggleSnackbar(error.response.data.message);
                  });
              }}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          style={styles.snackbar}
          wrapperStyle={styles.snackbarWrapper}
          visible={visible}
          onDismiss={() => onDismissSnackBar()}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible(false);
            },
          }}>
          {message}
        </Snackbar>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)}>
        <View style={exerciseStyles.modalContent}>
          <TouchableOpacity
            style={exerciseStyles.exitModalBtn}
            onPress={() => setPasswordModalVisible(false)}>
            <View>
              <FontAwesome5
                name={'arrow-left'}
                size={RFValue(50)}
                color={white}
              />
            </View>
          </TouchableOpacity>

          <View style={profileStyles.modalBody}>
            <Text style={profileStyles.changeText}>Change password</Text>
            <View style={styles.inputView}>
              <TextInput
                maxLength={255}
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'Current password'}
                placeholderTextColor="#8c8c8c"
                onChangeText={password => setPassword(password)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                maxLength={255}
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'New password'}
                placeholderTextColor="#8c8c8c"
                onChangeText={newPassword => setNewPassword(newPassword)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                maxLength={255}
                style={styles.textInput}
                secureTextEntry={true}
                placeholder={'Confirm password'}
                placeholderTextColor="#8c8c8c"
                onChangeText={confirmPassword =>
                  setConfirmPassword(confirmPassword)
                }
              />
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                changePasswordRequest();
              }}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
          style={styles.snackbar}
          wrapperStyle={styles.snackbarWrapper}
          visible={visible}
          onDismiss={() => onDismissSnackBar()}
          action={{
            label: 'Close',
            onPress: () => {
              setVisible(false);
            },
          }}>
          {message}
        </Snackbar>
      </Modal>
      <View style={profileStyles.body}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text style={styles.btnText}>Change email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setPasswordModalVisible(!passwordModalVisible);
          }}>
          <Text style={styles.btnText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            logOut();
          }}>
          <Text style={styles.btnText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <Snackbar
        style={styles.snackbar}
        wrapperStyle={styles.snackbarWrapper}
        visible={visible}
        onDismiss={() => onDismissSnackBar()}
        action={{
          label: 'Close',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {message}
      </Snackbar>
    </SafeAreaView>
  );
};

export default CustomDrawer;
