import {colors, fonts} from '@constants';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {OrderStatus} from 'types';

interface OrderStatusProps {
  status: OrderStatus;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const OrderStatusComponent: React.FC<OrderStatusProps> = ({
  status,
  showIcon = true,
  showLabel = true,
  size = 'medium',
}) => {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          color: colors.orange,
          icon: 'clock',
          label: 'Pending',
          backgroundColor: colors.orange + '20',
        };
      case 'confirmed':
        return {
          color: colors.primary,
          icon: 'check-circle',
          label: 'Confirmed',
          backgroundColor: colors.primary + '20',
        };
      case 'preparing':
        return {
          color: colors.orange,
          icon: 'chef-hat',
          label: 'Preparing',
          backgroundColor: colors.orange + '20',
        };
      case 'ready_for_pickup':
        return {
          color: colors.green,
          icon: 'storefront',
          label: 'Ready for Pickup',
          backgroundColor: colors.green + '20',
        };
      case 'out_for_delivery':
        return {
          color: colors.primary,
          icon: 'truck-delivery',
          label: 'Out for Delivery',
          backgroundColor: colors.primary + '20',
        };
      case 'delivered':
        return {
          color: colors.green,
          icon: 'check-circle',
          label: 'Delivered',
          backgroundColor: colors.green + '20',
        };
      case 'cancelled':
        return {
          color: colors.red,
          icon: 'close-circle',
          label: 'Cancelled',
          backgroundColor: colors.red + '20',
        };
      case 'refunded':
        return {
          color: colors.orange,
          icon: 'refresh',
          label: 'Refunded',
          backgroundColor: colors.orange + '20',
        };
      default:
        return {
          color: colors.gray,
          icon: 'clock',
          label: 'Unknown',
          backgroundColor: colors.gray + '20',
        };
    }
  };

  const config = getStatusConfig(status);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: styles.smallContainer,
          icon: styles.smallIcon,
          text: styles.smallText,
        };
      case 'large':
        return {
          container: styles.largeContainer,
          icon: styles.largeIcon,
          text: styles.largeText,
        };
      default:
        return {
          container: styles.mediumContainer,
          icon: styles.mediumIcon,
          text: styles.mediumText,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, sizeStyles.container]}>
      {showIcon && (
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: config.backgroundColor},
            sizeStyles.icon,
          ]}>
          <MaterialCommunityIcons
            name={config.icon as any}
            size={size === 'small' ? 12 : size === 'large' ? 20 : 16}
            color={config.color}
          />
        </View>
      )}
      {showLabel && (
        <Text
          style={[styles.statusText, {color: config.color}, sizeStyles.text]}>
          {config.label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    textTransform: 'uppercase',
  },
  // Small size styles
  smallContainer: {
    gap: 4,
  },
  smallIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  smallText: {
    fontSize: 10,
  },
  // Medium size styles
  mediumContainer: {
    gap: 6,
  },
  mediumIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  mediumText: {
    fontSize: 12,
  },
  // Large size styles
  largeContainer: {
    gap: 8,
  },
  largeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  largeText: {
    fontSize: 14,
  },
});

export default OrderStatusComponent;
