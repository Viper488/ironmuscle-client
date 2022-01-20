import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import styles from '../../../styles/Styles';
import {getUserActivities, handleError} from '../../../Networking';
import historyStyles from '../../../styles/HistoryStyles';
import {
  getDate,
  getDateTime,
  toHHMMSS,
} from '../../functions/Functions';
import Bolts from '../../components/Bolts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Calendar} from 'react-native-calendars';
import {blue, green, grey} from '../../../styles/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';

const HistoryScreen = ({navigation, route}) => {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUserHistory(new Date().getFullYear(), new Date().getMonth() + 1);
    }, []),
  );

  const getUserHistory = (year, month) => {
    getUserActivities(year, month)
      .then(response => {
        if (response) {
          setHistory(response.data);
        }
      })
      .catch(error => {
        handleError({navigation, error});
      });
  };

  const markedDates = () => {
    let dateHolder = [];
    history.forEach(item => {
      dateHolder.push([
        getDate(item.date),
        {selected: true, selectedColor: green},
      ]);
    });
    return Object.fromEntries(dateHolder);
  };

  return (
    <View style={styles.container}>
      <View style={historyStyles.calendarContent}>
        <Calendar
          style={{marginBottom: '2%'}}
          theme={{
            textDayFontSize: RFValue(10),
            textMonthFontSize: RFValue(16),
            textDayHeaderFontSize: RFValue(8),
          }}
          onMonthChange={month => {
            getUserHistory(month.year, month.month);
          }}
          markedDates={markedDates()}
        />
      </View>
      <View style={historyStyles.contentList}>
        {history.length === 0 ? (
          <View style={{flex: 1, paddingTop: '25%'}}>
            <Text style={historyStyles.noTrainingsText}>
              No trainings this month yet!
            </Text>
          </View>
        ) : (
          <FlatList
            style={historyStyles.notificationList}
            data={history}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item, index}) => {
              return (
                <View style={historyStyles.card}>
                  <View style={historyStyles.imageSection}>
                    <Image
                      style={historyStyles.image}
                      source={{uri: 'data:image/png;base64,' + item.image}}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View style={historyStyles.sections}>
                    <View style={historyStyles.nameSection}>
                      <View style={historyStyles.dateContent}>
                        <Text style={historyStyles.dateText}>
                          {getDateTime(item.date)}
                        </Text>
                        <Text />
                        <View style={historyStyles.bolts}>
                          <Bolts
                            difficulty={item.difficulty}
                            size={RFValue(20)}
                          />
                        </View>
                      </View>
                      <View style={historyStyles.nameContent}>
                        <Text style={historyStyles.name}>
                          {item.name} {item.difficulty}
                        </Text>
                      </View>
                    </View>
                    <View style={historyStyles.contentSection}>
                      <FontAwesome5
                        name={'stopwatch'}
                        size={RFValue(20)}
                        color={'blue'}
                        style={historyStyles.stopwatch}
                      />
                      <Text style={historyStyles.dateText}>
                        {toHHMMSS(item.time)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default HistoryScreen;
