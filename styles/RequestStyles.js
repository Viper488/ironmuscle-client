import {StyleSheet} from 'react-native';
import {black, black2, green, white, white2, white3} from './Colors';

const requestStyles = StyleSheet.create({
  notificationList: {
    marginTop: '2%',
    width: '100%',
    padding: 10,
  },
  card: {
    width: '100%',
    backgroundColor: white,
    padding: '5%',
  },
  titleContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  descriptionContent: {
    flex: 3,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  status: {
    fontWeight: '700',
  },
  floatingBtn: {
    height: 75,
    width: 75,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 100,
    backgroundColor: green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBtn2: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: '3%',
    right: '3%',
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default requestStyles;
