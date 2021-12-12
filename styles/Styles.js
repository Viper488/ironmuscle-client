import {StyleSheet} from 'react-native';
import {black, green, grey, white} from './Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  snackbar: {
    bottom: RFValue(40),
    height: RFValue(70),
  },
  snackbarWrapper: {
    height: '10%',
  },
  container: {
    flex: 1,
    backgroundColor: black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cogBtn: {
    backgroundColor: black,
    padding: RFValue(5),
    borderRadius: RFValue(20),
    position: 'absolute',
    top: '70%',
    left: '75%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputView: {
    backgroundColor: black,
    borderBottomWidth: RFValue(2),
    borderBottomColor: grey,
    width: '80%',
    height: RFValue(45),
    marginBottom: RFValue(20),
    alignItems: 'flex-start',
  },

  textInput: {
    height: RFValue(50),
    flex: 1,
    padding: RFValue(10),
    marginLeft: RFValue(20),
    fontSize: RFValue(16),
    color: grey,
  },

  btn: {
    width: '60%',
    marginTop: RFValue(40),
    borderRadius: RFValue(30),
    borderWidth: RFValue(3),
    borderColor: green,
    height: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: green,
  },
  btnText: {
    color: white,
    fontSize: RFValue(18),
  },
  exitBtn: {
    position: 'absolute',
    top: 1,
    left: 1,
    marginLeft: '5%',
    marginTop: '5%',
  },
  pickerItem: {
    fontSize: RFValue(14),
  },
});

export default styles;
