import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabsNavParamList} from '@routes/param-list';
import {
  CartScreen,
  HomeScreen,
  LikeScreen,
  MenuScreen,
  ProfileScreen,
} from '@screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@constants';

const Tab = createBottomTabNavigator<BottomTabsNavParamList>();

const BottomTabNav: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          backgroundColor: colors.white,
        },
      }}>
      {/* <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="menu" color={color} size={32} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cart" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Like"
        component={LikeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="heart" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
