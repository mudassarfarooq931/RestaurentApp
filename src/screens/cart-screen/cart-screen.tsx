import {ButtonPrimary, CustomModal, PrimaryHeader} from '@components';
import {appEnums, colors, ScreenEnum} from '@constants';
import {
  CartItem,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '@redux/slice/cart/cart-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {toggleFavorite} from '@redux/slice/favorites/favorites-slice';
import {RootState} from '@redux/store';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

const {width} = Dimensions.get('window');

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [removeItemModal, setRemoveItemModal] = useState({
    visible: false,
    itemId: '',
    itemTitle: '',
  });
  const [clearCartModal, setClearCartModal] = useState({
    visible: false,
  });
  const [checkoutModal, setCheckoutModal] = useState({
    visible: false,
    isSuccess: false,
  });

  const updateQuantity = (id: string, change: number) => {
    if (change > 0) {
      dispatch(incrementQuantity(id));
    } else {
      dispatch(decrementQuantity(id));
    }
  };

  const removeItem = (id: string, title: string) => {
    setRemoveItemModal({
      visible: true,
      itemId: id,
      itemTitle: title,
    });
  };

  const handleRemoveItemConfirm = () => {
    dispatch(removeFromCart(removeItemModal.itemId));
    dispatch(setToastMessage('Item removed from cart'));
    setRemoveItemModal({
      visible: false,
      itemId: '',
      itemTitle: '',
    });
  };

  const handleClearCart = () => {
    setClearCartModal({
      visible: true,
    });
  };

  const handleClearCartConfirm = () => {
    dispatch(clearCart());
    dispatch(setToastMessage('Cart cleared'));
    setClearCartModal({
      visible: false,
    });
  };

  const calculateSubtotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce(
      (total: number, item: CartItem) => total + (item.totalPrice || 0),
      0,
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      setCheckoutModal({
        visible: true,
        isSuccess: false,
      });
      return;
    }

    setIsLoading(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      setCheckoutModal({
        visible: true,
        isSuccess: true,
      });
    }, 2000);
  };

  const handleCheckoutConfirm = () => {
    if (checkoutModal.isSuccess) {
      dispatch(clearCart());
      navigate(ScreenEnum.Home);
    }
    setCheckoutModal({
      visible: false,
      isSuccess: false,
    });
  };

  const handleAddToFavorites = (item: CartItem) => {
    dispatch(
      toggleFavorite({
        id: item.id,
        title: item.title,
        description: `${item.title} - ${item.selectedSize}`,
        price: item.price,
        image: item.image,
        category: item.category,
        rating: 4.5,
        reviews: 128,
        addedAt: new Date().toISOString(),
      }),
    );
    dispatch(setToastMessage(`${item.title} added to favorites!`));
  };

  const isItemFavorite = (itemId: string) => {
    return favorites.some((fav: any) => fav.id === itemId);
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>

        <View style={styles.itemOptions}>
          <Text style={styles.optionText}>Size: {item.selectedSize}</Text>
          {item.selectedExtras.length > 0 && (
            <Text style={styles.optionText}>
              Extras: {item.selectedExtras.join(', ')}
            </Text>
          )}
        </View>

        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, -1)}
              activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="minus"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 1)}
              activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="plus"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.itemPrice}>${item.totalPrice.toFixed(2)}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleAddToFavorites(item)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name={isItemFavorite(item.id) ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isItemFavorite(item.id) ? colors.red : colors.gray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id, item.title)}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  size={20}
                  color={colors.red}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader
        title={appEnums.ScreenTitle.SHOPPING_CART}
        isDrawer={false}>
        {cartItems && cartItems.length > 0 ? (
          <TouchableOpacity onPress={handleClearCart} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="delete-sweep"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerPlaceholder} />
        )}
      </PrimaryHeader>

      {!cartItems || cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={80}
            color={colors.lightGray}
          />
          <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtitle}>
            Add some delicious items to get started!
          </Text>
          <ButtonPrimary
            title={appEnums.ButtonLabel.BROWSE_MENU}
            onPress={() => navigate(ScreenEnum.Home)}
            style={styles.browseButton}
          />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.itemsContainer}>
              {cartItems && cartItems.length > 0
                ? cartItems.map(renderCartItem)
                : null}
            </View>

            {/* Order Summary */}
            <View style={styles.orderSummary}>
              <Text style={styles.summaryTitle}>Order Summary</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>
                  ${calculateSubtotal().toFixed(2)}
                </Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (8%)</Text>
                <Text style={styles.summaryValue}>
                  ${calculateTax().toFixed(2)}
                </Text>
              </View>

              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                  ${calculateTotal().toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Delivery Info */}
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryRow}>
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.deliveryText}>
                  Free delivery on orders over $25
                </Text>
              </View>
              <View style={styles.deliveryRow}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.deliveryText}>
                  Estimated delivery: 30-45 minutes
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.checkoutContainer}>
            <ButtonPrimary
              title={
                isLoading
                  ? 'Processing...'
                  : `Checkout - $${calculateTotal().toFixed(2)}`
              }
              onPress={handleCheckout}
              disabled={isLoading}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}

      {/* Remove Item Modal */}
      <CustomModal
        visible={removeItemModal.visible}
        onClose={() =>
          setRemoveItemModal({visible: false, itemId: '', itemTitle: ''})
        }
        title={appEnums.ModalTitle.REMOVE_ITEM}
        message={`Are you sure you want to remove "${removeItemModal.itemTitle}" from your cart?`}
        primaryButtonText={appEnums.ButtonLabel.REMOVE_ITEM}
        secondaryButtonText={appEnums.ButtonLabel.CANCEL}
        onPrimaryPress={handleRemoveItemConfirm}
        onSecondaryPress={() =>
          setRemoveItemModal({visible: false, itemId: '', itemTitle: ''})
        }
        type="warning"
        icon="delete-outline"
      />

      {/* Clear Cart Modal */}
      <CustomModal
        visible={clearCartModal.visible}
        onClose={() => setClearCartModal({visible: false})}
        title={appEnums.ModalTitle.CLEAR_CART}
        message={appEnums.ModalMessage.CLEAR_CART_CONFIRMATION}
        primaryButtonText={appEnums.ButtonLabel.CLEAR_CART}
        secondaryButtonText={appEnums.ButtonLabel.CANCEL}
        onPrimaryPress={handleClearCartConfirm}
        onSecondaryPress={() => setClearCartModal({visible: false})}
        type="error"
        icon="delete-sweep"
      />

      {/* Checkout Modal */}
      <CustomModal
        visible={checkoutModal.visible}
        onClose={() => setCheckoutModal({visible: false, isSuccess: false})}
        title={checkoutModal.isSuccess ? 'Order Placed!' : 'Empty Cart'}
        message={
          checkoutModal.isSuccess
            ? `Your order of $${calculateTotal().toFixed(
                2,
              )} has been placed successfully.`
            : 'Your cart is empty. Add some items first!'
        }
        primaryButtonText="OK"
        onPrimaryPress={handleCheckoutConfirm}
        type={checkoutModal.isSuccess ? 'success' : 'info'}
        icon={checkoutModal.isSuccess ? 'check-circle' : 'cart-outline'}
      />
    </View>
  );
};

export default CartScreen;
