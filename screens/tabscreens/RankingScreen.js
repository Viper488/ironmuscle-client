import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {FlatList, Image, RefreshControl, Text, View} from 'react-native';
import styles from '../../styles/Styles';
import rankingStyles from '../../styles/RankingStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  getBadges,
  getMyself,
  getRanking,
  getUserRanking,
} from '../../Networking';
import Badges from '../components/Badges';
import historyStyles from '../../styles/HistoryStyles';
import {white, yellow} from '../../styles/Colors';

const RankingScreen = ({navigation, route}) => {
  const [badges, setBadges] = useState([]);
  const [userRanking, setUserRanking] = useState({});
  const [ranking, setRanking] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      updateRankings();
    }, []),
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateRankings();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const updateRankings = () => {
    getBadges()
      .then(response => {
        setBadges(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    getUserRanking()
      .then(response => {
        setUserRanking(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    getRanking()
      .then(response => {
        setRanking(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={rankingStyles.header}>
        <View style={rankingStyles.headerContent}>
          <View style={rankingStyles.avatarContent}>
            <Image
              style={rankingStyles.avatar}
              source={{
                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              }}
            />
          </View>
          <View style={rankingStyles.userBadgeContent}>
            <Text style={rankingStyles.name}>{userRanking.username}</Text>
            <View style={rankingStyles.userRankContent}>
              <Text style={rankingStyles.name}>
                {'Rank '}
                {userRanking.rank}{' '}
              </Text>
              <Text style={rankingStyles.name}>
                {userRanking.points}
                {' points'}
              </Text>
            </View>
          </View>
        </View>
        <View style={rankingStyles.badgesContent}>
          <Badges badges={badges} />
        </View>
        <View style={rankingStyles.rankingHeader}>
          <Text style={rankingStyles.rankingHeaderText}>TOP 100</Text>
        </View>
        <View style={rankingStyles.rankingContent}>
          <FlatList
            style={rankingStyles.rankingList}
            data={ranking}
            keyExtractor={item => {
              return item.id;
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    rankingStyles.card,
                    {
                      backgroundColor:
                        item.username === userRanking.username ? yellow : white,
                    },
                  ]}>
                  <View style={rankingStyles.rankingItemContent}>
                    <Text>{item.rank}</Text>
                  </View>
                  <View style={rankingStyles.rankingItemContent}>
                    <Text>{item.username}</Text>
                  </View>
                  <View style={rankingStyles.rankingItemContent}>
                    <Text>{item.points}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RankingScreen;
