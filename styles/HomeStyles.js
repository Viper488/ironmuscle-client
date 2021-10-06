import {StyleSheet} from 'react-native';

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
  title: {
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

export default homeStyles;
