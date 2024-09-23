import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 120,
    resizeMode: 'contain',
  },
  cardImg: {
    // backgroundColor: colors.red,
    // marginTop: 10,
    // marginHorizontal: 10,
    // width: '98%',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 10,
    // borderRadius: 10,
    // shadowColor: colors.black,
    // elevation: 10,
  },
});
