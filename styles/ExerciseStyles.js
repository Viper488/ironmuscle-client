import {StyleSheet} from 'react-native';
import {black, blue, green, grey, white, yellow} from './Colors';

const exerciseStyles = StyleSheet.create({
  titleContent: {
    flex: 1,
    width: '100%',
    backgroundColor: black,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    color: white,
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
    backgroundColor: grey,
  },
  content: {
    flex: 4,
    width: '100%',
    backgroundColor: black,
  },
  controlBtnContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: grey,
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  btn: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: green,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
  },
});

export default exerciseStyles;
