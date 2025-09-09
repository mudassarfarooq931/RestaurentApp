import {colors, fonts} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.black,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginRight: 15,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 1,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_BOLD,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.lightGray,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  menuSection: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  menuText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    marginLeft: 15,
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lighterGray,
    marginBottom: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    marginLeft: 15,
  },
});

export default styles;
