import {colors} from '@constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  list: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContent: {
    paddingBottom: 40,
  },
  paymentMethodItem: {
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
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  methodName: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 3,
  },
  methodSubtitle: {
    fontSize: 15,
    color: colors.gray,
    lineHeight: 20,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  defaultText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 5,
  },
  deleteButton: {
    borderColor: colors.red,
  },
  actionButtonText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  deleteButtonText: {
    color: colors.red,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  addButtonContainer: {
    padding: 20,
    paddingBottom: 32,
  },
});

export default styles;
