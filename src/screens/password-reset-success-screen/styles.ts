import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

//-------------------------------------
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 28,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  resendText: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
});
