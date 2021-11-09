import {StyleSheet} from 'react-native';
import {
  black,
  blue,
  green,
  grey,
  grey2,
  grey3,
  grey4,
  grey5,
  white,
  white2,
  white3,
  yellow,
} from '../../../styles/Colors';

const eRequestStyles = StyleSheet.create({
  requests: {
    marginTop: '2%',
    width: '100%',
    padding: 10,
  },
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: grey5,
    padding: '5%',
    borderRadius: 20,
  },
  titleContent: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: white,
    borderRadius: 20,
    padding: '5%',
  },
  btnText: {
    color: white,
    fontSize: 18,
  },
  bodyPart: {
    backgroundColor: white,
    borderRadius: 20,
    padding: '5%',
    marginTop: '3%',
  },
  bodyPartText: {
    fontSize: 16,
  },
  description: {
    flex: 3,
    height: 160,
    width: '100%',
    backgroundColor: white,
    borderRadius: 20,
    padding: '5%',
    marginVertical: '3%',
  },
  cardFooter: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '60%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: green,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
  },
});
export default eRequestStyles;
