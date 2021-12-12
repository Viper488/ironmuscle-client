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
import {RFValue} from 'react-native-responsive-fontsize';

const requestStyles = StyleSheet.create({
  labelContent: {
    width: '80%',
    marginBottom: RFValue(5),
  },
  label: {
    fontSize: RFValue(16),
    color: white,
    alignSelf: 'flex-start',
  },
  pickerContent: {
    backgroundColor: white,
    width: '80%',
    height: RFValue(40),
    marginBottom: RFValue(20),
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
    padding: RFValue(10),
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
    fontSize: RFValue(24),
    fontWeight: '600',
    textTransform: 'capitalize',
    color: white,
  },
  status: {
    fontSize: RFValue(24),
    fontWeight: '700',
  },
  floatingBtn: {
    height: RFValue(75),
    width: RFValue(75),
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    borderRadius: 100,
    backgroundColor: blue2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingBtn2: {
    height: RFValue(40),
    width: RFValue(40),
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
    fontSize: RFValue(14),
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
    borderRadius: RFValue(30),
    flex: 1,
    height: '100%',
    alignSelf: 'center',
  },
  typeContent: {
    paddingVertical: '10%',
    width: '100%',
    borderTopStartRadius: RFValue(20),
    borderTopEndRadius: RFValue(20),
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
    fontSize: RFValue(16),
  },
  trainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyPart: {
    fontSize: RFValue(18),
    fontWeight: '600',
  },
  description: {
    fontSize: RFValue(16),
  },
});

export default requestStyles;
