import {Image, View} from 'react-native';
import React from 'react';
import rankingStyles from '../../styles/RankingStyles';

const Badges = ({badges}) => {
  return badges.map(badge => {
    return (
      <View key={badge.id} style={rankingStyles.badge}>
        <Image
          source={{uri: 'data:image/png;base64,' + badge.icon}}
          resizeMode={'center'}
          style={{height: 100, width: 100}}
        />
      </View>
    );
  });
};

export default Badges;
