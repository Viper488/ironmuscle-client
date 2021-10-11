import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeData = async (key, value) => {
  try {
    console.log(key + ': ' + value);
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const _retrieveData = async key => {
  try {
    let token = await AsyncStorage.getItem(key);
    if (token !== null) {
      console.log('Retrieved: ' + key + ', ' + token);
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};
