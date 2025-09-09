import {CartItem} from '@redux/slice/cart/cart-slice';
import store from '@redux/store';

/**
 * Cart Data Synchronization Utilities
 * These utilities help ensure cart data is properly synchronized across the app
 */

export const getCartData = () => {
  const state = store.store.getState();
  return {
    items: state.cart?.items || [],
    totalItems: state.cart?.totalItems || 0,
    totalPrice: state.cart?.totalPrice || 0,
  };
};

export const getCartItemCount = () => {
  const cartData = getCartData();
  return cartData.totalItems;
};

export const getCartTotalPrice = () => {
  const cartData = getCartData();
  return cartData.totalPrice;
};

export const isCartEmpty = () => {
  const cartData = getCartData();
  return cartData.items.length === 0;
};

export const findCartItem = (
  productId: string,
  size?: string,
  extras?: string[],
) => {
  const cartData = getCartData();
  const uniqueId = `${productId}_${size || 'Medium'}_${(extras || []).join(
    ',',
  )}`;
  return cartData.items.find((item: CartItem) => item.id === uniqueId);
};

export const getCartItemQuantity = (
  productId: string,
  size?: string,
  extras?: string[],
) => {
  const item = findCartItem(productId, size, extras);
  return item ? item.quantity : 0;
};

export const logCartState = (context: string = 'Cart State') => {
  const cartData = getCartData();
  console.log(`[${context}] Cart Data:`, {
    itemCount: cartData.items.length,
    totalItems: cartData.totalItems,
    totalPrice: cartData.totalPrice,
    items: cartData.items.map((item: CartItem) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
  });
};

export const validateCartItem = (item: CartItem): boolean => {
  return !!(
    item.id &&
    item.title &&
    item.price &&
    item.quantity > 0 &&
    item.totalPrice >= 0
  );
};

export const calculateItemTotal = (item: CartItem): number => {
  const basePrice = parseFloat(item.price.replace('$', '')) || 0;
  const extrasPrice = (item.selectedExtras?.length || 0) * 2;
  return (basePrice + extrasPrice) * item.quantity;
};

export const syncCartData = () => {
  // This function can be called to ensure cart data is properly synchronized
  const cartData = getCartData();

  // Log current state for debugging
  logCartState('Cart Sync');

  // Validate all cart items
  const invalidItems = cartData.items.filter(
    (item: CartItem) => !validateCartItem(item),
  );
  if (invalidItems.length > 0) {
    console.warn('Invalid cart items found:', invalidItems);
  }

  return {
    isValid: invalidItems.length === 0,
    itemCount: cartData.items.length,
    totalItems: cartData.totalItems,
    totalPrice: cartData.totalPrice,
  };
};
