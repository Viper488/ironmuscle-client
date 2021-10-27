import {StyleSheet} from 'react-native';
import {black, black2, green, white, yellow} from './Colors';

const tdStyles = StyleSheet.create({
  trainingName: {
    position: 'absolute',
    top: 10,
    left: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: yellow,
  },
  /*  trainingDiff: {
    position: 'absolute',
    top: 70,
    left: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: yellow,
  },*/
  trainingLength: {
    position: 'absolute',
    top: 40,
    left: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: yellow,
  },
  imageBanner: {
    flex: 1,
    width: '100%',
  },
  cardContent: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: black2,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: black2,
  },
  contentList: {
    flex: 3,
    width: '100%',
  },
  bolts: {
    position: 'absolute',
    top: 10,
    right: 30,
    flexDirection: 'row',
  },
  card: {
    height: null,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: white,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dragBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  exerciseName: {
    flex: 3,
    fontWeight: 'bold',
    fontSize: 18,
  },
  exerciseDuration: {
    flex: 1,
    marginLeft: '10%',
  },
  exerciseDurationText: {
    fontSize: 16,
  },
  btn: {
    width: '60%',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: green,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: black,
    position: 'absolute',
    top: '15%',
  },
  btnText: {
    color: white,
    fontSize: 18,
  },
});

export default tdStyles;
