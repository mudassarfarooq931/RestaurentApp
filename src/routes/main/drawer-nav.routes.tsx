import {colors} from '@constants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerNavParamList} from '@routes/param-list';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import MainNav from './main.routes';
import {Drawer} from '@components';

//-----------------
interface IProps {}

//------------------------------------------------------------------------
const {Navigator, Screen} = createDrawerNavigator<DrawerNavParamList>();
const MainDrawerNav: React.FC<IProps> = ({}) => {
  return (
    <>
      <SafeAreaView
        style={{backgroundColor: colors.primaryDarker}}></SafeAreaView>
      <View style={{flex: 1}}>
        <Navigator
          drawerContent={({navigation}) => <Drawer navigation={navigation} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'back',
            swipeEnabled: false,
          }}>
          <Screen name={'MainHome'} component={MainNav} />
        </Navigator>
      </View>
    </>
  );
};

export default MainDrawerNav;
