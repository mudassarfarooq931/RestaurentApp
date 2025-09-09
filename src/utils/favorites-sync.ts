import {FavoriteItem} from '@redux/slice/favorites/favorites-slice';
import store from '@redux/store';

/**
 * Favorites Data Synchronization Utilities
 * These utilities help ensure favorites data is properly synchronized across the app
 */

export const getFavoritesData = () => {
  const state = store.store.getState();
  return {
    items: state.favorites?.items || [],
    totalItems: state.favorites?.totalItems || 0,
  };
};

export const getFavoritesCount = () => {
  const favoritesData = getFavoritesData();
  return favoritesData.totalItems;
};

export const isFavoritesEmpty = () => {
  const favoritesData = getFavoritesData();
  return favoritesData.items.length === 0;
};

export const findFavoriteItem = (itemId: string) => {
  const favoritesData = getFavoritesData();
  return favoritesData.items.find((item: FavoriteItem) => item.id === itemId);
};

export const isItemFavorite = (itemId: string) => {
  const item = findFavoriteItem(itemId);
  return !!item;
};

export const getFavoriteCategories = () => {
  const favoritesData = getFavoritesData();
  const categories = new Set<string>();
  favoritesData.items.forEach((item: FavoriteItem) => {
    if (item.category) {
      categories.add(item.category);
    }
  });
  return Array.from(categories);
};

export const getFavoritesByCategory = (category: string) => {
  const favoritesData = getFavoritesData();
  if (category === 'All') {
    return favoritesData.items;
  }
  return favoritesData.items.filter(
    (item: FavoriteItem) => item.category === category,
  );
};

export const searchFavorites = (query: string) => {
  const favoritesData = getFavoritesData();
  const lowercaseQuery = query.toLowerCase();
  return favoritesData.items.filter(
    (item: FavoriteItem) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery),
  );
};

export const logFavoritesState = (context: string = 'Favorites State') => {
  const favoritesData = getFavoritesData();
  console.log(`[${context}] Favorites Data:`, {
    itemCount: favoritesData.items.length,
    totalItems: favoritesData.totalItems,
    categories: getFavoriteCategories(),
    items: favoritesData.items.map((item: FavoriteItem) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      addedAt: item.addedAt,
    })),
  });
};

export const validateFavoriteItem = (item: FavoriteItem): boolean => {
  return !!(
    item.id &&
    item.title &&
    item.description &&
    item.price &&
    item.image &&
    item.category &&
    item.rating &&
    item.reviews &&
    item.addedAt
  );
};

export const syncFavoritesData = () => {
  // This function can be called to ensure favorites data is properly synchronized
  const favoritesData = getFavoritesData();

  // Log current state for debugging
  logFavoritesState('Favorites Sync');

  // Validate all favorite items
  const invalidItems = favoritesData.items.filter(
    (item: FavoriteItem) => !validateFavoriteItem(item),
  );
  if (invalidItems.length > 0) {
    console.warn('Invalid favorite items found:', invalidItems);
  }

  return {
    isValid: invalidItems.length === 0,
    itemCount: favoritesData.items.length,
    totalItems: favoritesData.totalItems,
    categories: getFavoriteCategories(),
  };
};

export const getFavoritesStats = () => {
  const favoritesData = getFavoritesData();
  const categories = getFavoriteCategories();

  return {
    totalFavorites: favoritesData.totalItems,
    totalCategories: categories.length,
    categories: categories,
    recentlyAdded: favoritesData.items
      .sort(
        (a: FavoriteItem, b: FavoriteItem) =>
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      )
      .slice(0, 5),
  };
};
