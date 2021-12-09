import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import rankingStyles from '../../styles/RankingStyles';
import {useFocusEffect} from '@react-navigation/native';
import {getBadges, getUserBadges, handleError} from '../../Networking';
import {RFValue} from 'react-native-responsive-fontsize';

const Badges = ({navigation, toggle}) => {
  const [changed, setChanged] = useState(false);
  const [badges, setBadges] = useState([]);
  const localBadge = new Map();
  localBadge.set('Iron', require('../../images/badges/iron.png'));
  localBadge.set('Bronze', require('../../images/badges/bronze.png'));
  localBadge.set('Silver', require('../../images/badges/silver.png'));
  localBadge.set('Gold', require('../../images/badges/gold.png'));
  localBadge.set('Platinum', require('../../images/badges/platinum.png'));
  localBadge.set('Diamond', require('../../images/badges/diamond.png'));
  localBadge.set('Master', require('../../images/badges/master.png'));
  localBadge.set('Grandmaster', require('../../images/badges/grandmaster.png'));
  localBadge.set('Champion', require('../../images/badges/champion.png'));

  useFocusEffect(
    React.useCallback(() => {
      getBadges()
        .then(response => {
          response.data.forEach(b => {
            Object.assign(b, {
              key: b.id,
              icon: localBadge.get(b.name),
              opacity: 0.3,
            });
          });
          console.log(response.data);
          getUserBadges()
            .then(r => {
              console.log(r.data);
              r.data.forEach(b => {
                response.data.forEach(b2 => {
                  if (b2.name === b.name) {
                    b2.opacity = 1;
                  }
                });
              });
              setChanged(!changed);
              setBadges(response.data);
              console.log(badges);
            })
            .catch(error => {
              handleError({navigation, error});
            });
        })
        .catch(error => {
          handleError({navigation, error});
        });
    }, []),
  );

  return (
    <FlatList
      style={{
        flexDirection: 'column',
      }}
      contentContainerStyle={{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      numColumns={3}
      data={badges}
      extraData={changed}
      keyExtractor={item => {
        return item.key;
      }}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={rankingStyles.badge}
            onPress={() => {
              toggle(item.name + ' ' + item.goal);
            }}>
            <Image
              source={item.icon}
              resizeMode={'center'}
              style={{
                height: RFValue(100),
                width: RFValue(100),
                opacity: item.opacity,
              }}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Badges;
