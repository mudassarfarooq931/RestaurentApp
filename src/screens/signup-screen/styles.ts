import {colors, fonts} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.black,
  },
  contentContainer: {
    paddingBottom: 20,
    minHeight: height,
  },
  top: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: fonts.MONTSERRAT_EXTRA_BOLD,
    fontSize: 48,
    color: colors.white,
    letterSpacing: 3,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
    color: colors.white,
    marginTop: 10,
    opacity: 0.8,
  },
  mainWrapper: {
    padding: 20,
    paddingTop: 0,
    justifyContent: 'center',
    backgroundColor: colors.black,
    width: '100%',
    flex: 1,
  },
  card: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  form: {
    paddingVertical: 10,
  },
  formHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 24,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtext: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  termsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  termsText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  buttonContainerSave: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
  },
  linkText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    fontSize: 14,
  },
});
