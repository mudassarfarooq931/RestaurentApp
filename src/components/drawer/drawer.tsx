import ProgressDialog from '@components/progress-dialog';
import ToastView from '@components/toast-view';
import {colors} from '@constants';
import {DrawerItem} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerActions} from '@react-navigation/native';
import {setCurrentUser} from '@redux/slice/auth/auth-slice';
import {setToastMessage} from '@redux/slice/toast-message/toast-message-slice';
import store, {RootState} from '@redux/store';
import React, {useState} from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

//-----------------------------
interface IDrawerContentProps {
  navigation: DrawerNavigationHelpers;
}

//-----------------------------------------------------------------
const Drawer: React.FC<IDrawerContentProps> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = store.store.dispatch;

  const logout = () => {
    navigation?.dispatch(DrawerActions.closeDrawer());

    setTimeout(() => {
      setLoading(false);
      dispatch(setCurrentUser(undefined));
      dispatch(setToastMessage('Logout Success'));
    }, 1000);
    setLoading(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProgressDialog visible={loading} />
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarWrapper}></View>
          <View>
            <Text style={styles.userName}>Mudassar Malik</Text>
            <Text style={styles.role}>React Native Developer</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={{paddingStart: 10}}>
          <DrawerItem
            inactiveTintColor={colors.primary}
            label={({focused, color}) => {
              return (
                <View style={styles.drawerItemContainer}>
                  <Text style={styles.itemText}>Logout</Text>
                </View>
              );
            }}
            icon={({color, size}) => (
              <TouchableOpacity onPress={logout}>
                <MaterialCommunityIcons
                  name="logout"
                  color={colors.primary}
                  size={size}
                />
              </TouchableOpacity>
            )}
            onPress={logout}
          />
        </View>
      </View>

      <ProgressDialog visible={false} />
      <ToastView />
    </SafeAreaView>
  );
};

export default Drawer;
