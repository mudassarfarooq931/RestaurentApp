import {DeviceUtil} from '@app-utils';
import {ButtonPrimary, FormikInput} from '@components';
import ProgressDialog from '@components/progress-dialog';
import {appEnums, colors, fonts, ScreenEnum, yupSchemas} from '@constants';
import {setCurrentUser, setSignupLoading} from '@redux/slice/auth/auth-slice';
import {RootState} from '@redux/store';
import {PrefManager} from '@services';
import {Formik} from 'formik';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
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
  signupLoading: boolean;
}

const mapStateToProps = (state: RootState) => {
  return {
    signupLoading: state.auth.signupLoading,
  };
};

const SignupScreen = memo(({signupLoading}: IProps) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Keyboard.dismiss();
    dispatch(setSignupLoading(false));

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

    return () => {
      Keyboard.dismiss();
    };
  }, []);

  const handleSignup = async (values: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const {email, username, password} = values;
    const deviceInfo = await DeviceUtil.getInstance().getDeviceInfo();
    Keyboard.dismiss();

    // Add loading state
    dispatch(setSignupLoading(true));

    // Simulate API call delay
    setTimeout(() => {
      PrefManager.storeString('userEmail', JSON.stringify(email));
      PrefManager.storeString('userPassword', JSON.stringify(password));

      dispatch(setCurrentUser({email, username, password}));
      dispatch(setSignupLoading(false));
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
              <Text style={styles.subtitle}>Join Our Community!</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.form}>
              <View style={styles.formHeader}>
                <Text style={styles.headerText}>Create Your Account</Text>
                <Text style={styles.headerSubtext}>
                  Fill in your details to get started
                </Text>
              </View>

              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={yupSchemas.SignupSchema}
                onSubmit={handleSignup}>
                {({handleSubmit, handleChange, values, errors, touched}) => (
                  <>
                    <View style={styles.inputContainer}>
                      <FormikInput
                        isRequired
                        name="username"
                        label={appEnums.FormLabel.FULL_NAME}
                        placeholder={appEnums.FormPlaceholder.ENTER_FULL_NAME}
                        keyboardType="default"
                        value={values.username}
                        onChangeText={handleChange('username')}
                        leftIcon={
                          <MaterialCommunityIcons
                            name="account-outline"
                            size={20}
                            color={colors.gray}
                          />
                        }
                      />
                    </View>

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

                    <View style={styles.inputContainer}>
                      <FormikInput
                        isRequired
                        name="confirmPassword"
                        label={appEnums.FormLabel.CONFIRM_PASSWORD}
                        placeholder={appEnums.FormPlaceholder.ENTER_PASSWORD}
                        secureTextEntry={!showConfirmPassword}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        keyboardType={
                          Platform.OS == 'ios' ? 'ascii-capable' : 'default'
                        }
                        leftIcon={
                          <MaterialCommunityIcons
                            name="lock-check-outline"
                            size={20}
                            color={colors.gray}
                          />
                        }
                        rightIcon={
                          <TouchableOpacity
                            onPress={toggleConfirmPasswordVisibility}>
                            <MaterialCommunityIcons
                              name={showConfirmPassword ? 'eye-off' : 'eye'}
                              size={20}
                              color={colors.gray}
                            />
                          </TouchableOpacity>
                        }
                      />
                    </View>

                    <View style={styles.termsContainer}>
                      <Text style={styles.termsText}>
                        By signing up, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text>{' '}
                        and <Text style={styles.termsLink}>Privacy Policy</Text>
                      </Text>
                    </View>

                    <ButtonPrimary
                      checkNetwork={true}
                      onPress={handleSubmit}
                      title={
                        signupLoading ? 'Creating Account...' : 'Create Account'
                      }
                      style={styles.buttonContainerSave}
                      disabled={signupLoading}
                    />
                  </>
                )}
              </Formik>
            </View>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigate(ScreenEnum?.Login)}>
                <Text
                  style={[
                    styles.linkText,
                    {fontFamily: fonts.MONTSERRAT_BOLD, color: colors.primary},
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {signupLoading && <ProgressDialog visible={signupLoading} />}
      </KeyboardAwareScrollView>
    </View>
  );
});

export default connect(mapStateToProps)(SignupScreen);
