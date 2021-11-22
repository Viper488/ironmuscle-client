import {View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {blue, grey2} from '../../styles/Colors';

const Bolts = ({difficulty, size}) => {
  let color1 =
    difficulty === 'beginner' ||
    difficulty === 'mediocre' ||
    difficulty === 'pro'
      ? blue
      : grey2;
  let color2 = difficulty === 'mediocre' || difficulty === 'pro' ? blue : grey2;
  let color3 = difficulty === 'pro' ? blue : grey2;

  return (
    <View style={{flexDirection: 'row'}}>
      <FontAwesome5 name={'bolt'} size={size} color={color1} />
      <FontAwesome5 name={'bolt'} size={size} color={color2} />
      <FontAwesome5 name={'bolt'} size={size} color={color3} />
    </View>
  );
};

export default Bolts;
