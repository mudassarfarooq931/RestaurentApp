import {orderEnums} from '@constants';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Order} from 'types';

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  selectedOrder: Order | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  selectedOrder: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Set loading state
    setOrdersLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setOrdersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Set all orders
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Add a new order
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },

    // Update an existing order
    updateOrder: (
      state,
      action: PayloadAction<{id: string; updates: Partial<Order>}>,
    ) => {
      const {id, updates} = action.payload;
      const index = state.orders.findIndex(order => order.id === id);
      if (index !== -1) {
        state.orders[index] = {...state.orders[index], ...updates};
      }
    },

    // Update order status
    updateOrderStatus: (
      state,
      action: PayloadAction<{id: string; status: orderEnums.OrderStatus}>,
    ) => {
      const {id, status} = action.payload;
      const index = state.orders.findIndex(order => order.id === id);
      if (index !== -1) {
        state.orders[index].status = status;
      }
    },

    // Remove an order
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
    },

    // Set selected order
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },

    // Clear orders
    clearOrders: state => {
      state.orders = [];
      state.selectedOrder = null;
      state.error = null;
    },

    // Reorder an existing order
    reorder: (state, action: PayloadAction<string>) => {
      const orderId = action.payload;
      const existingOrder = state.orders.find(order => order.id === orderId);
      if (existingOrder) {
        const newOrder: Order = {
          ...existingOrder,
          id: `order_${Date.now()}`,
          orderNumber: `ORD-${Date.now()}`,
          status: orderEnums.OrderStatus.PENDING,
          orderDate: new Date().toISOString(),
          estimatedDeliveryTime: undefined,
          actualDeliveryTime: undefined,
          trackingNumber: undefined,
        };
        state.orders.unshift(newOrder);
      }
    },
  },
});

export const {
  setOrdersLoading,
  setOrdersError,
  setOrders,
  addOrder,
  updateOrder,
  updateOrderStatus,
  removeOrder,
  setSelectedOrder,
  clearOrders,
  reorder,
} = ordersSlice.actions;

export default ordersSlice.reducer;
