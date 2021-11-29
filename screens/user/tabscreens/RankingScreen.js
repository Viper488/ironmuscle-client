import 'react-native-gesture-handler';
import React, {Component, useEffect, useState} from 'react';
import {FlatList, Image, RefreshControl, Text, View} from 'react-native';
import styles from '../../../styles/Styles';
import rankingStyles from '../../../styles/RankingStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  getBadges,
  getRanking,
  getUserRanking,
  handleError,
} from '../../../Networking';
import Badges from '../../components/Badges';
import {white, yellow} from '../../../styles/Colors';
import profileStyles from '../../../styles/ProfileStyles';

const RankingScreen = ({navigation, route}) => {
  const [badges, setBadges] = useState([]);
  const [userRanking, setUserRanking] = useState({});
  const [ranking, setRanking] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getBadges()
        .then(response => {
          setBadges(response.data);
        })
        .catch(error => {
          handleError({navigation, error});
        });
      getUserRanking()
        .then(response => {
          setUserRanking(response.data);
        })
        .catch(error => {
          handleError({navigation, error});
        });
      getRanking(page)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setRanking([...ranking, ...response.data.ranking]);

          console.log('Fetched ' + page);
        })
        .catch(error => {
          handleError({navigation, error});
        });
    }, [page]),
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRanking([]);
    getRanking(0)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setRanking([...ranking, ...response.data.ranking]);

        console.log('Fetched ' + page);
      })
      .catch(error => {
        handleError({navigation, error});
      });
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const loadMoreData = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      console.log('Preparing to fetch ' + newPage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={rankingStyles.header}>
        <View style={rankingStyles.headerContent}>
          <View style={rankingStyles.avatarContent}>
            <Image
              style={rankingStyles.avatar}
              source={{
                uri:
                  userRanking.icon != null
                    ? 'data:image/png;base64,' + userRanking.icon
                    : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
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
          <Text style={rankingStyles.rankingHeaderText}>LEADERBOARD</Text>
        </View>
        <View style={rankingStyles.rankingContent}>
          <FlatList
            style={rankingStyles.rankingList}
            data={ranking}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={0.4}
            onEndReached={loadMoreData}
            renderItem={({item, index}) => {
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
                    <Text style={rankingStyles.rank}>{item.rank}#</Text>
                  </View>
                  <View style={rankingStyles.rankingItemContent}>
                    <Image
                      style={rankingStyles.avatarItem}
                      source={{
                        uri:
                          item.icon != null
                            ? 'data:image/png;base64,' + item.icon
                            : 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
                      }}
                    />
                  </View>
                  <View style={rankingStyles.rankingItemContent}>
                    <Text style={rankingStyles.username}>{item.username}</Text>
                  </View>
                  <View style={[rankingStyles.rankingItemContent, {alignItems: 'flex-end'}]}>
                    <Text style={rankingStyles.points}>{item.points}</Text>
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
