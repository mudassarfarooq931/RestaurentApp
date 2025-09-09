import {PrimaryHeader} from '@components';
import {appEnums, colors, orderEnums, ScreenEnum} from '@constants';
import {setOrders, setOrdersError, setOrdersLoading} from '@redux/slice/orders';
import {RootState} from '@redux/store';
import React, {useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Order} from 'types';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

const OngoingOrdersScreen: React.FC = () => {
  const dispatch = useDispatch();

  // Get orders from Redux store
  const {orders, loading, error} = useSelector(
    (state: RootState) => state.orders,
  );

  // Filter ongoing orders
  const ongoingOrders = orders.filter((order: Order) =>
    [
      orderEnums.OrderStatus.PENDING,
      orderEnums.OrderStatus.CONFIRMED,
      orderEnums.OrderStatus.PREPARING,
      orderEnums.OrderStatus.READY_FOR_PICKUP,
      orderEnums.OrderStatus.OUT_FOR_DELIVERY,
    ].includes(order.status),
  );

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      dispatch(setOrdersLoading(true));
      // TODO: Replace with actual API call
      // const response = await apiService.getOrders();
      // dispatch(setOrders(response.data));

      // For now, set empty array - orders will be populated when user places orders
      dispatch(setOrders([]));
    } catch (err) {
      dispatch(setOrdersError('Failed to load orders'));
    }
  };

  const getStatusColor = (status: orderEnums.OrderStatus) => {
    switch (status) {
      case orderEnums.OrderStatus.PENDING:
        return colors.orange;
      case orderEnums.OrderStatus.CONFIRMED:
        return colors.primary;
      case orderEnums.OrderStatus.PREPARING:
        return colors.orange;
      case orderEnums.OrderStatus.READY_FOR_PICKUP:
        return colors.green;
      case orderEnums.OrderStatus.OUT_FOR_DELIVERY:
        return colors.primary;
      default:
        return colors.gray;
    }
  };

  const getStatusIcon = (status: orderEnums.OrderStatus) => {
    switch (status) {
      case orderEnums.OrderStatus.PENDING:
        return orderEnums.OrderStatusIcon.PENDING;
      case orderEnums.OrderStatus.CONFIRMED:
        return orderEnums.OrderStatusIcon.CONFIRMED;
      case orderEnums.OrderStatus.PREPARING:
        return orderEnums.OrderStatusIcon.PREPARING;
      case orderEnums.OrderStatus.READY_FOR_PICKUP:
        return orderEnums.OrderStatusIcon.READY_FOR_PICKUP;
      case orderEnums.OrderStatus.OUT_FOR_DELIVERY:
        return orderEnums.OrderStatusIcon.OUT_FOR_DELIVERY;
      default:
        return orderEnums.OrderStatusIcon.PENDING;
    }
  };

  const getStatusMessage = (status: orderEnums.OrderStatus) => {
    switch (status) {
      case orderEnums.OrderStatus.PENDING:
        return orderEnums.OrderStatusMessage.PENDING;
      case orderEnums.OrderStatus.CONFIRMED:
        return orderEnums.OrderStatusMessage.CONFIRMED;
      case orderEnums.OrderStatus.PREPARING:
        return orderEnums.OrderStatusMessage.PREPARING;
      case orderEnums.OrderStatus.READY_FOR_PICKUP:
        return orderEnums.OrderStatusMessage.READY_FOR_PICKUP;
      case orderEnums.OrderStatus.OUT_FOR_DELIVERY:
        return orderEnums.OrderStatusMessage.OUT_FOR_DELIVERY;
      default:
        return orderEnums.OrderStatusMessage.PENDING;
    }
  };

  const getEstimatedTime = (order: Order) => {
    if (order.estimatedDeliveryTime) {
      const estimatedTime = new Date(order.estimatedDeliveryTime);
      const now = new Date();
      const diffMinutes = Math.ceil(
        (estimatedTime.getTime() - now.getTime()) / (1000 * 60),
      );

      if (diffMinutes > 0) {
        return `${diffMinutes} min`;
      } else {
        return 'Soon';
      }
    }
    return 'TBD';
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderOrderItem = ({item}: {item: Order}) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigate(ScreenEnum.OrderDetails, {order: item})}
      activeOpacity={0.8}>
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        </View>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name={getStatusIcon(item.status)}
            size={20}
            color={getStatusColor(item.status)}
          />
          <Text
            style={[styles.statusText, {color: getStatusColor(item.status)}]}>
            {item.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Status Message */}
      <View style={styles.statusMessageContainer}>
        <Text style={styles.statusMessage}>
          {getStatusMessage(item.status)}
        </Text>
        <Text style={styles.estimatedTime}>ETA: {getEstimatedTime(item)}</Text>
      </View>

      {/* Order Items Preview */}
      <View style={styles.orderItemsPreview}>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <View key={index} style={styles.orderItemPreview}>
            <Image source={{uri: orderItem.image}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{orderItem.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {orderItem.quantity}</Text>
            </View>
          </View>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>
            +{item.items.length - 2} more items
          </Text>
        )}
      </View>

      {/* Order Footer */}
      <View style={styles.orderFooter}>
        <View style={styles.deliveryInfo}>
          <MaterialCommunityIcons
            name={
              item.deliveryType === 'delivery' ? 'truck-delivery' : 'storefront'
            }
            size={16}
            color={colors.gray}
          />
          <Text style={styles.deliveryType}>
            {item.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}
          </Text>
          <Text style={styles.orderTime}>
            Ordered at {formatTime(item.orderDate)}
          </Text>
        </View>
        <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigate(ScreenEnum.OrderDetails, {order: item})}
          activeOpacity={0.8}>
          <MaterialCommunityIcons
            name={orderEnums.OrderActionIcon.VIEW_DETAILS}
            size={16}
            color={colors.primary}
          />
          <Text style={styles.actionButtonText}>
            {orderEnums.OrderActionLabel.VIEW_DETAILS}
          </Text>
        </TouchableOpacity>

        {item.status === orderEnums.OrderStatus.OUT_FOR_DELIVERY && (
          <TouchableOpacity
            style={[styles.actionButton, styles.trackButton]}
            onPress={() => {
              // Handle track order
            }}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              name={orderEnums.OrderActionIcon.TRACK_ORDER}
              size={16}
              color={colors.white}
            />
            <Text style={[styles.actionButtonText, {color: colors.white}]}>
              {orderEnums.OrderActionLabel.TRACK_ORDER}
            </Text>
          </TouchableOpacity>
        )}

        {item.status === orderEnums.OrderStatus.READY_FOR_PICKUP && (
          <TouchableOpacity
            style={[styles.actionButton, styles.pickupButton]}
            onPress={() => {
              // Handle pickup notification
            }}
            activeOpacity={0.8}>
            <MaterialCommunityIcons
              name={orderEnums.OrderActionIcon.I_AM_HERE}
              size={16}
              color={colors.white}
            />
            <Text style={[styles.actionButtonText, {color: colors.white}]}>
              {orderEnums.OrderActionLabel.I_AM_HERE}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.ONGOING_ORDERS} />

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{ongoingOrders.length}</Text>
          <Text style={styles.summaryLabel}>
            {orderEnums.OrderSummaryLabel.ACTIVE_ORDERS}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {
              ongoingOrders.filter(
                (order: Order) =>
                  order.status === orderEnums.OrderStatus.OUT_FOR_DELIVERY,
              ).length
            }
          </Text>
          <Text style={styles.summaryLabel}>
            {orderEnums.OrderSummaryLabel.OUT_FOR_DELIVERY}
          </Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {
              ongoingOrders.filter(
                (order: Order) =>
                  order.status === orderEnums.OrderStatus.PREPARING,
              ).length
            }
          </Text>
          <Text style={styles.summaryLabel}>
            {orderEnums.OrderSummaryLabel.PREPARING}
          </Text>
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={ongoingOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={64}
              color={colors.lightGray}
            />
            <Text style={styles.emptyTitle}>
              {orderEnums.OrderErrorMessage.NO_ONGOING_ORDERS}
            </Text>
            <Text style={styles.emptySubtitle}>
              {orderEnums.OrderErrorMessage.NO_ACTIVE_ORDERS}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default OngoingOrdersScreen;
