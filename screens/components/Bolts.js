import {View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

export default function Bolts(props) {
  let color1 =
    props.difficulty === 'Beginner' ||
    props.difficulty === 'Mediocre' ||
    props.difficulty === 'Pro'
      ? 'blue'
      : 'lightgrey';
  let color2 =
    props.difficulty === 'Mediocre' || props.difficulty === 'Pro'
      ? 'blue'
      : 'lightgrey';
  let color3 = props.difficulty === 'Pro' ? 'blue' : 'lightgrey';

  return (
    <View style={{flexDirection: 'row'}}>
      <FontAwesome5 name={'bolt'} size={30} color={color1} />
      <FontAwesome5 name={'bolt'} size={30} color={color2} />
      <FontAwesome5 name={'bolt'} size={30} color={color3} />
    </View>
  );
}
