import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const loginStyles = StyleSheet.create({
  forgotBtn: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: RFValue(-18),
    height: RFValue(30),
    marginBottom: RFValue(30),
  },
  forgotText: {
    fontSize: RFValue(12),
    color: '#0eb05f',
  },
  imageContainer: {
    flex: 2,
    backgroundColor: '#000',
    width: '100%',
    height: '20%',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  registerContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  registerButton: {
    marginTop: '10%',
    flex: 1,
    flexDirection: 'row',
  },
  registerText: {
    fontSize: RFValue(12),
    color: '#fff',
  },
  signupText: {
    color: '#0eb05f',
  },
});

export default loginStyles;
