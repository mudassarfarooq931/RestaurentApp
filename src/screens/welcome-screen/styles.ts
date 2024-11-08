import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  top: {
    flex: 1,
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
  bottom: {
    flex: 1.05,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    paddingTop: 35,
  },
  top_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    paddingRight: 10,
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: 20,
  },
  subtitle: {
    paddingRight: 10,
    color: colors.black,
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 30,
  },
  bottom_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: colors.lighterGray,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circle_icon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  txt: {
    paddingLeft: 10,
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: 16,
  },
});
