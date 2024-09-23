import {colors} from '@constants';
import {NavigationContainer} from '@react-navigation/native';
import {RootState} from '@redux/store';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {isReadyRef, navigationRef, routeNameRef} from '../../navigation-helper';
import AuthNav from './auth/auth.routes';
import MainDrawerNav from './main/drawer-nav.routes';
import ToastView from '@components/toast-view';

interface IProps {}

const mapStateToProps = (state: RootState) => {
  return {};
};

//-----------------------------------------
const Routes: React.FC<IProps> = ({}) => {
  useEffect(() => {});
  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name;
          isReadyRef.current = true;
        }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        {false ? (
          <>
            <SafeAreaView style={{backgroundColor: colors.white}} />
            <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
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
};

export default connect(mapStateToProps)(Routes);
