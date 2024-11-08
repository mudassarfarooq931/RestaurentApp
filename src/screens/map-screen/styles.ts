import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkGray,
    paddingHorizontal: 20,
  },
  btnBack: {
    flex: 1,
    height: 40,
    width: 40,
    backgroundColor: colors.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
    top: 30,
    ///////////---shadow---///////////
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bottom: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    bottom: 35,
  },
  btnLocate: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 125,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    marginBottom: 10,
    paddingVertical: 8,

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
  textLocate: {
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_SEMIBOLD,
    fontSize: 14,
  },
  card: {
    height: 220,
    width: '100%',
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 20,
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
  heading: {
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
  },
  label: {
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    marginTop: 5,
    elevation: 0.1,
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnConfirm: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    marginTop: 10,
    alignSelf: 'center',
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
  textConfirm: {
    color: colors.white,
  },
});
