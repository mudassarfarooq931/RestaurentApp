import {PrimaryHeader} from '@components';
import {appEnums, colors, orderEnums, ScreenEnum} from '@constants';
import {
  reorder,
  setOrders,
  setOrdersError,
  setOrdersLoading,
} from '@redux/slice/orders';
import {RootState} from '@redux/store';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Order} from 'types';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

const OrderHistoryScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState<
    orderEnums.OrderStatus | orderEnums.OrderFilter
  >(orderEnums.OrderFilter.ALL);

  // Get orders from Redux store
  const {orders, loading, error} = useSelector(
    (state: RootState) => state.orders,
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

  const handleReorder = (orderId: string) => {
    dispatch(reorder(orderId));
    // TODO: Navigate to cart or show success message
  };

  const filterOptions: {
    label: string;
    value: orderEnums.OrderStatus | orderEnums.OrderFilter;
  }[] = [
    {label: orderEnums.OrderFilterLabel.ALL, value: orderEnums.OrderFilter.ALL},
    {
      label: orderEnums.OrderFilterLabel.DELIVERED,
      value: orderEnums.OrderStatus.DELIVERED,
    },
    {
      label: orderEnums.OrderFilterLabel.CANCELLED,
      value: orderEnums.OrderStatus.CANCELLED,
    },
    {
      label: orderEnums.OrderFilterLabel.REFUNDED,
      value: orderEnums.OrderStatus.REFUNDED,
    },
  ];

  const filteredOrders = orders.filter(
    (order: Order) =>
      selectedFilter === orderEnums.OrderFilter.ALL ||
      order.status === selectedFilter,
  );

  const getStatusColor = (status: orderEnums.OrderStatus) => {
    switch (status) {
      case orderEnums.OrderStatus.DELIVERED:
        return colors.green;
      case orderEnums.OrderStatus.CANCELLED:
        return colors.red;
      case orderEnums.OrderStatus.REFUNDED:
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
      default:
        return orderEnums.OrderStatusIcon.PENDING;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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

  const renderOrderItem = ({item}: {item: Order}) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigate(ScreenEnum.OrderDetails, {order: item})}
      activeOpacity={0.8}>
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

      <View style={styles.orderItems}>
        {item.items.slice(0, 2).map((orderItem, index) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{uri: orderItem.image}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{orderItem.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {orderItem.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${orderItem.price.toFixed(2)}</Text>
          </View>
        ))}
        {item.items.length > 2 && (
          <Text style={styles.moreItems}>
            +{item.items.length - 2} more items
          </Text>
        )}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateText}>{formatDate(item.orderDate)}</Text>
          <Text style={styles.timeText}>{formatTime(item.orderDate)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleReorder(item.id)}
          activeOpacity={0.8}>
          <MaterialCommunityIcons
            name={orderEnums.OrderActionIcon.REORDER}
            size={16}
            color={colors.primary}
          />
          <Text style={styles.actionButtonText}>
            {orderEnums.OrderActionLabel.REORDER}
          </Text>
        </TouchableOpacity>
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
      </View>
    </TouchableOpacity>
  );

  const renderFilterButton = ({
    item,
  }: {
    item: {
      label: string;
      value: orderEnums.OrderStatus | orderEnums.OrderFilter;
    };
  }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === item.value && styles.activeFilterButton,
      ]}
      onPress={() => setSelectedFilter(item.value)}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === item.value && styles.activeFilterButtonText,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.ORDER_HISTORY} />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filterOptions}
          renderItem={renderFilterButton}
          keyExtractor={item => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="package-variant"
              size={64}
              color={colors.lightGray}
            />
            <Text style={styles.emptyTitle}>
              {orderEnums.OrderErrorMessage.NO_ORDERS_FOUND}
            </Text>
            <Text style={styles.emptySubtitle}>
              {selectedFilter === orderEnums.OrderFilter.ALL
                ? orderEnums.OrderErrorMessage.NO_ORDERS_YET
                : `No ${selectedFilter} orders found`}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default OrderHistoryScreen;
