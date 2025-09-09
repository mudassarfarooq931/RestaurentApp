import {colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 20,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    gap: 10,
    minWidth: 110,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedTypeButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.gray,
  },
  selectedTypeButtonText: {
    color: colors.white,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
  thirdWidth: {
    flex: 1,
  },
  digitalWalletInfo: {
    alignItems: 'center',
    padding: 28,
    backgroundColor: colors.white,
    borderRadius: 20,
    marginVertical: 8,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  digitalWalletText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 18,
    lineHeight: 24,
    fontWeight: '500',
  },
  defaultToggle: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    marginVertical: 8,
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 20,
  },
  toggleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  toggleSubtitle: {
    fontSize: 16,
    color: colors.gray,
    lineHeight: 22,
    fontWeight: '400',
  },
  toggleSwitch: {
    width: 54,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleSwitchActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  toggleThumbActive: {
    transform: [{translateX: 22}],
  },
  submitContainer: {
    padding: 20,
    paddingBottom: 32,
  },
});

export default styles;
