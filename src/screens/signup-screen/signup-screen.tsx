import {DeviceUtil} from '@app-utils';
import {ButtonPrimary, FormikInput} from '@components';
import ProgressDialog from '@components/progress-dialog';
import {colors, fonts, ScreenEnum, yupSchemas} from '@constants';
import {setSignupLoading} from '@redux/slice/auth/auth-slice';
import store, {RootState} from '@redux/store';
import {Formik} from 'formik';
import React, {memo, useEffect} from 'react';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
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
  const dispatch = store.store.dispatch;

  useEffect(() => {
    Keyboard.dismiss();
    dispatch(setSignupLoading(false));

    return () => {
      Keyboard.dismiss();
    };
  }, []);

  const handleSignup = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const {email, username, password} = values;
    const deviceInfo = await DeviceUtil.getInstance().getDeviceInfo();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
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
                  username: '',
                  email: '',
                  password: '',
                }}
                validationSchema={yupSchemas.SignupSchema}
                onSubmit={handleSignup}
              >
                {({handleSubmit, handleChange, values, errors, touched}) => (
                  <>
                    <FormikInput
                      isRequired
                      name="username"
                      label="Username"
                      placeholder="Enter Username"
                      keyboardType="default"
                      value={values.username}
                      onChangeText={handleChange('username')}
                    />

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
                      title="Signup"
                      style={styles.buttonContainerSave}
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
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {signupLoading && <ProgressDialog visible={signupLoading} />}
      </KeyboardAwareScrollView>
    </View>
  );
});

export default connect(mapStateToProps)(SignupScreen);
