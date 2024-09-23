import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@redux/store';
import {MainNavParamList} from '@routes/param-list';

import {ChatScreen, ContactScreen, ProductScreen} from '@screens';
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
      <Screen name="Product" component={ProductScreen} />
    </Navigator>
  );
});

export default connect(mapStateToProps)(MainNav);
