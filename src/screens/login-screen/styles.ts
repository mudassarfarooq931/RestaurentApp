import {colors, fonts} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    backgroundColor: colors.background,
  },
  contentContainer: {
    height: '100%',
  },
  mainWrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 0,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 24,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 15,
    color: colors.black,
  },
  loginText: {
    color: colors.black,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  logo: {height: 120, width: 120, resizeMode: 'contain'},
  form: {
    paddingVertical: 10,
  },
  formHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },

  buttonContainerSave: {
    marginTop: 20,
    justifyContent: 'center',
  },

  btnContainerStyle: {
    marginTop: 70,
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    paddingBottom: 10,
  },
  linkText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    fontSize: 14,
  },
});
