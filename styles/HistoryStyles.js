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
const historyStyles = StyleSheet.create({
  calendarContent: {
    flex: 5,
    width: '100%',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderColor: black,
  },
  noTrainingsText: {
    fontSize: 26,
    color: white,
    alignSelf: 'center',
  },
  notificationList: {
    flex: 1,
    width: '100%',
  },
  card: {
    height: 125,
    flexDirection: 'row',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingHorizontal: '2%',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderColor: black,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  contentList: {
    flex: 3,
    width: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
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
});

export default historyStyles;
