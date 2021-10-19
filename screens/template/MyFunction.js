import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import styles from '../../styles/Styles';

const MyFunction = ({navigation, route}) => {
  useEffect(() => {
    return () => {};
  }, []);
  return <View style={styles.container} />;
};

export default MyFunction;
