import {colors, fonts, orderEnums} from '@constants';
import {
  setOrderSummary,
  setOrderSummaryError,
  setOrderSummaryLoading,
} from '@redux/slice/orders';
import {RootState} from '@redux/store';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {OrderSummary} from 'types';

interface OrderSummaryProps {
  onViewAllOrders?: () => void;
}

const OrderSummaryComponent: React.FC<OrderSummaryProps> = ({
  onViewAllOrders,
}) => {
  const dispatch = useDispatch();

  // Get order summary from Redux store
  const {summary, loading, error} = useSelector(
    (state: RootState) => state.orderSummary,
  );

  // Load order summary on component mount
  useEffect(() => {
    loadOrderSummary();
  }, []);

  const loadOrderSummary = async () => {
    try {
      dispatch(setOrderSummaryLoading(true));
      // TODO: Replace with actual API call
      // const response = await apiService.getOrderSummary();
      // dispatch(setOrderSummary(response.data));

      // For now, set default empty summary
      const defaultSummary: OrderSummary = {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        favoriteRestaurant: 'No orders yet',
        lastOrderDate: new Date().toISOString(),
        pendingOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
      };
      dispatch(setOrderSummary(defaultSummary));
    } catch (err) {
      dispatch(setOrderSummaryError('Failed to load order summary'));
    }
  };

  // Return early if no summary is available
  if (!summary) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Order Summary</Text>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const summaryItems = [
    {
      icon: orderEnums.OrderSummaryIcon.TOTAL_ORDERS,
      label: orderEnums.OrderSummaryLabel.TOTAL_ORDERS,
      value: summary.totalOrders.toString(),
      color: colors.primary,
    },
    {
      icon: orderEnums.OrderSummaryIcon.TOTAL_SPENT,
      label: orderEnums.OrderSummaryLabel.TOTAL_SPENT,
      value: formatCurrency(summary.totalSpent),
      color: colors.green,
    },
    {
      icon: orderEnums.OrderSummaryIcon.AVERAGE_ORDER_VALUE,
      label: orderEnums.OrderSummaryLabel.AVERAGE_ORDER_VALUE,
      value: formatCurrency(summary.averageOrderValue),
      color: colors.orange,
    },
    {
      icon: orderEnums.OrderSummaryIcon.FAVORITE_RESTAURANT,
      label: orderEnums.OrderSummaryLabel.FAVORITE_RESTAURANT,
      value: summary.favoriteRestaurant,
      color: colors.primary,
      isText: true,
    },
  ];

  const statusItems = [
    {
      icon: orderEnums.OrderSummaryIcon.PENDING,
      label: orderEnums.OrderSummaryLabel.PENDING,
      value: summary.pendingOrders,
      color: colors.orange,
    },
    {
      icon: orderEnums.OrderSummaryIcon.COMPLETED,
      label: orderEnums.OrderSummaryLabel.COMPLETED,
      value: summary.completedOrders,
      color: colors.green,
    },
    {
      icon: orderEnums.OrderSummaryIcon.CANCELLED,
      label: orderEnums.OrderSummaryLabel.CANCELLED,
      value: summary.cancelledOrders,
      color: colors.red,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Order Summary</Text>
        {onViewAllOrders && (
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={onViewAllOrders}
            activeOpacity={0.8}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryGrid}>
        {summaryItems.map((item, index) => (
          <View key={index} style={styles.summaryItem}>
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: item.color + '20'},
              ]}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={item.color}
              />
            </View>
            <Text style={styles.summaryLabel}>{item.label}</Text>
            <Text
              style={[
                styles.summaryValue,
                item.isText && styles.summaryValueText,
              ]}
              numberOfLines={item.isText ? 2 : 1}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      {/* Order Status */}
      <View style={styles.statusSection}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.statusGrid}>
          {statusItems.map((item, index) => (
            <View key={index} style={styles.statusItem}>
              <View
                style={[
                  styles.statusIcon,
                  {backgroundColor: item.color + '20'},
                ]}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color={item.color}
                />
              </View>
              <Text style={styles.statusValue}>{item.value}</Text>
              <Text style={styles.statusLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Last Order Info */}
      <View style={styles.lastOrderSection}>
        <View style={styles.lastOrderHeader}>
          <MaterialCommunityIcons
            name={orderEnums.OrderSummaryIcon.LAST_ORDER}
            size={20}
            color={colors.gray}
          />
          <Text style={styles.lastOrderTitle}>
            {orderEnums.OrderSummaryLabel.LAST_ORDER}
          </Text>
        </View>
        <Text style={styles.lastOrderDate}>
          {formatDate(summary.lastOrderDate)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    margin: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.primary,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.lighterGray,
    borderRadius: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    textAlign: 'center',
  },
  summaryValueText: {
    fontSize: 14,
    lineHeight: 18,
  },
  statusSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 12,
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    textAlign: 'center',
  },
  lastOrderSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lighterGray,
  },
  lastOrderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  lastOrderTitle: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
  },
  lastOrderDate: {
    fontSize: 16,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OrderSummaryComponent;
