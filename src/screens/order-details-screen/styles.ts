import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  statusHeader: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusTextContainer: {
    marginLeft: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  trackingNumberContainer: {
    alignItems: 'flex-end',
  },
  trackingLabel: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  trackingNumber: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.primary,
  },
  section: {
    backgroundColor: colors.white,
    marginBottom: 10,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 16,
  },
  restaurantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  restaurantPhone: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lighterGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighterGray,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  itemExtras: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    marginBottom: 2,
  },
  itemTotal: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.primary,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
    paddingTop: 12,
    marginTop: 8,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
  },
  totalValue: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.primary,
  },
  deliveryInfo: {
    gap: 12,
  },
  deliveryType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryTypeText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.primary,
  },
  deliveryAddress: {
    backgroundColor: colors.lighterGray,
    padding: 12,
    borderRadius: 8,
  },
  addressName: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  addressStreet: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  addressCity: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  deliveryInstructions: {
    backgroundColor: colors.lightYellow,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.orange,
  },
  instructionsLabel: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  instructionsText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.darkGray,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentMethodText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
  },
  paymentStatus: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.green,
  },
  trackingContainer: {
    paddingLeft: 20,
  },
  trackingStep: {
    position: 'relative',
  },
  trackingStepContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  trackingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  trackingDetails: {
    flex: 1,
    paddingTop: 4,
  },
  trackingStatus: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 2,
  },
  trackingMessage: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
    marginBottom: 2,
  },
  trackingTime: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.lightGray,
  },
  trackingLine: {
    position: 'absolute',
    left: 15,
    top: 32,
    width: 2,
    height: 16,
    backgroundColor: colors.lightGray,
  },
  orderInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_REGULAR,
    color: colors.gray,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
  },
  actionButtons: {
    padding: 20,
    paddingTop: 0,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    textAlign: 'center',
  },
});
