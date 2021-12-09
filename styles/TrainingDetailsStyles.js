import {StyleSheet} from 'react-native';
import {black, black2, green, white, yellow} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const tdStyles = StyleSheet.create({
  trainingName: {
    position: 'absolute',
    top: RFValue(10),
    left: RFValue(30),
    fontSize: RFValue(24),
    fontWeight: 'bold',
    color: yellow,
  },
  trainingLength: {
    position: 'absolute',
    top: RFValue(40),
    left: RFValue(30),
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: yellow,
  },
  imageBanner: {
    marginTop: '15%',
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
    borderBottomWidth: RFValue(2),
    borderLeftWidth: RFValue(2),
    borderColor: black2,
  },
  contentList: {
    flex: 3,
    width: '100%',
  },
  bolts: {
    position: 'absolute',
    top: RFValue(10),
    right: RFValue(30),
    flexDirection: 'row',
  },
  card: {
    height: null,
    width: '100%',
    paddingTop: RFValue(10),
    paddingBottom: RFValue(10),
    paddingLeft: RFValue(10),
    backgroundColor: white,
    flexDirection: 'row',
    marginBottom: RFValue(20),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dragBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginRight: '3%',
  },
  exerciseName: {
    flex: 3,
    fontWeight: 'bold',
    fontSize: RFValue(18),
  },
  exerciseDuration: {
    flex: 1,
    marginLeft: '10%',
  },
  exerciseDurationText: {
    fontSize: RFValue(16),
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black2,
  },
  btn: {
    width: '60%',
    borderRadius: RFValue(35),
    borderWidth: RFValue(3),
    borderColor: green,
    height: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFValue(5),
    backgroundColor: green,
  },
  btnText: {
    color: white,
    fontSize: RFValue(24),
    fontWeight: '700',
  },
});

export default tdStyles;
