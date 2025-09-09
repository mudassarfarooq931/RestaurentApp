import ProgressDialog from '@components/progress-dialog';
import ToastView from '@components/toast-view';
import {colors, ScreenEnum} from '@constants';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerActions} from '@react-navigation/native';
import {setAuthLoading} from '@redux/slice/auth/auth-slice';
import store, {RootState} from '@redux/store';
import {SocialAuthSService} from '@services';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {navigate} from '../../../root-navigation';
import styles from './styles';

//-----------------------------
interface IDrawerContentProps {
  navigation: DrawerNavigationHelpers;
  loading: boolean;
}

//-----------------------------------------------------------------

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.auth.loading,
  };
};

//-----------------------------------------------------------------
const Drawer: React.FC<IDrawerContentProps> = ({navigation, loading}) => {
  const dispatch = store.store.dispatch;

  const logout = async () => {
    dispatch(setAuthLoading(true));
    navigation?.dispatch(DrawerActions.closeDrawer());
    await SocialAuthSService?.getInstance()?.SocialSignOut();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressDialog visible={loading} />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Text style={styles.avatarText}>BRIM</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Mudassar Malik</Text>
            <Text style={styles.userEmail}>mudassar@example.com</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation?.dispatch(DrawerActions.closeDrawer());
              navigate(ScreenEnum.Profile);
            }}>
            <MaterialCommunityIcons
              name="account"
              size={20}
              color={colors.gray}
            />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation?.dispatch(DrawerActions.closeDrawer());
              navigate(ScreenEnum.OrderHistory);
            }}>
            <MaterialCommunityIcons
              name="shopping"
              size={20}
              color={colors.gray}
            />
            <Text style={styles.menuText}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation?.dispatch(DrawerActions.closeDrawer());
              navigate(ScreenEnum.Like);
            }}>
            <MaterialCommunityIcons
              name="heart"
              size={20}
              color={colors.gray}
            />
            <Text style={styles.menuText}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => {
              navigation?.dispatch(DrawerActions.closeDrawer());
              navigate(ScreenEnum.Settings);
            }}>
            <MaterialCommunityIcons name="cog" size={20} color={colors.gray} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutSection}>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="logout"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ToastView dark />
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(Drawer);
