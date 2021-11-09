import {StyleSheet} from 'react-native';
import {
  black,
  black2,
  green,
  grey,
  grey2,
  grey3,
  white,
  white2,
  white3,
  yellow,
} from './Colors';

const rankingStyles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: grey2,
  },
  headerContent: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: black,
    marginBottom: 2,
  },
  name: {
    marginLeft: 3,
    fontSize: 22,
    color: white,
  },
  avatarContent: {
    flex: 1,
  },
  rankingContent: {
    flex: 10,
    backgroundColor: black,
  },
  userBadgeContent: {
    flex: 3,
    marginLeft: '10%',
  },
  userContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    backgroundColor: black,
  },
  userRankContent: {
    flexDirection: 'row',
  },
  badgesContent: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingBottom: '1%',
  },
  badge: {
    flexWrap: 'wrap',
    borderRadius: 40,
    marginHorizontal: 3,
    marginTop: 5,
  },
  rankingList: {
    flex: 1,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingHorizontal: '2%',
    backgroundColor: white,
    borderBottomWidth: 1,
    borderColor: black,
    justifyContent: 'space-between',
  },
  rankingItemContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  rankingHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '1%',
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: black,
  },
  rankingHeaderText: {
    marginLeft: 3,
    fontSize: 29,
    color: white,
    fontWeight: '600',
  },
});

export default rankingStyles;
