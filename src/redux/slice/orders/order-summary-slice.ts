import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderSummary} from 'types';

interface OrderSummaryState {
  summary: OrderSummary | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderSummaryState = {
  summary: null,
  loading: false,
  error: null,
};

const orderSummarySlice = createSlice({
  name: 'orderSummary',
  initialState,
  reducers: {
    // Set loading state
    setOrderSummaryLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setOrderSummaryError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Set order summary
    setOrderSummary: (state, action: PayloadAction<OrderSummary>) => {
      state.summary = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Update order summary
    updateOrderSummary: (
      state,
      action: PayloadAction<Partial<OrderSummary>>,
    ) => {
      if (state.summary) {
        state.summary = {...state.summary, ...action.payload};
      }
    },

    // Clear order summary
    clearOrderSummary: state => {
      state.summary = null;
      state.error = null;
    },
  },
});

export const {
  setOrderSummaryLoading,
  setOrderSummaryError,
  setOrderSummary,
  updateOrderSummary,
  clearOrderSummary,
} = orderSummarySlice.actions;

export default orderSummarySlice.reducer;
