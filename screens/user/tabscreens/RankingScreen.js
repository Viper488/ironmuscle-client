import 'react-native-gesture-handler';
import React, {Component, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/Styles';
import rankingStyles from '../../../styles/RankingStyles';
import {useFocusEffect} from '@react-navigation/native';
import {
  changeEmail,
  getBadges,
  getRanking,
  getUserRanking,
  handleError,
} from '../../../Networking';
import Badges from '../../components/Badges';
import {
  black,
  black2,
  green,
  grey,
  grey6,
  white,
  yellow,
} from '../../../styles/Colors';
import profileStyles from '../../../styles/ProfileStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import exerciseStyles from '../../../styles/ExerciseStyles';
import {Snackbar} from 'react-native-paper';

const RankingScreen = ({navigation, route}) => {
  const [badges, setBadges] = useState([]);
  const [userRanking, setUserRanking] = useState({});
  const [ranking, setRanking] = useState([]);
  const [top3, setTop3] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
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
          setTop3([
            response.data.ranking.shift(),
            response.data.ranking.shift(),
            response.data.ranking.shift(),
          ]);
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
    setTop3([]);
    getRanking(0)
      .then(response => {
        setPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTop3([
          response.data.ranking.shift(),
          response.data.ranking.shift(),
          response.data.ranking.shift(),
        ]);
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
  const showBadges = () => {
    getBadges()
      .then(response => {
        console.log(response.data.length);
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
    setVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={rankingStyles.header}>
        <View style={rankingStyles.rankingHeader}>
          <View style={rankingStyles.leaderboard}>
            <Text style={rankingStyles.rankingHeaderText}>Leaderboard</Text>
            <Text style={rankingStyles.rankingHeaderMonth}>Month</Text>
          </View>
          <Modal
            animationType="slide-left"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}>
            <View style={exerciseStyles.modalContent}>
              <TouchableOpacity
                style={exerciseStyles.exitModalBtn}
                onPress={() => setVisible(false)}>
                <View>
                  <FontAwesome5 name={'arrow-right'} size={50} color={white} />
                </View>
              </TouchableOpacity>

              <View style={rankingStyles.modalBody}>
                <View style={rankingStyles.user}>
                  <Text style={rankingStyles.modalUser}>1</Text>
                  <Image
                    style={rankingStyles.avatar1}
                    source={{
                      uri: 'data:image/png;base64,' + userRanking.icon,
                    }}
                  />
                  <Text style={rankingStyles.top3username}>
                    {userRanking.username}
                  </Text>
                  <Text style={rankingStyles.top3points}>
                    {userRanking.points}
                  </Text>
                </View>
                <View style={rankingStyles.badgesContent}>
                  <Badges badges={badges} />
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={rankingStyles.openBadges}
            onPress={() => showBadges()}>
            <FontAwesome5 name={'arrow-left'} color={white} size={30} />
          </TouchableOpacity>
        </View>
        <View style={rankingStyles.headerContent}>
          <View style={rankingStyles.avatarContent}>
            {top3.length > 1 ? (
              <View style={rankingStyles.top3}>
                <Text style={rankingStyles.top3username}>2</Text>
                <Image
                  style={[
                    rankingStyles.avatar2,
                    {
                      borderColor:
                        top3[1].username === userRanking.username
                          ? yellow
                          : green,
                    },
                  ]}
                  source={{
                    uri: 'data:image/png;base64,' + top3[1].icon,
                  }}
                />
                <Text style={rankingStyles.top3username}>
                  {top3[1].username}
                </Text>
                <Text style={rankingStyles.top3points}>{top3[1].points}</Text>
              </View>
            ) : undefined}
            {top3.length > 0 ? (
              <View style={rankingStyles.top1}>
                <Image
                  style={rankingStyles.crown}
                  source={require('../../../images/crown_green.png')}
                />
                <Text style={rankingStyles.top3username}>1</Text>
                <Image
                  style={[
                    rankingStyles.avatar1,
                    {
                      borderColor:
                        top3[0].username === userRanking.username
                          ? yellow
                          : green,
                    },
                  ]}
                  source={{
                    uri: 'data:image/png;base64,' + top3[0].icon,
                  }}
                />
                <Text style={rankingStyles.top3username}>
                  {top3[0].username}
                </Text>
                <Text style={rankingStyles.top3points}>{top3[0].points}</Text>
              </View>
            ) : undefined}
            {top3.length > 2 ? (
              <View style={rankingStyles.top3}>
                <Text style={rankingStyles.top3username}>3</Text>
                <Image
                  style={[
                    rankingStyles.avatar3,
                    {
                      borderColor:
                        top3[2].username === userRanking.username
                          ? yellow
                          : green,
                    },
                  ]}
                  source={{
                    uri: 'data:image/png;base64,' + top3[2].icon,
                  }}
                />
                <Text style={rankingStyles.top3username}>
                  {top3[2].username}
                </Text>
                <Text style={rankingStyles.top3points}>{top3[2].points}</Text>
              </View>
            ) : undefined}
          </View>
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
                <View style={rankingStyles.card}>
                  <View style={rankingStyles.rankingItemContent}>
                    <Text style={rankingStyles.rank}>{item.rank}</Text>
                  </View>
                  <View
                    style={[
                      rankingStyles.rankingItemContainer,
                      {
                        backgroundColor:
                          item.username === userRanking.username
                            ? yellow
                            : grey,
                      },
                    ]}>
                    <View style={rankingStyles.rankingItemContent}>
                      <Image
                        style={rankingStyles.avatarItem}
                        source={{
                          uri: 'data:image/png;base64,' + item.icon,
                        }}
                      />
                    </View>
                    <View style={rankingStyles.rankingItemContent}>
                      <Text style={rankingStyles.username}>
                        {item.username}
                      </Text>
                    </View>
                    <View
                      style={[
                        rankingStyles.rankingItemContent,
                        {alignItems: 'flex-end'},
                      ]}>
                      <Text style={rankingStyles.points}>{item.points}</Text>
                    </View>
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
