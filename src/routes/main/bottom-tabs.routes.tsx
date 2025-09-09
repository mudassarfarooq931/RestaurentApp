import {colors} from '@constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootState} from '@redux/store';
import {BottomTabsNavParamList} from '@routes/param-list';
import {CartScreen, HomeScreen, LikeScreen, ProfileScreen} from '@screens';
import React, {useRef} from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator<BottomTabsNavParamList>();

// Custom Tab Bar Component with Badges
const CustomTabBar = ({state, descriptors, navigation}: any) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || [],
  );

  const totalCartItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );
  const totalFavorites = favorites.length;

  // Animation values for each tab
  const scaleAnimations = useRef(
    state.routes.map(() => new Animated.Value(1)),
  ).current;

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 75,
        backgroundColor: colors.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 12,
        paddingBottom: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: colors.lighterGray,
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          // Animate the tab press
          Animated.sequence([
            Animated.timing(scaleAnimations[index], {
              toValue: 0.9,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnimations[index], {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = (routeName: string) => {
          switch (routeName) {
            case 'Home':
              return 'home';
            case 'Cart':
              return 'cart';
            case 'Like':
              return 'heart';
            case 'Profile':
              return 'account';
            default:
              return 'circle';
          }
        };

        const getBadgeCount = (routeName: string) => {
          switch (routeName) {
            case 'Cart':
              return totalCartItems;
            case 'Like':
              return totalFavorites;
            default:
              return 0;
          }
        };

        const badgeCount = getBadgeCount(route.name);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
            }}
            activeOpacity={0.7}>
            <Animated.View
              style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: isFocused
                  ? colors.primary + '15'
                  : 'transparent',
                transform: [
                  {scale: scaleAnimations[index]},
                  {scale: isFocused ? 1.1 : 1},
                ],
              }}>
              <MaterialCommunityIcons
                name={getIconName(route.name)}
                size={28}
                color={isFocused ? colors.primary : colors.gray}
              />
              {badgeCount > 0 && (
                <Animated.View
                  style={{
                    position: 'absolute',
                    top: -3,
                    right: -3,
                    backgroundColor: colors.red,
                    borderRadius: 12,
                    minWidth: 22,
                    height: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    shadowColor: colors.red,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 11,
                      fontWeight: 'bold',
                    }}>
                    {badgeCount > 99 ? '99+' : badgeCount}
                  </Text>
                </Animated.View>
              )}
            </Animated.View>
            {/* <Text
              style={{
                fontSize: 11,
                fontWeight: isFocused ? 'bold' : '500',
                color: isFocused ? colors.primary : colors.gray,
                marginTop: 6,
                textAlign: 'center',
              }}>
              {route.name}
            </Text> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNav: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} options={{}} />
      <Tab.Screen name="Cart" component={CartScreen} options={{}} />
      <Tab.Screen name="Like" component={LikeScreen} options={{}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{}} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
