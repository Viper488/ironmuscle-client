import {StyleSheet} from 'react-native';
import {
  black,
  blue,
  green,
  grey,
  grey2,
  grey3,
  grey4,
  white,
  white2,
  white3,
  yellow,
} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';
const historyStyles = StyleSheet.create({
  calendarContent: {
    width: '100%',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderColor: black,
  },
  contentList: {
    flex: 5,
    width: '100%',
  },
  noTrainingsText: {
    fontSize: RFValue(26),
    color: white,
    alignSelf: 'center',
  },
  notificationList: {
    flex: 1,
    width: '100%',
  },
  card: {
    height: RFValue(125),
    flexDirection: 'row',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingHorizontal: '2%',
    backgroundColor: white,
    borderBottomWidth: RFValue(1),
    borderColor: black,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textTransform: 'capitalize',
  },
  imageSection: {
    flex: 1,
    backgroundColor: white,
  },
  sections: {
    flex: 3,
    flexDirection: 'column',
    width: '100%',
  },
  nameSection: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: white,
    paddingLeft: '2%',
  },
  dateContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bolts: {
    paddingTop: '1%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentSection: {
    flex: 1,
    backgroundColor: white,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: '2%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  stopwatch: {
    marginRight: '3%',
  },
  dateText: {
    fontSize: RFValue(14),
  }
});

export default historyStyles;
