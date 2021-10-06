import {StyleSheet} from 'react-native';

const profileStyles = StyleSheet.create({
  body: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
  },
  modalBody: {
    alignSelf: 'center',
    borderColor: '#0eb05f',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: '10%',
    marginBottom: '20%',
    backgroundColor: '#222326',
    flex: 1,
    width: '80%',
    alignItems: 'center',
  },
  header: {
    flex: 2,
    width: '100%',
    backgroundColor: '#0eb05f',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#222326',
    marginBottom: 2,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  profileBadges: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff000',
  },
  profileDetail: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  detailContent: {
    margin: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00CED1',
  },
  count: {
    fontSize: 18,
  },
  textInfo: {
    fontSize: 18,
    marginTop: 20,
    color: '#696969',
  },
  buttonContainer: {
    position: 'absolute',
    right: '10%',
    top: '30%',
    height: '10%',
    width: '100%',
  },
  description: {
    fontSize: 20,
    color: '#00CED1',
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    position: 'absolute',
    top: '13%',
    right: '30%',
    width: '13%',
    borderRadius: 30,
    borderColor: '#0eb05f',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: '#222326',
  },
});

export default profileStyles;
