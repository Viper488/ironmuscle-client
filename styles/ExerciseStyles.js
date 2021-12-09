import {StyleSheet} from 'react-native';
import {black, blue, green, grey, white, yellow} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const exerciseStyles = StyleSheet.create({
  titleContent: {
    flex: 1,
    width: '100%',
    backgroundColor: black,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: RFValue(36),
    color: white,
  },
  exerciseTitleContent: {
    flex: 1,
    width: '100%',
    backgroundColor: white,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  exerciseTitle: {
    alignSelf: 'center',
    fontSize: RFValue(24),
    color: black,
    fontWeight: 'bold',
  },
  youtubeBtn: {
    marginLeft: '2%',
    alignSelf: 'center',
    backgroundColor: white,
  },
  exerciseContent: {
    flex: 6,
    width: '100%',
    backgroundColor: white,
    alignContent: 'center',
    justifyContent: 'center',
  },
  exerciseName: {
    color: black,
  },
  timerContent: {
    flex: 2,
    width: '100%',
    backgroundColor: white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    flex: 4,
    width: '100%',
    backgroundColor: white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  controlBtnContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: white,
  },
  btn: {
    flex: 2,
    width: '200%',
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(30),
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: black,
    height: '90%',
    alignSelf: 'center',
    marginLeft: '1%',
    marginRight: '1%',
  },
  skipBtn: {
    flex: 1,
    width: '100%',
    paddingHorizontal: RFValue(20),
    borderRadius: RFValue(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: grey,
    height: '50%',
    alignSelf: 'center',
  },
  btnContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: RFValue(26),
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  btnText: {
    color: '#FFF',
    fontSize: RFValue(26),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  skipBtnText: {
    color: '#000',
    fontSize: RFValue(16),
    alignSelf: 'center',
    margin: '5%',
  },
  imageContent: {
    width: '100%',
    flex: 3,
  },
  image: {
    width: '200%',
    height: '120%',
    alignSelf: 'center',
  },
  repetitions: {
    alignSelf: 'center',
    fontSize: RFValue(32),
    color: black,
    fontWeight: 'bold',
  },
  modalContent: {
    paddingHorizontal: '2%',
    height: '100%',
    width: '100%',
    backgroundColor: black,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  exitModalBtn: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: '5%',
  },
});

export default exerciseStyles;
