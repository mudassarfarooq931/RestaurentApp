import {ButtonPrimary, FormikInput} from '@components';
import {appEnums, colors, fonts, ScreenEnum, yupSchemas} from '@constants';
import {setAuthLoading} from '@redux/slice/auth/auth-slice';
import {RootState} from '@redux/store';
import {Formik} from 'formik';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Keyboard,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useDispatch} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {styles} from './styles.ts';

//-------------------------------------
interface Props {
  loading: boolean;
}

//-------------------------------------
const ForgotPasswordScreen: React.FC<Props> = ({loading}) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Keyboard.dismiss();
    // Start animations
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleForgotPassword = async (values: {email: string}) => {
    try {
      // Add loading state
      dispatch(setAuthLoading(true));

      // Simulate API call delay
      setTimeout(() => {
        dispatch(setAuthLoading(false));
        // Navigate to success screen with email
        navigate(ScreenEnum.PasswordResetSuccess, {email: values.email});
      }, 2000);
    } catch (error) {
      dispatch(setAuthLoading(false));
      console.error('Forgot password error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />

      {/* Background Pattern */}
      <View style={styles.backgroundPattern} />

      <View style={styles.top}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <View style={styles.logoBackground}>
            <Text style={styles.heading}>BRIM</Text>
            <Text style={styles.tagline}>Secure Account Recovery</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.bottom,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.formContent}>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Reset Your Password</Text>
              <Text style={styles.subtitle}>
                Enter your email address and we'll send you a link to reset your
                password
              </Text>
            </View>

            <View style={styles.form}>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={yupSchemas.ForgotPasswordSchema}
                onSubmit={handleForgotPassword}>
                {({handleSubmit, handleChange, values, errors, touched}) => (
                  <>
                    <View style={styles.inputContainer}>
                      <FormikInput
                        isRequired
                        name="email"
                        label={appEnums.FormLabel.EMAIL_ADDRESS}
                        placeholder={
                          appEnums.FormPlaceholder.ENTER_EMAIL_ADDRESS
                        }
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

                    <ButtonPrimary
                      checkNetwork={true}
                      onPress={handleSubmit}
                      title={loading ? 'Sending...' : 'Send Reset Link'}
                      style={styles.buttonContainerSave}
                      disabled={loading}
                    />
                  </>
                )}
              </Formik>
            </View>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Remember your password? </Text>
              <TouchableOpacity onPress={() => navigate(ScreenEnum.Login)}>
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
        </KeyboardAwareScrollView>
      </Animated.View>
    </View>
  );
};

//-------------------------------------
const mapStateToProps = (state: RootState) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(ForgotPasswordScreen);
