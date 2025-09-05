import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

//-------------------------------------
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black,
    opacity: 0.1,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heading: {
    fontFamily: fonts.MONTSERRAT_EXTRA_BOLD,
    fontSize: 48,
    color: colors.white,
    letterSpacing: 3,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
  },
  bottom: {
    flex: 1.2,
    backgroundColor: colors.white,
    paddingHorizontal: 25,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    elevation: 25,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    paddingTop: 40,
    paddingBottom: 30,
  },
  contentContainer: {
    flexGrow: 1,
  },
  formContent: {
    flex: 1,
  },
  formHeader: {
    marginBottom: 30,
  },
  title: {
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainerSave: {
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
  },
  linkText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 15,
    color: colors.gray,
  },
});
