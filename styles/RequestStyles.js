import {StyleSheet} from 'react-native';
import {
  black,
  black2,
  blue2,
  green,
  grey,
  grey6,
  white,
  white2,
  white3,
} from './Colors';

const requestStyles = StyleSheet.create({
  labelContent: {
    width: '80%',
    marginBottom: 5,
  },
  label: {
    color: white,
    alignSelf: 'flex-start',
  },
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
  requestsList: {
    paddingTop: '2%',
    width: '100%',
    padding: 10,
  },
  card: {
    flex: 1,
    height: null,
    width: '100%',
    backgroundColor: white,
  },
  titleContent: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '5%',
    backgroundColor: black2,
    paddingVertical: '3%',
  },
  descriptionContent: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: white,
  },
  status: {
    fontSize: 24,
    fontWeight: '700',
  },
  floatingBtn: {
    height: 75,
    width: 75,
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 100,
    backgroundColor: blue2,
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
  type: {
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  types: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '1%',
    width: '100%',
    backgroundColor: black,
  },
  typeBtn: {
    borderRadius: 30,
    flex: 1,
    height: '100%',
    alignSelf: 'center',
  },
  typeContent: {
    paddingVertical: '10%',
    width: '100%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  timeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: grey6,
    marginVertical: '2%',
    padding: '2%',
    marginHorizontal: '5%',
  },
  time: {
    fontSize: 16,
  },
  trainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyPart: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default requestStyles;
