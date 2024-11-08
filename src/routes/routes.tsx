import {DeviceUtil} from '@app-utils';
import ToastView from '@components/toast-view';
import {colors} from '@constants';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {RootState} from '@redux/store';
import {HelperService} from '@services';
import React, {memo, useEffect} from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {isReadyRef, navigationRef, routeNameRef} from '../../navigation-helper';
import AuthNav from './auth/auth.routes';
import MainDrawerNav from './main/drawer-nav.routes';

interface IProps {
  currentUser?: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

//-----------------------------------------
const Routes = memo(({currentUser}: IProps) => {
  useEffect(() => {
    Platform.OS === 'android'
      ? DeviceUtil.getInstance().checkAllPermissions()
      : null;
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    const unsubscribe = NetInfo?.addEventListener(state => {
      HelperService?.getInstance()?.showNetworkStatus(
        state.isConnected ? state.isConnected : false,
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
          isReadyRef.current = true;
        }}
      >
        <StatusBar backgroundColor={colors.black} barStyle="light-content" />
        {currentUser ? (
          <>
            <SafeAreaView style={{backgroundColor: colors.black}} />
            <SafeAreaView style={{flex: 1, backgroundColor: colors.black}}>
              <MainDrawerNav />
            </SafeAreaView>
          </>
        ) : (
          <AuthNav />
        )}
      </NavigationContainer>
      <ToastView />
    </>
  );
});

export default connect(mapStateToProps)(Routes);
