import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    height: '100%',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  headerContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  headerText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 24,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 15,
    color: colors.black,
  },
  secondaryHeading: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    paddingHorizontal: 10,
    color: colors.black,
  },
  buttonContainer: {
    marginVertical: 20,
  },
  buttonStyle: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    height: 48,
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonTextStyle: {
    color: colors.white,
    flex: 1,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  divider: {
    height: 1,
    width: '43%',
    backgroundColor: '#E3E5E5',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  footerText1: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 14,
    marginLeft: 2,
    color: colors.black,
  },
  footerText2: {
    fontFamily: fonts.POPPINS_MEDIUM,
    fontSize: 14,
    color: colors.black,
  },
});
