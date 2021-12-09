import {StyleSheet} from 'react-native';
import {black, green, grey3, grey4, white, yellow} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const homeStyles = StyleSheet.create({
  filter: {
    opacity: 0.3,
    width: '100%',
    height: '100%',
    borderRadius: RFValue(30),
  },
  image: {
    borderRadius: RFValue(30),
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  type: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
    fontSize: RFValue(18),
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
  trainingsContent: {
    flex: 10,
    backgroundColor: black,
    width: '100%',
  },
});

export default homeStyles;
