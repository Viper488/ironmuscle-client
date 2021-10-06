import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222326',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
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

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 16,
    color: '#8c8c8c',
  },

  btn: {
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
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default styles;
