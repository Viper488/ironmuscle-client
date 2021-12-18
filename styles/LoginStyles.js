import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const loginStyles = StyleSheet.create({
  forgotBtn: {},
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
  loggedContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContent: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default loginStyles;
