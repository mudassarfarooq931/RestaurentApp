import {ScreenEnum} from '@constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavParamList} from '@routes/param-list';
import {
  ForgotPasswordScreen,
  LoginScreen,
  MapScreen,
  PasswordResetSuccessScreen,
  SignupScreen,
  WelcomeScreen,
} from '@screens';
import React from 'react';

interface IProps {}

const {Navigator, Screen} = createNativeStackNavigator<AuthNavParamList>();
const AuthNav: React.FC<IProps> = () => {
  return (
    <Navigator
      initialRouteName={ScreenEnum.Welcome}
      screenOptions={{headerShown: false}}>
      <Screen name={ScreenEnum.Welcome} component={WelcomeScreen} />
      <Screen name={ScreenEnum.Map} component={MapScreen} />
      <Screen name={ScreenEnum.Login} component={LoginScreen} />
      <Screen name={ScreenEnum.Signup} component={SignupScreen} />
      <Screen
        name={ScreenEnum.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Screen
        name={ScreenEnum.PasswordResetSuccess}
        component={PasswordResetSuccessScreen}
      />
    </Navigator>
  );
};

export default AuthNav;
