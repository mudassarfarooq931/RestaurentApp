import {colors, fonts} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.white},
  container: {
    flex: 1,
    paddingTop: height * 0.07,
    backgroundColor: colors.white,
  },
  userInfoSection: {
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  line: {
    height: 0.5,
    backgroundColor: colors.lightestGray,
    marginBottom: 20,
  },
  userName: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.MONTSERRAT_BOLD,
    paddingLeft: 10,
  },
  role: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    paddingLeft: 10,
  },
  avatarWrapper: {
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 60,
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  caption: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
    fontFamily: fonts.MONTSERRAT_BOLD,
    paddingVertical: 10,
  },
});

export default styles;
