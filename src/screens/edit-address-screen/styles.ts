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
    justifyContent: 'space-between',
    gap: 14,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.lightGray,
    backgroundColor: colors.white,
    gap: 8,
  },
  selectedTypeButton: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 15,
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
  halfWidth: {
    flex: 1,
  },
  defaultToggle: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
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
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 6,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleSwitchActive: {
    backgroundColor: colors.primary,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
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
    transform: [{translateX: 20}],
  },
  actionContainer: {
    padding: 20,
    paddingBottom: 32,
  },
  submitContainer: {
    marginBottom: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.red,
    backgroundColor: colors.white,
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.red,
  },
});

export default styles;
