import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  headerText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  searchInput: {
    height: 45,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: colors.white,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  lastMsg: {
    fontSize: 14,
    color: '#555',
  },
  lastMsgTime: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
