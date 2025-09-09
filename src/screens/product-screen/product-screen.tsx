import {ButtonPrimary} from '@components';
import {colors, ScreenEnum} from '@constants';
// TODO: Replace with actual product data from API
import {addToCart} from '@redux/slice/cart/cart-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {toggleFavorite} from '@redux/slice/favorites/favorites-slice';
import {RootState} from '@redux/store';
import {MainRouteProp} from '@routes/param-list';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {goBack, navigate} from '../../../root-navigation';
import {syncCartData, syncFavoritesData} from '../../utils';
import styles from './styles';
const {width, height} = Dimensions.get('window');
const HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 80;

interface ProductScreenProps {
  route: MainRouteProp<ScreenEnum.Product>;
}

const ProductScreen: React.FC<ProductScreenProps> = ({route}) => {
  const {params} = route || {};
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const favoriteScale = useRef(new Animated.Value(1)).current;

  // Get favorites from Redux state
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || [],
  );
  const isFavorite = favorites.some(
    (item: any) => item.id === params?.product?.id,
  );

  // Sync cart and favorites data on component mount
  useEffect(() => {
    syncCartData();
    syncFavoritesData();
  }, []);

  // Product data
  const product = {
    id: params?.product?.id || '1',
    title: params?.product?.title || 'Delicious Burger',
    description:
      params?.product?.description || 'Product description not available',
    price: params?.product?.price || '$12.99',
    image:
      params?.product?.image ||
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60',
    category: params?.product?.category || 'Burgers',
    rating: params?.product?.rating || 4.5,
    reviews: params?.product?.reviews || 128,
    ingredients: params?.product?.ingredients || [
      'Beef Patty',
      'Lettuce',
      'Tomato',
      'Onion',
      'Cheese',
      'Special Sauce',
    ],
    nutrition: params?.product?.nutrition || {
      calories: 650,
      protein: 35,
      carbs: 45,
      fat: 28,
    },
  };

  const sizes = ['Small', 'Medium', 'Large'];
  const extras = [
    {name: 'Extra Cheese', price: '$2.00'},
    {name: 'Bacon', price: '$3.00'},
    {name: 'Avocado', price: '$2.50'},
    {name: 'Mushrooms', price: '$1.50'},
  ];

  // Animation values
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT - STICKY_HEADER_HEIGHT],
    outputRange: [0, -(HEADER_HEIGHT - STICKY_HEADER_HEIGHT)],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2, HEADER_HEIGHT - STICKY_HEADER_HEIGHT],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Sticky header animations
  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [
      HEADER_HEIGHT - STICKY_HEADER_HEIGHT - 10,
      HEADER_HEIGHT - STICKY_HEADER_HEIGHT,
    ],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderTranslateY = scrollY.interpolate({
    inputRange: [
      HEADER_HEIGHT - STICKY_HEADER_HEIGHT - 10,
      HEADER_HEIGHT - STICKY_HEADER_HEIGHT,
    ],
    outputRange: [20, 0],
    extrapolate: 'clamp',
  });

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleExtraToggle = (extra: string) => {
    setSelectedExtras(prev =>
      prev.includes(extra)
        ? prev.filter(item => item !== extra)
        : [...prev, extra],
    );
  };

  const handleBackPress = () => {
    goBack();
  };

  const handleFavoritePress = () => {
    // Animate the button
    Animated.sequence([
      Animated.timing(favoriteScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(favoriteScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle favorite in Redux
    dispatch(
      toggleFavorite({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        addedAt: new Date().toISOString(),
      }),
    );

    // Show toast message
    const message = `${product.title} ${
      !isFavorite ? 'added to' : 'removed from'
    } favorites`;
    dispatch(setToastMessage(message));
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: quantity,
      selectedSize: selectedSize,
      selectedExtras: selectedExtras,
      totalPrice: calculateTotalPrice(),
    };

    // Add to Redux cart store
    dispatch(addToCart(cartItem));

    // Show success message
    dispatch(setToastMessage(`${product.title} added to cart!`));

    // Navigate to cart screen
    navigate(ScreenEnum.Cart);

    console.log('Added to cart:', cartItem);
  };

  const calculateTotalPrice = () => {
    try {
      const basePrice = parseFloat(product.price.replace('$', '')) || 0;
      const extrasPrice = selectedExtras.reduce((total, extra) => {
        const extraItem = extras.find(e => e.name === extra);
        return (
          total +
          (extraItem ? parseFloat(extraItem.price.replace('$', '')) || 0 : 0)
        );
      }, 0);
      return (basePrice + extrasPrice) * quantity;
    } catch (error) {
      console.warn('Error calculating total price:', error);
      return 0;
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Main Parallax Header */}
      <Animated.View
        style={[
          styles.parallaxHeader,
          {
            height: HEADER_HEIGHT,
            transform: [{translateY: headerTranslateY}],
          },
        ]}>
        {/* Background Image */}
        <Animated.View
          style={[
            styles.backgroundImageContainer,
            {
              transform: [{scale: imageScale}],
              opacity: headerOpacity,
            },
          ]}>
          <ImageBackground
            source={{uri: product.image}}
            style={styles.backgroundImage}
            resizeMode="cover">
            <View style={styles.imageOverlay} />
          </ImageBackground>
        </Animated.View>

        {/* Header Content */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            opacity: titleOpacity,
          }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.white,
              marginBottom: 8,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: 0, height: 1},
              textShadowRadius: 3,
            }}>
            {product.title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color={colors.yellow_dark}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: colors.white,
                marginLeft: 5,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: 0, height: 1},
                textShadowRadius: 3,
              }}>
              {product.rating}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.white,
                marginLeft: 5,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: 0, height: 1},
                textShadowRadius: 3,
              }}>
              ({product.reviews} reviews)
            </Text>
          </View>
        </Animated.View>

        {/* Back Button */}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 5,
            left: 15,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 6,
          }}
          onPress={handleBackPress}
          activeOpacity={0.7}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>

        {/* Favorite Button */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 5,
            right: 15,
            zIndex: 6,
            transform: [{scale: favoriteScale}],
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleFavoritePress}
            activeOpacity={0.7}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? colors.red : colors.white}
            />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* Sticky Header - Appears after scrolling */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: STICKY_HEADER_HEIGHT,
          backgroundColor: colors.white,
          zIndex: 10,
          opacity: stickyHeaderOpacity,
          transform: [{translateY: stickyHeaderTranslateY}],
          elevation: 8,
          shadowColor: colors.black,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 4,
          borderBottomWidth: 1,
          borderBottomColor: colors.lighterGray,
        }}>
        {/* Sticky Header Content */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 0,
          }}>
          {/* Back Button in Sticky Header */}
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.lighterGray,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}
            onPress={handleBackPress}
            activeOpacity={0.7}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>

          {/* Product Info in Sticky Header */}
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.primary,
                marginBottom: 2,
              }}
              numberOfLines={1}>
              {product.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="star"
                size={14}
                color={colors.yellow_dark}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.primary,
                  marginLeft: 4,
                }}>
                {product.rating}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.gray,
                  marginLeft: 4,
                }}>
                ({product.reviews})
              </Text>
            </View>
          </View>

          {/* Price in Sticky Header */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.primary,
            }}>
            {product.price}
          </Text>

          {/* Favorite Button in Sticky Header */}
          <Animated.View
            style={{
              marginLeft: 15,
              transform: [{scale: favoriteScale}],
            }}>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.lighterGray,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleFavoritePress}
              activeOpacity={0.7}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <MaterialCommunityIcons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? colors.red : colors.primary}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Content */}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 20,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        {/* Product Info Card */}
        <View
          style={{
            backgroundColor: colors.white,
            margin: 20,
            padding: 20,
            borderRadius: 15,
            elevation: 3,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
          }}>
          <View style={{marginBottom: 15}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: colors.primary,
                marginBottom: 8,
              }}>
              {product.title}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="star"
                size={16}
                color={colors.yellow_dark}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.primary,
                  marginLeft: 5,
                }}>
                {product.rating}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.gray,
                  marginLeft: 5,
                }}>
                ({product.reviews} reviews)
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 16,
              color: colors.gray,
              lineHeight: 24,
              marginBottom: 15,
            }}>
            {product.description}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: colors.primary,
              }}>
              {product.price}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.gray,
                backgroundColor: colors.lighterGray,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 15,
              }}>
              {product.category}
            </Text>
          </View>
        </View>

        {/* Size Selection */}
        <View
          style={{
            backgroundColor: colors.white,
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 20,
            borderRadius: 15,
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 15,
            }}>
            Size
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {sizes.map(size => (
              <TouchableOpacity
                key={size}
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  paddingVertical: 12,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor:
                    selectedSize === size ? colors.primary : colors.lighterGray,
                  backgroundColor:
                    selectedSize === size ? colors.primary : colors.white,
                  alignItems: 'center',
                }}
                onPress={() => setSelectedSize(size)}
                activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: selectedSize === size ? colors.white : colors.gray,
                  }}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Extras Selection */}
        <View
          style={{
            backgroundColor: colors.white,
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 20,
            borderRadius: 15,
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 15,
            }}>
            Add Extras
          </Text>
          {extras.map(extra => (
            <TouchableOpacity
              key={extra.name}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: colors.lighterGray,
              }}
              onPress={() => handleExtraToggle(extra.name)}
              activeOpacity={0.7}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.primary,
                  }}>
                  {extra.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray,
                    marginTop: 2,
                  }}>
                  {extra.price}
                </Text>
              </View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: selectedExtras.includes(extra.name)
                    ? colors.primary
                    : colors.lighterGray,
                  backgroundColor: selectedExtras.includes(extra.name)
                    ? colors.primary
                    : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {selectedExtras.includes(extra.name) && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color={colors.white}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ingredients */}
        <View
          style={{
            backgroundColor: colors.white,
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 20,
            borderRadius: 15,
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 15,
            }}>
            Ingredients
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {product.ingredients.map((ingredient: string, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '50%',
                  marginBottom: 8,
                }}>
                <MaterialCommunityIcons
                  name="circle-small"
                  size={16}
                  color={colors.primary}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray,
                    marginLeft: 5,
                  }}>
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Nutrition Info */}
        <View
          style={{
            backgroundColor: colors.white,
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 20,
            borderRadius: 15,
            elevation: 2,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.primary,
              marginBottom: 15,
            }}>
            Nutrition Information
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '48%',
                backgroundColor: colors.lighterGray,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                {product.nutrition.calories}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.gray,
                  marginTop: 4,
                }}>
                Calories
              </Text>
            </View>
            <View
              style={{
                width: '48%',
                backgroundColor: colors.lighterGray,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                {product.nutrition.protein}g
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.gray,
                  marginTop: 4,
                }}>
                Protein
              </Text>
            </View>
            <View
              style={{
                width: '48%',
                backgroundColor: colors.lighterGray,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                {product.nutrition.carbs}g
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.gray,
                  marginTop: 4,
                }}>
                Carbs
              </Text>
            </View>
            <View
              style={{
                width: '48%',
                backgroundColor: colors.lighterGray,
                padding: 15,
                borderRadius: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.primary,
                }}>
                {product.nutrition.fat}g
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.gray,
                  marginTop: 4,
                }}>
                Fat
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          paddingBottom: 30,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lighterGray,
          elevation: 8,
          shadowColor: colors.black,
          shadowOffset: {width: 0, height: -2},
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          zIndex: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.lighterGray,
            borderRadius: 25,
            paddingHorizontal: 5,
            marginRight: 15,
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 2,
              shadowColor: colors.black,
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
            onPress={() => handleQuantityChange(-1)}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="minus"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: colors.primary,
              marginHorizontal: 15,
              minWidth: 30,
              textAlign: 'center',
            }}>
            {quantity}
          </Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 2,
              shadowColor: colors.black,
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
            onPress={() => handleQuantityChange(1)}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <ButtonPrimary
            title={`Add to Cart - $${calculateTotalPrice().toFixed(2)}`}
            onPress={handleAddToCart}
            style={{
              borderRadius: 25,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;
