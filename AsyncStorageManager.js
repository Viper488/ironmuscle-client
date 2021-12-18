import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = 'login';
export const USERNAME = 'username';
export const PASSWORD = 'password';

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Stored { ' + key + ': ' + value + ' }');
  } catch (error) {
    console.log(error);
  }
};

export const _removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Removed ' + key);
  } catch (error) {
    console.log(error);
  }
};

export const _retrieveData = async key => {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved { ' + key + ': ' + value + ' }');
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
