import {CustomImage, PrimaryHeader} from '@components';
import {appEnums, colors, ScreenEnum} from '@constants';
import {faker} from '@faker-js/faker';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '@redux/slice/cart/cart-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {toggleFavorite} from '@redux/slice/favorites/favorites-slice';
import {RootState} from '@redux/store';
import React, {useEffect, useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import SectionList from 'react-native-tabs-section-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {logCartState, syncCartData, syncFavoritesData} from '../../utils';
import {styles} from './styles';

const SECTIONS = [
  {
    title: 'Burgers',
    data: Array(5)
      .fill(0)
      .map(_ => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Pizza',
    data: Array(5)
      .fill(0)
      .map(_ => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Sushi and rolls',
    data: Array(10)
      .fill(0)
      .map(_ => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Salads',
    data: Array(10)
      .fill(0)
      .map(_ => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
  {
    title: 'Dessert',
    data: Array(10)
      .fill(0)
      .map(_ => ({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.lines(2),
        price: faker.commerce.price(),
      })),
  },
];

const width = Dimensions.get('window').width;

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || [],
  );
  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );
  const totalFavorites = favorites.length;

  // State to track which items should show quantity controls
  const [showQuantityControls, setShowQuantityControls] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    // Sync cart and favorites data on component mount
    const cartSyncResult = syncCartData();
    syncFavoritesData();

    // Log cart state for debugging
    logCartState('Home Screen Mount');

    // Validate cart data
    if (!cartSyncResult.isValid) {
      console.warn('Cart data validation failed on Home Screen mount');
    }
  }, []);

  // Sync cart data whenever cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      syncCartData();
      logCartState('Cart Items Changed');
    }
  }, [cartItems]);

  // Update showQuantityControls state when cart items change
  useEffect(() => {
    // Get all current cart item IDs
    const currentCartItemIds = cartItems.map((item: any) => {
      // Extract the original product ID from the cart item ID
      // Cart item ID format: "productId_Medium_"
      return item.id.split('_')[0];
    });

    // Update showQuantityControls to hide controls for items not in cart
    setShowQuantityControls(prev => {
      const updated = {...prev};
      Object.keys(updated).forEach(productId => {
        if (!currentCartItemIds.includes(productId)) {
          updated[productId] = false;
        }
      });
      return updated;
    });
  }, [cartItems]);

  const handleProductPress = (item: any, sectionTitle: string) => {
    navigate(ScreenEnum.Product, {
      product: {
        id: faker.string.uuid(),
        title: item.title,
        description: item.description,
        price: item.price,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
        category: sectionTitle,
        rating: 4.5,
        reviews: 128,
        ingredients: [
          'Beef Patty',
          'Lettuce',
          'Tomato',
          'Onion',
          'Cheese',
          'Special Sauce',
        ],
        nutrition: {
          calories: 650,
          protein: 35,
          carbs: 45,
          fat: 28,
        },
      },
    });
  };

  const handleFavoritePress = (item: any, sectionTitle: string) => {
    // Ensure price has $ symbol
    const formattedPrice = item.price.startsWith('$')
      ? item.price
      : `$${item.price}`;

    dispatch(
      toggleFavorite({
        id: item.id,
        title: item.title,
        description: item.description,
        price: formattedPrice,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
        category: sectionTitle,
        rating: 4.5,
        reviews: 128,
        addedAt: new Date().toISOString(),
      }),
    );
  };

  const handleAddToCart = (item: any, sectionTitle: string) => {
    // Ensure price has $ symbol
    const formattedPrice = item.price.startsWith('$')
      ? item.price
      : `$${item.price}`;

    const cartItem = {
      id: item.id,
      title: item.title,
      price: formattedPrice,
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
      category: sectionTitle,
      quantity: 1,
      selectedSize: 'Medium',
      selectedExtras: [],
      totalPrice: parseFloat(formattedPrice.replace('$', '')) || 0,
    };

    dispatch(addToCart(cartItem));
    dispatch(setToastMessage(`${item.title} added to cart!`));

    // Show quantity controls for this item
    setShowQuantityControls(prev => ({
      ...prev,
      [item.id]: true,
    }));

    // Sync cart data after adding item
    setTimeout(() => {
      syncCartData();
      logCartState('After Add to Cart');
    }, 100);
  };

  const isFavorite = (itemId: string) => {
    return favorites.some((fav: any) => fav.id === itemId);
  };

  const getCartItemQuantity = (itemId: string) => {
    // Generate the same unique ID format used in cart slice
    const uniqueId = `${itemId}_Medium_`;
    const cartItem = cartItems.find((item: any) => item.id === uniqueId);
    return cartItem ? cartItem.quantity : 0;
  };

  const isInCart = (itemId: string) => {
    // Generate the same unique ID format used in cart slice
    const uniqueId = `${itemId}_Medium_`;
    return cartItems.some((item: any) => item.id === uniqueId);
  };

  const shouldShowQuantityControls = (itemId: string) => {
    // Show quantity controls if:
    // 1. Local state says to show them AND
    // 2. Item is actually in the cart
    return showQuantityControls[itemId] && isInCart(itemId);
  };

  const handleIncrementQuantity = (itemId: string) => {
    // Generate the same unique ID format used in cart slice
    const uniqueId = `${itemId}_Medium_`;
    dispatch(incrementQuantity(uniqueId));
    const item = cartItems.find((cartItem: any) => cartItem.id === uniqueId);
    if (item) {
      dispatch(setToastMessage(`${item.title} quantity increased!`));
    }

    // Sync cart data after incrementing quantity
    setTimeout(() => {
      syncCartData();
      logCartState('After Increment Quantity');
    }, 100);
  };

  const handleDecrementQuantity = (itemId: string) => {
    // Generate the same unique ID format used in cart slice
    const uniqueId = `${itemId}_Medium_`;
    const currentQuantity = getCartItemQuantity(itemId);
    const item = cartItems.find((cartItem: any) => cartItem.id === uniqueId);

    dispatch(decrementQuantity(uniqueId));

    if (item) {
      if (currentQuantity > 1) {
        dispatch(setToastMessage(`${item.title} quantity decreased!`));
      } else {
        dispatch(setToastMessage(`${item.title} removed from cart!`));
        // Hide quantity controls when item is removed from cart
        setShowQuantityControls(prev => ({
          ...prev,
          [itemId]: false,
        }));
      }
    }

    // Sync cart data after decrementing quantity
    setTimeout(() => {
      syncCartData();
      logCartState('After Decrement Quantity');
    }, 100);
  };

  const list = [
    {
      id: '1',
      uri: 'https://plus.unsplash.com/premium_photo-1685314947151-074d2892c6ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1450152021501-598b36b17449?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
    {
      id: '4',
      uri: 'https://images.unsplash.com/photo-1485962307416-993e145b0d0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHNsaWRlciUyMGZhc3QlMjBmb29kJTIwZGVhbHMlMjBob3Jpem9udGFsfGVufDB8fDB8fHww',
    },
  ];

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.HOME} isDrawer>
        <TouchableOpacity
          onPress={() => {
            // Sync cart data before navigating to cart
            syncCartData();
            logCartState('Before Cart Navigation');
            navigate(ScreenEnum.Cart);
          }}
          style={styles.cartIconContainer}
          activeOpacity={0.7}>
          <MaterialCommunityIcons
            name="cart"
            size={24}
            color={colors.primary}
          />
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {totalItems > 99 ? '99+' : totalItems}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </PrimaryHeader>

      {/* Banner Slider */}
      <View style={styles.bannerContainer}>
        <SwiperFlatList
          autoplay
          autoplayLoop
          pagingEnabled
          // showPagination
          paginationStyle={styles.paginationStyle}
          paginationStyleItem={styles.paginationItem}
          data={list}
          renderItem={({item, index}) => (
            <View style={styles.bannerCard}>
              <CustomImage url={item?.uri} imageStyles={styles.bannerImage} />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>Delicious Food</Text>
                <Text style={styles.bannerSubtitle}>
                  Order now and get 20% off
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Quick Actions
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.7}>
          <View style={styles.quickActionIcon}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text style={styles.quickActionText}>Fast Delivery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.7}>
          <View style={styles.quickActionIcon}>
            <MaterialCommunityIcons
              name="star"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text style={styles.quickActionText}>Top Rated</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickActionItem} activeOpacity={0.7}>
          <View style={styles.quickActionIcon}>
            <MaterialCommunityIcons
              name="percent"
              size={20}
              color={colors.primary}
            />
          </View>
          <Text style={styles.quickActionText}>Special Offers</Text>
        </TouchableOpacity>
      </View> */}

      {/* Menu Categories */}
      <SectionList
        sections={SECTIONS}
        keyExtractor={item => item.title}
        stickySectionHeadersEnabled={false}
        scrollToLocationOffset={50}
        tabBarStyle={styles.tabBar}
        showsVerticalScrollIndicator={false}
        renderTab={({title, isActive}) => (
          <View
            style={
              isActive ? styles.tabContainerActive : styles.tabContainerInactive
            }>
            <Text
              style={isActive ? styles.tabTextActive : styles.tabTextInactive}>
              {title}
            </Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
            <View style={styles.sectionHeaderLine} />
          </View>
        )}
        renderItem={({item, section}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={0.8}
            onPress={() => handleProductPress(item, section.title)}>
            <View style={styles.itemContent}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={e => {
                        e.stopPropagation();
                        handleFavoritePress(item, section.title);
                      }}
                      activeOpacity={0.7}>
                      <MaterialCommunityIcons
                        name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                        size={18}
                        color={isFavorite(item.id) ? colors.red : colors.gray}
                      />
                    </TouchableOpacity>
                    {shouldShowQuantityControls(item.id) ? (
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={e => {
                            e.stopPropagation();
                            handleDecrementQuantity(item.id);
                          }}
                          activeOpacity={0.7}>
                          <MaterialCommunityIcons
                            name="minus"
                            size={16}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>
                          {getCartItemQuantity(item.id)}
                        </Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={e => {
                            e.stopPropagation();
                            handleIncrementQuantity(item.id);
                          }}
                          activeOpacity={0.7}>
                          <MaterialCommunityIcons
                            name="plus"
                            size={16}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={e => {
                          e.stopPropagation();
                          handleAddToCart(item, section.title);
                        }}
                        activeOpacity={0.7}>
                        <MaterialCommunityIcons
                          name="plus"
                          size={20}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
