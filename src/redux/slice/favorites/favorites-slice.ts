import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FavoriteItem {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  addedAt: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  totalItems: number;
}

const initialState: FavoritesState = {
  items: [],
  totalItems: 0,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (!existingItem) {
        state.items.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
        state.totalItems = state.items.length;
      }
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
    },

    removeMultipleFromFavorites: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter(
        item => !action.payload.includes(item.id),
      );
      state.totalItems = state.items.length;
    },

    clearFavorites: state => {
      state.items = [];
      state.totalItems = 0;
    },

    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push({
          ...action.payload,
          addedAt: new Date().toISOString(),
        });
      }
      state.totalItems = state.items.length;
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  removeMultipleFromFavorites,
  clearFavorites,
  toggleFavorite,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
