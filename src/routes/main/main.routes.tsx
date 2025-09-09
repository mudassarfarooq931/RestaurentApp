import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@redux/store';
import {MainNavParamList} from '@routes/param-list';

import {ScreenEnum} from '@constants';
import {
  AboutScreen,
  AddAddressScreen,
  AddPaymentMethodScreen,
  AddressesScreen,
  CartScreen,
  ChatScreen,
  ContactScreen,
  EditAddressScreen,
  EditPaymentMethodScreen,
  EditProfileScreen,
  HelpSupportScreen,
  OngoingOrdersScreen,
  OrderDetailsScreen,
  OrderHistoryScreen,
  PaymentMethodsScreen,
  ProductScreen,
  SettingsScreen,
} from '@screens';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import BottomTabNav from './bottom-tabs.routes';

interface IProps {}

const mapStateToProps = (state: RootState) => {
  return {};
};

const {Navigator, Screen} = createNativeStackNavigator<MainNavParamList>();
const MainNav = memo(({}: IProps) => {
  return (
    <Navigator
      initialRouteName={'BottomTabNav'}
      screenOptions={{headerShown: false}}>
      <Screen name="BottomTabNav" component={BottomTabNav} />
      <Screen name="Chat" component={ChatScreen} />
      <Screen name="Contacts" component={ContactScreen} />
      <Screen name={ScreenEnum.Product} component={ProductScreen} />
      <Screen name={ScreenEnum.Cart} component={CartScreen} />
      <Screen name={ScreenEnum.EditProfile} component={EditProfileScreen} />
      <Screen name={ScreenEnum.OrderHistory} component={OrderHistoryScreen} />
      <Screen
        name={ScreenEnum.OrderDetails}
        component={OrderDetailsScreen}
        options={({route}) => ({
          title: 'Order Details',
        })}
      />
      <Screen name={ScreenEnum.OngoingOrders} component={OngoingOrdersScreen} />
      <Screen name={ScreenEnum.Settings} component={SettingsScreen} />
      <Screen name={ScreenEnum.About} component={AboutScreen} />
      <Screen
        name={ScreenEnum.PaymentMethods}
        component={PaymentMethodsScreen}
      />
      <Screen
        name={ScreenEnum.AddPaymentMethod}
        component={AddPaymentMethodScreen}
      />
      <Screen
        name={ScreenEnum.EditPaymentMethod}
        component={EditPaymentMethodScreen}
        options={({route}) => ({
          title: 'Edit Payment Method',
        })}
      />
      <Screen name={ScreenEnum.Addresses} component={AddressesScreen} />
      <Screen name={ScreenEnum.AddAddress} component={AddAddressScreen} />
      <Screen
        name={ScreenEnum.EditAddress}
        component={EditAddressScreen}
        options={({route}) => ({
          title: 'Edit Address',
        })}
      />
      <Screen name={ScreenEnum.HelpSupport} component={HelpSupportScreen} />
    </Navigator>
  );
});

export default connect(mapStateToProps)(MainNav);
