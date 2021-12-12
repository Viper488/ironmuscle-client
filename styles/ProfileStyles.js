import {StyleSheet} from 'react-native';
import {black, blue, green, grey2, white, yellow} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const profileStyles = StyleSheet.create({
  body: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  modalBody: {
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '20%',
    backgroundColor: black,
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    flex: 2,
    width: '100%',
    backgroundColor: green,
  },
  headerContent: {
    padding: RFValue(30),
    alignItems: 'center',
  },
  avatar: {
    width: RFValue(130),
    height: RFValue(130),
    borderRadius: RFValue(63),
    borderWidth: RFValue(4),
    borderColor: black,
    marginBottom: RFValue(2),
  },
  name: {
    fontSize: RFValue(22),
    color: white,
    fontWeight: '600',
  },
  email: {
    fontSize: RFValue(16),
  },
  profileBadges: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: yellow,
  },
  profileDetail: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: white,
  },
  detailContent: {
    margin: RFValue(10),
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(20),
    color: blue,
  },
  count: {
    fontSize: RFValue(18),
  },
  textInfo: {
    fontSize: RFValue(18),
    marginTop: RFValue(20),
    color: grey2,
  },
  buttonContainer: {
    position: 'absolute',
    right: '10%',
    top: '30%',
    height: '10%',
    width: '100%',
  },
  description: {
    fontSize: RFValue(20),
    color: blue,
    marginTop: RFValue(10),
    textAlign: 'center',
  },
  btn: {
    position: 'absolute',
    top: '13%',
    right: '30%',
    width: '13%',
    borderRadius: RFValue(30),
    borderColor: green,
    height: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: RFValue(40),
    backgroundColor: black,
  },
  changeText: {
    color: white,
    fontSize: RFValue(18),
    marginBottom: RFValue(40),
  },
  changeDesc: {
    color: white,
    fontSize: RFValue(14),
    marginTop: RFValue(-20),
    marginBottom: RFValue(40),
  },
});

export default profileStyles;
