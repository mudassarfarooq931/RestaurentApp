import {colors} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollView: {
    flex: 1,
  },

  // Empty Cart Styles
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  emptyCartTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },

  emptyCartSubtitle: {
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  browseButton: {
    borderRadius: 22,
    paddingHorizontal: 28,
  },

  // Cart Items Styles
  itemsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

  cartItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },

  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 70,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
    flexShrink: 1,
  },

  itemCategory: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },

  itemOptions: {
    marginBottom: 6,
  },

  optionText: {
    fontSize: 11,
    color: colors.lightGray,
    marginBottom: 1,
  },

  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    borderRadius: 16,
    paddingHorizontal: 6,
  },

  quantityButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },

  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginHorizontal: 12,
    minWidth: 16,
    textAlign: 'center',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 8,
  },

  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  favoriteButton: {
    padding: 4,
  },
  removeButton: {
    padding: 4,
  },

  // Order Summary Styles
  orderSummary: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  summaryLabel: {
    fontSize: 14,
    color: colors.gray,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    paddingTop: 12,
    marginTop: 8,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },

  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },

  // Delivery Info Styles
  deliveryInfo: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 1,
  },

  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  deliveryText: {
    fontSize: 13,
    color: colors.gray,
    marginLeft: 8,
  },

  // Checkout Styles
  checkoutContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },

  checkoutButton: {
    borderRadius: 25,
    height: 50,
  },

  // Header placeholder style
  headerPlaceholder: {
    width: 24,
  },
});
