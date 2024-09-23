import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavParamList} from '@routes/param-list';
import {LoginScreen, SignupScreen, WelcomeScreen} from '@screens';
import React from 'react';

interface IProps {}

const {Navigator, Screen} = createNativeStackNavigator<AuthNavParamList>();
const AuthNav: React.FC<IProps> = () => {
  return (
    <Navigator
      initialRouteName={'Welcome'}
      screenOptions={{headerShown: false}}>
      <Screen name={'Welcome'} component={WelcomeScreen} />
      <Screen name={'Login'} component={LoginScreen} />
      <Screen name={'Signup'} component={SignupScreen} />
    </Navigator>
  );
};

export default AuthNav;
