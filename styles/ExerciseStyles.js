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
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    flex: 4,
    width: '100%',
    backgroundColor: black,
    justifyContent: 'center',
    alignContent: 'center',
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
  imageContent: {
    width: '100%',
    flex: 3,
  },
  image: {
    width: 200,
    height: 180,
    alignSelf: 'center',
  },
  repetitions: {
    alignSelf: 'center',
    fontSize: 24,
    color: black,
  },
  youtubeBtn: {
    flex: 1,
    backgroundColor: black,
    alignSelf: 'flex-end',
  },
});

export default exerciseStyles;
