import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222326',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: '#222326',
    borderBottomWidth: 2,
    borderBottomColor: '#8c8c8c',
    width: '80%',
    height: 45,
    marginBottom: 20,
    alignItems: 'flex-start',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 16,
    color: '#8c8c8c',
  },
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
  loginBtn: {
    width: '60%',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#0eb05f',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#222326',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
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
  }
});

export default styles;
