import {ButtonPrimary, PrimaryHeader} from '@components';
import {colors, orderEnums} from '@constants';
import {RouteProp, useRoute} from '@react-navigation/native';
import {setSelectedOrder} from '@redux/slice/orders';
import {RootState} from '@redux/store';
import {MainNavParamList} from '@routes/param-list';
import React, {useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {OrderTracking} from 'types';
import {styles} from './styles';

type OrderDetailsRouteProp = RouteProp<MainNavParamList, 'OrderDetails'>;

const OrderDetailsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRoute<OrderDetailsRouteProp>();
  const {order} = route.params;

  // Get selected order from Redux store
  const selectedOrder = useSelector(
    (state: RootState) => state.orders.selectedOrder,
  );

  // Use the order from route params or selected order from Redux
  const currentOrder = order || selectedOrder;

  // TODO: Replace with actual tracking data from API
  const orderTracking: OrderTracking | null = currentOrder
    ? {
        orderId: currentOrder.id,
        status: currentOrder.status,
        statusHistory: [
          {
            status: currentOrder.status,
            timestamp: currentOrder.orderDate,
            message: `Order ${currentOrder.status.toLowerCase()}`,
          },
        ],
        estimatedDeliveryTime: currentOrder.estimatedDeliveryTime,
      }
    : null;

  useEffect(() => {
    if (currentOrder) {
      dispatch(setSelectedOrder(currentOrder));
    }
  }, [currentOrder, dispatch]);

  // Return early if no order is available
  if (!currentOrder) {
    return (
      <View style={styles.container}>
        <PrimaryHeader title={orderEnums.OrderDetailsLabel.ORDER_DETAILS} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {orderEnums.OrderErrorMessage.ORDER_NOT_FOUND}
          </Text>
        </View>
      </View>
    );
  }

  const getStatusColor = (status: orderEnums.OrderStatus) => {
    switch (status) {
      case orderEnums.OrderStatus.DELIVERED:
        return colors.green;
      case orderEnums.OrderStatus.CANCELLED:
        return colors.red;
      case orderEnums.OrderStatus.REFUNDED:
        return colors.orange;
      case orderEnums.OrderStatus.OUT_FOR_DELIVERY:
        return colors.primary;
      case orderEnums.OrderStatus.PREPARING:
        return colors.orange;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: orderEnums.OrderStatus) => {
    switch (status) {
      case orderEnums.OrderStatus.DELIVERED:
        return orderEnums.OrderStatusIcon.DELIVERED;
      case orderEnums.OrderStatus.CANCELLED:
        return orderEnums.OrderStatusIcon.CANCELLED;
      case orderEnums.OrderStatus.REFUNDED:
        return orderEnums.OrderStatusIcon.REFUNDED;
      case orderEnums.OrderStatus.OUT_FOR_DELIVERY:
        return orderEnums.OrderStatusIcon.OUT_FOR_DELIVERY;
      case orderEnums.OrderStatus.PREPARING:
        return orderEnums.OrderStatusIcon.PREPARING;
      default:
        return orderEnums.OrderStatusIcon.PENDING;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderOrderItem = (item: any, index: number) => (
    <View key={index} style={styles.orderItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
        {item.extras && item.extras.length > 0 && (
          <Text style={styles.itemExtras}>
            Extras: {item.extras.join(', ')}
          </Text>
        )}
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.itemPriceContainer}>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemTotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderTrackingStep = (
    step: {status: orderEnums.OrderStatus; timestamp: string; message: string},
    index: number,
    isLast: boolean,
  ) => (
    <View key={index} style={styles.trackingStep}>
      <View style={styles.trackingStepContent}>
        <View
          style={[
            styles.trackingIcon,
            {
              backgroundColor: isLast ? colors.primary : colors.lightGray,
            },
          ]}>
          <MaterialCommunityIcons
            name={getStatusIcon(step.status)}
            size={16}
            color={isLast ? colors.white : colors.gray}
          />
        </View>
        <View style={styles.trackingDetails}>
          <Text style={styles.trackingStatus}>
            {step.status.replace('_', ' ').toUpperCase()}
          </Text>
          <Text style={styles.trackingMessage}>{step.message}</Text>
          <Text style={styles.trackingTime}>{formatTime(step.timestamp)}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.trackingLine} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={orderEnums.OrderDetailsLabel.ORDER_DETAILS} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Order Status Header */}
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <MaterialCommunityIcons
              name={getStatusIcon(currentOrder.status)}
              size={32}
              color={getStatusColor(currentOrder.status)}
            />
            <View style={styles.statusTextContainer}>
              <Text style={styles.orderNumber}>{currentOrder.orderNumber}</Text>
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusColor(currentOrder.status)},
                ]}>
                {currentOrder.status.replace('_', ' ').toUpperCase()}
              </Text>
            </View>
          </View>
          {currentOrder.trackingNumber && (
            <View style={styles.trackingNumberContainer}>
              <Text style={styles.trackingLabel}>Tracking #</Text>
              <Text style={styles.trackingNumber}>
                {currentOrder.trackingNumber}
              </Text>
            </View>
          )}
        </View>

        {/* Restaurant Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {orderEnums.OrderDetailsLabel.RESTAURANT}
          </Text>
          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>
                {currentOrder.restaurantName}
              </Text>
              <Text style={styles.restaurantAddress}>
                {currentOrder.restaurantAddress}
              </Text>
              <Text style={styles.restaurantPhone}>
                {currentOrder.restaurantPhone}
              </Text>
            </View>
            <TouchableOpacity style={styles.callButton}>
              <MaterialCommunityIcons
                name="phone"
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {orderEnums.OrderDetailsLabel.ORDER_ITEMS}
          </Text>
          {currentOrder.items.map((item: any, index: number) =>
            renderOrderItem(item, index),
          )}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {orderEnums.OrderDetailsLabel.ORDER_SUMMARY}
          </Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {orderEnums.OrderDetailsLabel.SUBTOTAL}
            </Text>
            <Text style={styles.summaryValue}>
              ${currentOrder.subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {orderEnums.OrderDetailsLabel.TAX}
            </Text>
            <Text style={styles.summaryValue}>
              ${currentOrder.tax.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {orderEnums.OrderDetailsLabel.DELIVERY_FEE}
            </Text>
            <Text style={styles.summaryValue}>
              ${currentOrder.deliveryFee.toFixed(2)}
            </Text>
          </View>
          {currentOrder.discount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {orderEnums.OrderDetailsLabel.DISCOUNT}
              </Text>
              <Text style={[styles.summaryValue, {color: colors.green}]}>
                -${currentOrder.discount.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>
              {orderEnums.OrderDetailsLabel.TOTAL}
            </Text>
            <Text style={styles.totalValue}>
              ${currentOrder.total.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Delivery Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {orderEnums.OrderDetailsLabel.DELIVERY_INFORMATION}
          </Text>
          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryType}>
              <MaterialCommunityIcons
                name={
                  currentOrder.deliveryType === orderEnums.DeliveryType.DELIVERY
                    ? orderEnums.DeliveryTypeIcon.DELIVERY
                    : orderEnums.DeliveryTypeIcon.PICKUP
                }
                size={20}
                color={colors.primary}
              />
              <Text style={styles.deliveryTypeText}>
                {currentOrder.deliveryType === orderEnums.DeliveryType.DELIVERY
                  ? 'Delivery'
                  : 'Pickup'}
              </Text>
            </View>
            <View style={styles.deliveryAddress}>
              <Text style={styles.addressName}>
                {currentOrder.address.name}
              </Text>
              <Text style={styles.addressStreet}>
                {currentOrder.address.street}
              </Text>
              <Text style={styles.addressCity}>
                {currentOrder.address.city}, {currentOrder.address.state}{' '}
                {currentOrder.address.zipCode}
              </Text>
              <Text style={styles.addressPhone}>
                {currentOrder.address.phone}
              </Text>
            </View>
            {currentOrder.deliveryInstructions && (
              <View style={styles.deliveryInstructions}>
                <Text style={styles.instructionsLabel}>
                  Delivery Instructions:
                </Text>
                <Text style={styles.instructionsText}>
                  {currentOrder.deliveryInstructions}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {orderEnums.OrderDetailsLabel.PAYMENT_INFORMATION}
          </Text>
          <View style={styles.paymentInfo}>
            <View style={styles.paymentMethod}>
              <MaterialCommunityIcons
                name={
                  currentOrder.payment.method ===
                  orderEnums.PaymentMethod.CREDIT_CARD
                    ? orderEnums.PaymentMethodIcon.CREDIT_CARD
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.DEBIT_CARD
                    ? orderEnums.PaymentMethodIcon.DEBIT_CARD
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.PAYPAL
                    ? orderEnums.PaymentMethodIcon.PAYPAL
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.APPLE_PAY
                    ? orderEnums.PaymentMethodIcon.APPLE_PAY
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.GOOGLE_PAY
                    ? orderEnums.PaymentMethodIcon.GOOGLE_PAY
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.EASYPAISA
                    ? orderEnums.PaymentMethodIcon.EASYPAISA
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.JAZZCASH
                    ? orderEnums.PaymentMethodIcon.JAZZCASH
                    : currentOrder.payment.method ===
                      orderEnums.PaymentMethod.CASH
                    ? orderEnums.PaymentMethodIcon.CASH
                    : orderEnums.PaymentMethodIcon.CREDIT_CARD
                }
                size={20}
                color={colors.primary}
              />
              <Text style={styles.paymentMethodText}>
                {currentOrder.payment.method ===
                orderEnums.PaymentMethod.CREDIT_CARD
                  ? `Card ending in ${currentOrder.payment.cardLast4}`
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.DEBIT_CARD
                  ? `Debit Card ending in ${currentOrder.payment.cardLast4}`
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.PAYPAL
                  ? 'PayPal'
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.APPLE_PAY
                  ? 'Apple Pay'
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.GOOGLE_PAY
                  ? 'Google Pay'
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.EASYPAISA
                  ? 'EasyPaisa'
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.JAZZCASH
                  ? 'JazzCash'
                  : currentOrder.payment.method ===
                    orderEnums.PaymentMethod.CASH
                  ? 'Cash'
                  : 'Digital Wallet'}
              </Text>
            </View>
            <Text style={styles.paymentStatus}>
              {currentOrder.payment.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Order Tracking */}
        {currentOrder.status !== orderEnums.OrderStatus.DELIVERED &&
          currentOrder.status !== orderEnums.OrderStatus.CANCELLED &&
          orderTracking && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {orderEnums.OrderDetailsLabel.ORDER_TRACKING}
              </Text>
              <View style={styles.trackingContainer}>
                {orderTracking.statusHistory.map((step, index) =>
                  renderTrackingStep(
                    step,
                    index,
                    index === orderTracking.statusHistory.length - 1,
                  ),
                )}
              </View>
            </View>
          )}

        {/* Order Date & Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {orderEnums.OrderDetailsLabel.ORDER_INFORMATION}
          </Text>
          <View style={styles.orderInfo}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {orderEnums.OrderDetailsLabel.ORDER_DATE}
              </Text>
              <Text style={styles.infoValue}>
                {formatDate(currentOrder.orderDate)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                {orderEnums.OrderDetailsLabel.ORDER_TIME}
              </Text>
              <Text style={styles.infoValue}>
                {formatTime(currentOrder.orderDate)}
              </Text>
            </View>
            {currentOrder.estimatedDeliveryTime && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {orderEnums.OrderDetailsLabel.ESTIMATED_DELIVERY}
                </Text>
                <Text style={styles.infoValue}>
                  {formatTime(currentOrder.estimatedDeliveryTime)}
                </Text>
              </View>
            )}
            {currentOrder.actualDeliveryTime && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {orderEnums.OrderDetailsLabel.DELIVERED_AT}
                </Text>
                <Text style={styles.infoValue}>
                  {formatTime(currentOrder.actualDeliveryTime)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {currentOrder.status === orderEnums.OrderStatus.DELIVERED && (
            <ButtonPrimary
              title={orderEnums.OrderActionLabel.REORDER}
              onPress={() => {
                // Handle reorder
              }}
            />
          )}
          {currentOrder.status === orderEnums.OrderStatus.CANCELLED && (
            <ButtonPrimary
              title={orderEnums.OrderActionLabel.REORDER}
              onPress={() => {
                // Handle reorder
              }}
            />
          )}
          {currentOrder.status === orderEnums.OrderStatus.OUT_FOR_DELIVERY && (
            <ButtonPrimary
              title={orderEnums.OrderActionLabel.TRACK_ORDER}
              onPress={() => {
                // Handle track order
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;
