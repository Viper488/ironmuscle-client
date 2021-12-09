import {StyleSheet} from 'react-native';
import {black, black2, green, grey, white, white2, white3} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const trainingsStyles = StyleSheet.create({
  formContent: {
    flexDirection: 'row',
  },
  inputContainer: {
    borderBottomColor: white3,
    backgroundColor: white,
    borderRadius: RFValue(30),
    borderBottomWidth: 1,
    height: RFValue(45),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: RFValue(10),
  },
  icon: {
    width: RFValue(30),
    height: RFValue(30),
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  searchIcon: {
    marginLeft: '5%',
  },
  inputs: {
    fontSize: RFValue(16),
    height: RFValue(45),
    marginLeft: RFValue(16),
    borderBottomColor: white,
    flex: 1,
  },
  inputsExercise: {
    height: RFValue(45),
    marginLeft: 16,
    borderBottomColor: black,
    flex: 1,
  },
  inputIcon: {
    marginLeft: RFValue(15),
    justifyContent: 'center',
  },
  notificationList: {
    paddingTop: '2%',
    width: '100%',
    padding: RFValue(10),
  },
  card: {
    width: '100%',
    backgroundColor: white,
    flexDirection: 'row',
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: black2,
    width: '100%',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: black2,
  },
  imageContent: {
    flex: 4,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    height: RFValue(120),
  },
  name: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: white,
    marginLeft: '3%',
    textTransform: 'capitalize',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: white2,
    marginTop: 5,
  },
  content: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bolts: {
    flexDirection: 'row',
  },
});

export default trainingsStyles;
