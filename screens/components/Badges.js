import {Image, Text, View} from 'react-native';
import React from 'react';
import rankingStyles from '../../styles/RankingStyles';

const Badges = ({badges}) => {
  return badges.map(badge => {
    return (
      <View key={badge.id} style={rankingStyles.badge}>
        <Image
          source={{uri: badge.icon}}
          resizeMode={'center'}
          style={{height: 50, width: 50}}
        />
      </View>
    );
  });
};

export default Badges;
