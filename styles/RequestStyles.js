import {StyleSheet} from 'react-native';
import {black, black2, green, grey, white, white2, white3} from './Colors';

const requestStyles = StyleSheet.create({
  pickerContent: {
    backgroundColor: white,
    width: '80%',
    height: 40,
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    color: black,
  },
  notificationList: {
    marginTop: '2%',
    width: '100%',
    padding: 10,
  },
  card: {
    height: 250,
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
    fontSize: 24,
    fontWeight: '600',
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
  typeContent: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 30,
  },
  type: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '1%',
    width: '100%',
  },
  typeBtn: {
    borderRadius: 30,
    flex: 1,
    marginHorizontal: '1%',
  },
});

export default requestStyles;
