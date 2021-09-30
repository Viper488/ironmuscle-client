import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  forgotBtn: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop: -18,
    height: 30,
    marginBottom: 30,
  },
  forgotText: {
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
    color: '#fff',
  },
  signupText: {
    color: '#0eb05f',
  },
  loginImage: {
    width: '100%',
    height: '100%',
  },
});

export default loginStyles;
