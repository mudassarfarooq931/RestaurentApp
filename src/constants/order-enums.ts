// Order Status Enums
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

// Payment Method Enums
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  EASYPAISA = 'easypaisa',
  JAZZCASH = 'jazzcash',
  CASH = 'cash',
}

// Payment Status Enums
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// Delivery Type Enums
export enum DeliveryType {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
}

// Order Action Enums
export enum OrderAction {
  REORDER = 'reorder',
  VIEW_DETAILS = 'view_details',
  TRACK_ORDER = 'track_order',
  CANCEL_ORDER = 'cancel_order',
  RATE_ORDER = 'rate_order',
  CONTACT_RESTAURANT = 'contact_restaurant',
  I_AM_HERE = 'i_am_here',
}

// Order Filter Enums
export enum OrderFilter {
  ALL = 'all',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PENDING = 'pending',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
}

// Order Status Messages
export enum OrderStatusMessage {
  PENDING = 'Your order is being processed',
  CONFIRMED = 'Restaurant confirmed your order',
  PREPARING = 'Your order is being prepared',
  READY_FOR_PICKUP = 'Your order is ready for pickup',
  OUT_FOR_DELIVERY = 'Your order is out for delivery',
  DELIVERED = 'Your order has been delivered',
  CANCELLED = 'Your order has been cancelled',
  REFUNDED = 'Your order has been refunded',
}

// Order Status Icons
export enum OrderStatusIcon {
  PENDING = 'clock',
  CONFIRMED = 'check-circle',
  PREPARING = 'chef-hat',
  READY_FOR_PICKUP = 'storefront',
  OUT_FOR_DELIVERY = 'truck-delivery',
  DELIVERED = 'check-circle',
  CANCELLED = 'close-circle',
  REFUNDED = 'refresh',
}

// Payment Method Icons
export enum PaymentMethodIcon {
  CREDIT_CARD = 'credit-card',
  DEBIT_CARD = 'credit-card',
  PAYPAL = 'credit-card-outline',
  APPLE_PAY = 'cellphone',
  GOOGLE_PAY = 'cellphone',
  EASYPAISA = 'cellphone',
  JAZZCASH = 'cellphone',
  CASH = 'cash',
}

// Delivery Type Icons
export enum DeliveryTypeIcon {
  DELIVERY = 'truck-delivery',
  PICKUP = 'storefront',
}

// Order Action Icons
export enum OrderActionIcon {
  REORDER = 'refresh',
  VIEW_DETAILS = 'eye',
  TRACK_ORDER = 'map-marker',
  CANCEL_ORDER = 'close-circle',
  RATE_ORDER = 'star',
  CONTACT_RESTAURANT = 'phone',
  I_AM_HERE = 'storefront',
}

// Order Action Labels
export enum OrderActionLabel {
  REORDER = 'Reorder',
  VIEW_DETAILS = 'View Details',
  TRACK_ORDER = 'Track Order',
  CANCEL_ORDER = 'Cancel Order',
  RATE_ORDER = 'Rate Order',
  CONTACT_RESTAURANT = 'Contact Restaurant',
  I_AM_HERE = "I'm Here",
}

// Order Filter Labels
export enum OrderFilterLabel {
  ALL = 'All Orders',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded',
  PENDING = 'Pending',
  PREPARING = 'Preparing',
  OUT_FOR_DELIVERY = 'Out for Delivery',
}

// Order Summary Labels
export enum OrderSummaryLabel {
  TOTAL_ORDERS = 'Total Orders',
  TOTAL_SPENT = 'Total Spent',
  AVERAGE_ORDER_VALUE = 'Avg Order Value',
  FAVORITE_RESTAURANT = 'Favorite Restaurant',
  ACTIVE_ORDERS = 'Active Orders',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  PREPARING = 'Preparing',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  LAST_ORDER = 'Last Order',
}

// Order Summary Icons
export enum OrderSummaryIcon {
  TOTAL_ORDERS = 'package-variant',
  TOTAL_SPENT = 'currency-usd',
  AVERAGE_ORDER_VALUE = 'chart-line',
  FAVORITE_RESTAURANT = 'store',
  ACTIVE_ORDERS = 'clock',
  OUT_FOR_DELIVERY = 'truck-delivery',
  PREPARING = 'chef-hat',
  PENDING = 'clock',
  COMPLETED = 'check-circle',
  CANCELLED = 'close-circle',
  LAST_ORDER = 'clock-outline',
}

// Order Details Labels
export enum OrderDetailsLabel {
  ORDER_DETAILS = 'Order Details',
  RESTAURANT = 'Restaurant',
  ORDER_ITEMS = 'Order Items',
  ORDER_SUMMARY = 'Order Summary',
  DELIVERY_INFORMATION = 'Delivery Information',
  PAYMENT_INFORMATION = 'Payment Information',
  ORDER_TRACKING = 'Order Tracking',
  ORDER_INFORMATION = 'Order Information',
  TRACKING_NUMBER = 'Tracking #',
  DELIVERY_INSTRUCTIONS = 'Delivery Instructions:',
  ORDER_DATE = 'Order Date',
  ORDER_TIME = 'Order Time',
  ESTIMATED_DELIVERY = 'Estimated Delivery',
  DELIVERED_AT = 'Delivered At',
  SUBTOTAL = 'Subtotal',
  TAX = 'Tax',
  DELIVERY_FEE = 'Delivery Fee',
  DISCOUNT = 'Discount',
  TOTAL = 'Total',
  SIZE = 'Size:',
  EXTRAS = 'Extras:',
  QUANTITY = 'Quantity:',
}

// Error Messages
export enum OrderErrorMessage {
  ORDER_NOT_FOUND = 'Order not found',
  FAILED_TO_LOAD_ORDERS = 'Failed to load orders',
  FAILED_TO_LOAD_ORDER_SUMMARY = 'Failed to load order summary',
  NO_ORDERS_FOUND = 'No Orders Found',
  NO_ONGOING_ORDERS = 'No Ongoing Orders',
  NO_ORDERS_YET = "You haven't placed any orders yet",
  NO_ACTIVE_ORDERS = "You don't have any active orders at the moment",
}

// Success Messages
export enum OrderSuccessMessage {
  ORDER_PLACED = 'Order placed successfully',
  ORDER_CONFIRMED = 'Restaurant confirmed your order',
  ORDER_PREPARING = 'Your order is being prepared',
  ORDER_READY = 'Order is ready for pickup',
  ORDER_OUT_FOR_DELIVERY = 'Your order is out for delivery',
  ORDER_DELIVERED = 'Your order has been delivered',
  ORDER_CANCELLED = 'Your order has been cancelled',
  ORDER_REFUNDED = 'Your order has been refunded',
  PROFILE_UPDATED = 'Profile updated successfully!',
  REORDER_SUCCESS = 'Items added to cart successfully',
}
