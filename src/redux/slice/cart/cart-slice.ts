import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  quantity: number;
  selectedSize: string;
  selectedExtras: string[];
  totalPrice: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Generate unique ID based on product ID, size, and extras
      const uniqueId = `${action.payload.id}_${
        action.payload.selectedSize
      }_${action.payload.selectedExtras.join(',')}`;

      const existingItem = state.items.find(item => item.id === uniqueId);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice =
          existingItem.quantity *
          (parseFloat(existingItem.price.replace('$', '')) +
            existingItem.selectedExtras.length * 2);
      } else {
        // Create new item with unique ID
        const newItem = {
          ...action.payload,
          id: uniqueId,
        };
        state.items.push(newItem);
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{id: string; quantity: number}>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            item => item.id !== action.payload.id,
          );
        } else {
          item.quantity = action.payload.quantity;
          const basePrice = parseFloat(item.price.replace('$', ''));
          const extrasPrice = item.selectedExtras.length * 2;
          item.totalPrice = (basePrice + extrasPrice) * item.quantity;
        }
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    clearCart: state => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        const basePrice = parseFloat(item.price.replace('$', ''));
        const extrasPrice = item.selectedExtras.length * 2;
        item.totalPrice = (basePrice + extrasPrice) * item.quantity;
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          const basePrice = parseFloat(item.price.replace('$', ''));
          const extrasPrice = item.selectedExtras.length * 2;
          item.totalPrice = (basePrice + extrasPrice) * item.quantity;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
