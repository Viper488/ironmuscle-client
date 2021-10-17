import {StyleSheet} from 'react-native';
import {black, green, grey, white} from './Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputView: {
    backgroundColor: black,
    borderBottomWidth: 2,
    borderBottomColor: grey,
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
    color: grey,
  },

  btn: {
    width: '60%',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: green,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: black,
  },
  btnText: {
    color: white,
    fontSize: 18,
  },
});

export default styles;
