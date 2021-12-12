import {StyleSheet} from 'react-native';
import {
  grey5,
} from '../../../styles/Colors';
import {RFValue} from 'react-native-responsive-fontsize';

const usersStyles = StyleSheet.create({
  card: {
    flex: 6,
    backgroundColor: grey5,
    borderRadius: RFValue(30),
    flexDirection: 'row',
    paddingRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContent: {
    flex: 1,
  },
});
export default usersStyles;
