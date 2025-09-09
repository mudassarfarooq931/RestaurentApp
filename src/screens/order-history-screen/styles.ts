import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  filterList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
  },
  activeFilterButtonText: {
    color: colors.white,
  },
  ordersList: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
  },
  moreItems: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.primary,
    textAlign: 'center',
    marginTop: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
  },
  dateTimeContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    marginBottom: 2,
  },
  timeText: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});
