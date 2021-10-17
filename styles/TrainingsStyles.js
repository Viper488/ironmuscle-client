import {StyleSheet} from 'react-native';
import {white, white2, white3} from './Colors';

const trainingsStyles = StyleSheet.create({
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: white3,
    backgroundColor: white,
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: white,
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    width: '100%',
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 45,
    backgroundColor: white,
    flexDirection: 'column',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'row',
  },
  cardContent: {
    width: '50%',
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    height: 120,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: white2,
    marginTop: 5,
  },
  playBtn: {
    width: '50%',
    paddingRight: 20,
    alignItems: 'flex-end',
  },
  bolts: {
    position: 'absolute',
    top: -20,
    right: 10,
    flexDirection: 'row',
  },
});

export default trainingsStyles;
