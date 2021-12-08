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
import {getBadges, handleError} from '../../Networking';

const Badges = ({navigation, toggle}) => {
  const [changed, setChanged] = useState(false);
  const [localBadge, setLocalBadge] = useState([
    {
      key: 1,
      name: 'Silver',
      icon: require('../../images/badges/silver.png'),
      opacity: 0.3,
    },
    {
      key: 2,
      name: 'Gold',
      icon: require('../../images/badges/gold.png'),
      opacity: 0.3,
    },
    {
      key: 3,
      name: 'Platinum',
      icon: require('../../images/badges/platinum.png'),
      opacity: 0.3,
    },
    {
      key: 4,
      name: 'Diamond',
      icon: require('../../images/badges/diamond.png'),
      opacity: 0.3,
    },
    {
      key: 5,
      name: 'Master',
      icon: require('../../images/badges/master.png'),
      opacity: 0.3,
    },
    {
      key: 6,
      name: 'Grandmaster',
      icon: require('../../images/badges/grandmaster.png'),
      opacity: 0.3,
    },
    {
      key: 7,
      name: 'Champion',
      icon: require('../../images/badges/champion.png'),
      opacity: 0.3,
    },
  ]);
  useFocusEffect(
    React.useCallback(() => {
      getBadges()
        .then(response => {
          console.log(response.data);
          let lbadge = localBadge;
          response.data.forEach(b => {
            lbadge.forEach(lb => {
              if (lb.name === b.name) {
                lb.opacity = 1;
                setChanged(!changed);
              }
            });
          });
          setLocalBadge([]);
          setLocalBadge(lbadge);
        })
        .catch(error => {
          handleError({navigation, error});
        });
    }, []),
  );

  return (
    <FlatList
      style={{flexDirection: 'column'}}
      numColumns={3}
      data={localBadge}
      extraData={changed}
      keyExtractor={item => {
        return item.id;
      }}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={rankingStyles.badge}
            onPress={() => {
              toggle(item.name);
            }}>
            <Image
              source={item.icon}
              resizeMode={'center'}
              style={{height: 100, width: 100, opacity: item.opacity}}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Badges;
