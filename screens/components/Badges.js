import {FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import rankingStyles from '../../styles/RankingStyles';
import {useFocusEffect} from '@react-navigation/native';
import {getBadges, getUserBadges, handleError} from '../../Networking';
import {RFValue} from 'react-native-responsive-fontsize';

const Badges = ({navigation, toggle}) => {
  const [changed, setChanged] = useState(false);
  const [badges, setBadges] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getBadges()
        .then(response => {
          response.data.forEach(b => {
            Object.assign(b, {
              key: b.id,
              opacity: 0.3,
            });
          });
          getUserBadges()
            .then(r => {
              r.data.forEach(b => {
                response.data.forEach(b2 => {
                  if (b2.name === b.name) {
                    b2.opacity = 1;
                  }
                });
              });
              setChanged(!changed);
              setBadges(response.data);
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
              source={{
                uri: 'data:image/png;base64,' + item.image,
              }}
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
