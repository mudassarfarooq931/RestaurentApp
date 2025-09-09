import {colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  settingsItem: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 6,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  itemSubtitle: {
    fontSize: 15,
    color: colors.gray,
    lineHeight: 20,
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 8,
  },
});

export default styles;
