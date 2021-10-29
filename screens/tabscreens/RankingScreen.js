import 'react-native-gesture-handler';
import React, {Component, useEffect, useState} from 'react';
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
import {white, yellow} from '../../styles/Colors';

const RankingScreen = ({navigation, route}) => {
  const [badges, setBadges] = useState([]);
  const [userRanking, setUserRanking] = useState({});
  const [ranking, setRanking] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [flatListRef, setFlatListRef] = useState({});

  useFocusEffect(
    React.useCallback(() => {
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
      getRanking(page)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setRanking([...ranking, ...response.data.ranking]);
        })
        .catch(error => {
          console.log(error);
        });
    }, [page]),
  );

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  /*  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    let newPage = page - 1;
    if (newPage >= 0) {
      setPage(newPage);
      getRanking(page)
        .then(response => {
          setPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
          setRanking(response.data.ranking);
        })
        .catch(error => {
          console.log(error);
        });
    }
    wait(2000).then(() => setRefreshing(false));
  }, [page]);*/

  const loadMoreData = () => {
    let newPage = page + 1;
    if (newPage < totalPages) {
      setPage(newPage);
      // getRanking(page)
      //   .then(response => {
      //     console.log('RANKING LOAD MORE DATA');
      //     setPage(response.data.currentPage);
      //     setTotalPages(response.data.totalPages);
      //     setRanking([...ranking, ...response.data.ranking]);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      //scrollToIndex();
    }
  };

  const scrollToIndex = () => {
    flatListRef.scrollToIndex({animated: false, index: 0});
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
          <Text style={rankingStyles.rankingHeaderText}>LEADERBOARD</Text>
        </View>
        <View style={rankingStyles.rankingContent}>
          <FlatList
            style={rankingStyles.rankingList}
            data={ranking}
            keyExtractor={(item, index) => index}
            /*            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }*/
            ref={ref => {
              setFlatListRef(ref);
            }}
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
