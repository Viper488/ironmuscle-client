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
} from 'react-native';
import styles from '../styles/Styles';
import profileStyles from '../styles/ProfileStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Snackbar} from 'react-native-paper';
import {
  changeEmail,
  changePassword,
  getMyself,
  handleError,
} from '../Networking';
import exerciseStyles from '../styles/ExerciseStyles';
import {white} from '../styles/Colors';
import {useFocusEffect} from '@react-navigation/native';

const CustomDrawer = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [icon, setIcon] = useState('cog');
  const [editable, setEditable] = useState(false);
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={profileStyles.header}>
        <View style={profileStyles.headerContent}>
          <Image
            style={profileStyles.avatar}
            source={{
              uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
          <Text style={profileStyles.name}>{user.username}</Text>
          <Text>{user.email}</Text>
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
              <FontAwesome5 name={'arrow-left'} size={50} color={white} />
            </View>
          </TouchableOpacity>

          <View style={profileStyles.modalBody}>
            <Text style={styles.btnText}>Edit profile</Text>
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
              <FontAwesome5 name={'arrow-left'} size={50} color={white} />
            </View>
          </TouchableOpacity>

          <View style={profileStyles.modalBody}>
            <Text style={styles.btnText}>Change password</Text>
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
      </View>
      <Snackbar
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
