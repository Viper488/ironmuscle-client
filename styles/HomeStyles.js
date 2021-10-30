import {StyleSheet} from 'react-native';
import {black, green, grey3, grey4, white, yellow} from './Colors';

const homeStyles = StyleSheet.create({
  filter: {
    opacity: 0.3,
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  image: {
    borderRadius: 30,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  typeContent: {
    width: '100%',
    backgroundColor: '#000',
    borderRadius: 30,
  },
  type: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  types: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '1%',
    width: '100%',
  },
  typeBtn: {
    borderRadius: 30,
    flex: 1,
    marginHorizontal: '3%',
  },
  trainingsContent: {
    flex: 10,
    backgroundColor: black,
    width: '100%',
  },
});

export default homeStyles;
