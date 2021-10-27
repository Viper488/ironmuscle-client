import {StyleSheet} from 'react-native';
import {black, blue, green, grey, white, yellow} from './Colors';

const stopTrainingStyles = StyleSheet.create({
  content: {
    flex: 4,
    width: '100%',
    backgroundColor: white,
    justifyContent: 'center',
    alignContent: 'center',
  },
  finishedContent: {
    flex: 4,
    width: '100%',
    backgroundColor: white,
    paddingHorizontal: '10%',
  },
  finishedText: {
    fontSize: 20,
    color: black,
  },
  finishedImage: {
    alignSelf: 'center',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: white,
    alignContent: 'flex-start',
    justifyContent: 'space-around',
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: black,
    marginBottom: '10%',
  },
  statisticsContent: {
    backgroundColor: white,
  },
  statisticsText: {
    alignSelf: 'center',
    fontSize: 18,
    color: black,
  },

  controlBtnContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: white,
  },
  btn: {
    borderRadius: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
    alignSelf: 'center',
    paddingHorizontal: '15%',
    paddingVertical: '3%',
    flex: 0.5,
  },
  btnContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default stopTrainingStyles;
