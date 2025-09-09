import {DeviceUtil} from '@app-utils';
import {ButtonPrimary, ButtonSecondary, FormikInput} from '@components';
import ProgressDialog from '@components/progress-dialog';

import config from '@app-configs';
import {
  appEnums,
  colors,
  fonts,
  Images,
  ScreenEnum,
  yupSchemas,
} from '@constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {setAuthLoading, setCurrentUser} from '@redux/slice/auth/auth-slice';
import {RootState} from '@redux/store';
import {PrefManager, SocialAuthSService} from '@services';
import {Formik} from 'formik';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const [showPassword, setShowPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  console.log(
    config.GOOGLE_WEB_CLIENT_ID,
    '..config.GOOGLE_WEB_CLIENT_ID..',
    config.GOOGLE_IOS_CLIENT_ID,
  );

  useEffect(() => {
    Keyboard.dismiss();
    dispatch(setAuthLoading(false));

    // Animate screen entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

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

    // Add loading state
    dispatch(setAuthLoading(true));

    // Simulate API call delay
    setTimeout(() => {
      PrefManager.storeString('userEmail', JSON.stringify(email));
      PrefManager.storeString('userPassword', JSON.stringify(password));

      dispatch(setCurrentUser({email, password}));
      dispatch(setAuthLoading(false));
    }, 1500);
  };

  const handleSocialAuth = (provider: string) => {
    SocialAuthSService.getInstance().SocialSignUp(provider);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <KeyboardAwareScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.mainWrapper,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.top}>
            <View style={styles.logoContainer}>
              <Text style={styles.heading}>BRIM</Text>
              <Text style={styles.subtitle}>Welcome Back!</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.form}>
              <View style={styles.formHeader}>
                <Text style={styles.headerText}>Sign In to Your Account</Text>
                <Text style={styles.headerSubtext}>
                  Enter your credentials to continue
                </Text>
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
                    <View style={styles.inputContainer}>
                      <FormikInput
                        isRequired
                        name="email"
                        label={appEnums.FormLabel.EMAIL_ADDRESS}
                        placeholder={appEnums.FormPlaceholder.ENTER_EMAIL}
                        keyboardType="email-address"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        leftIcon={
                          <MaterialCommunityIcons
                            name="email-outline"
                            size={20}
                            color={colors.gray}
                          />
                        }
                      />
                    </View>

                    <View style={styles.inputContainer}>
                      <FormikInput
                        isRequired
                        name="password"
                        label={appEnums.FormLabel.PASSWORD}
                        placeholder={appEnums.FormPlaceholder.ENTER_PASSWORD}
                        secureTextEntry={!showPassword}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        keyboardType={
                          Platform.OS == 'ios' ? 'ascii-capable' : 'default'
                        }
                        leftIcon={
                          <MaterialCommunityIcons
                            name="lock-outline"
                            size={20}
                            color={colors.gray}
                          />
                        }
                        rightIcon={
                          <TouchableOpacity onPress={togglePasswordVisibility}>
                            <MaterialCommunityIcons
                              name={showPassword ? 'eye-off' : 'eye'}
                              size={20}
                              color={colors.gray}
                            />
                          </TouchableOpacity>
                        }
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.forgotPassword}
                      onPress={() => navigate(ScreenEnum.ForgotPassword)}>
                      <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>

                    <ButtonPrimary
                      checkNetwork={true}
                      onPress={handleSubmit}
                      title={loading ? 'Signing In...' : 'Sign In'}
                      style={styles.buttonContainerSave}
                      disabled={loading}
                    />

                    <View style={styles.divider}>
                      <View style={styles.dividerLine} />
                      <Text style={styles.dividerText}>OR</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    <ButtonSecondary
                      style={styles.btnGoogle}
                      onPress={() => {
                        handleSocialAuth('google');
                      }}
                      title={appEnums.ButtonLabel.CONTINUE}
                      textStyle={styles.googleButtonText}
                      children={
                        <View style={styles.googleButtonContent}>
                          <Image
                            style={styles.googleIcon}
                            source={Images.google_logo}
                          />
                        </View>
                      }
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
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {loading && <ProgressDialog visible={loading} />}
      </KeyboardAwareScrollView>
    </View>
  );
});

export default connect(mapStateToProps)(LoginScreen);
