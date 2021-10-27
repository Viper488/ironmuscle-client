import {Text, View} from 'react-native';
import trainingsStyles from '../../styles/TrainingsStyles';
import React from 'react';

const Tags = ({items}) => {
  return items.map(tag => {
    return (
      <View key={tag} style={trainingsStyles.btnColor}>
        <Text>{tag}</Text>
      </View>
    );
  });
};

export default Tags;
