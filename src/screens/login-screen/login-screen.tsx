import {DeviceUtil} from '@app-utils';
import {ButtonPrimary, ButtonSecondary, FormikInput} from '@components';
import ProgressDialog from '@components/progress-dialog';

import config from '@app-configs';
import {colors, fonts, Images, ScreenEnum, yupSchemas} from '@constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setAuthLoading, setCurrentUser} from '@redux/slice/auth/auth-slice';
import {RootState} from '@redux/store';
import {PrefManager, SocialAuthSService} from '@services';
import {Formik} from 'formik';
import React, {memo, useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect, useDispatch} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

interface IProps {
  loading: boolean;
}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.auth.loading,
  };
};

const LoginScreen = memo(({loading}: IProps) => {
  const dispatch = useDispatch();
  console.log(
    config.GOOGLE_WEB_CLIENT_ID,
    '..config.GOOGLE_WEB_CLIENT_ID..',
    config.GOOGLE_IOS_CLIENT_ID,
  );
  useEffect(() => {
    Keyboard.dismiss();
    dispatch(setAuthLoading(false));

    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: `${config.GOOGLE_WEB_CLIENT_ID}`, // client ID of type WEB for your server (needed to verify user ID and offline access)
      iosClientId: `${config.GOOGLE_IOS_CLIENT_ID}`,
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });

    return () => {
      Keyboard.dismiss();
    };
  }, []);

  const handleLogin = async (values: {email: string; password: string}) => {
    const {email, password} = values;
    const deviceInfo = await DeviceUtil.getInstance().getDeviceInfo();
    Keyboard.dismiss();

    PrefManager.storeString('userEmail', JSON.stringify(email));
    PrefManager.storeString('userPassword', JSON.stringify(password));

    dispatch(setCurrentUser({email, password}));
  };

  const handleSocialAuth = (provider: string) => {
    SocialAuthSService.getInstance().SocialSignUp(provider);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.mainWrapper]}>
          <View style={styles.top}>
            <Text style={styles.heading}>BRIM</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.form}>
              <View style={styles.formHeader}>
                <Text style={styles.headerText}>Welcome to Brim Burgers</Text>
              </View>

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={yupSchemas.LoginSchema}
                onSubmit={handleLogin}>
                {({handleSubmit, handleChange, values, errors, touched}) => (
                  <>
                    <FormikInput
                      isRequired
                      name="email"
                      label="Email"
                      placeholder="Enter Email"
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />

                    <FormikInput
                      isRequired
                      name="password"
                      label="Password"
                      placeholder="Enter Password"
                      secureTextEntry
                      value={values.password}
                      onChangeText={handleChange('password')}
                      keyboardType={
                        Platform.OS == 'ios' ? 'ascii-capable' : 'default'
                      }
                    />

                    <ButtonPrimary
                      checkNetwork={true}
                      onPress={handleSubmit}
                      title="Login"
                      style={styles.buttonContainerSave}
                    />

                    <ButtonSecondary
                      style={styles.btnGoogle}
                      onPress={() => {
                        handleSocialAuth('google');
                      }}
                      children={
                        <Image
                          style={styles.googleIcon}
                          source={Images.google_logo}
                        />
                      }
                      title="Continue with Google"
                    />
                  </>
                )}
              </Formik>
            </View>
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigate(ScreenEnum?.Signup)}>
                <Text
                  style={[
                    styles.linkText,
                    {fontFamily: fonts.MONTSERRAT_BOLD, color: colors.primary},
                  ]}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {loading && <ProgressDialog visible={loading} />}
      </KeyboardAwareScrollView>
    </View>
  );
});

export default connect(mapStateToProps)(LoginScreen);
