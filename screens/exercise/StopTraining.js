import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import styles from '../../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StopTraining = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text
          style={styles.btnText}
          onPress={() => {
            navigation.navigate('Trainings');
          }}>
          Go back!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StopTraining;
