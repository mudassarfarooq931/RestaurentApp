import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGray,
    marginBottom: 20,
  },
  appIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  appVersion: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  aboutItemsContainer: {
    paddingHorizontal: 16,
  },
  aboutItem: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: colors.gray,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.gray,
  },
});
