import {orderEnums} from '@constants';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  extras?: string[];
}

export interface OrderAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderPayment {
  id: string;
  method: orderEnums.PaymentMethod;
  cardLast4?: string;
  cardBrand?: string;
  amount: number;
  status: orderEnums.PaymentStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: orderEnums.OrderStatus;
  payment: OrderPayment;
  address: OrderAddress;
  deliveryType: orderEnums.DeliveryType;
  estimatedDeliveryTime?: string;
  actualDeliveryTime?: string;
  orderDate: string;
  notes?: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantPhone: string;
  trackingNumber?: string;
  deliveryInstructions?: string;
}

export interface OrderSummary {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteRestaurant: string;
  lastOrderDate: string;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface OrderTracking {
  orderId: string;
  status: orderEnums.OrderStatus;
  statusHistory: {
    status: orderEnums.OrderStatus;
    timestamp: string;
    message: string;
  }[];
  estimatedDeliveryTime?: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  deliveryPerson?: {
    name: string;
    phone: string;
    photo?: string;
  };
}
