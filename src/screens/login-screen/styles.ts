import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.black,
  },
  contentContainer: {
    paddingBottom: 10,
  },
  top: {
    marginVertical: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fonts.MONTSERRAT_EXTRA_BOLD,
    fontSize: 90,
    alignSelf: 'center',
    color: colors.white,
    letterSpacing: 2,
  },
  mainWrapper: {
    padding: 10,
    paddingTop: 0,
    justifyContent: 'center',
    backgroundColor: colors.black,
    width: '100%',
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: colors.white,

    ///////////---shadow---///////////
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  headerText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 20,
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
  btnGoogle: {
    backgroundColor: colors.black,
    marginTop: 10,
  },
  googleIcon: {height: 20, width: 20, marginRight: 10},
});
