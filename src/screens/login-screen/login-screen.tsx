import {ButtonPrimary, Input} from '@components';
import ProgressDialog from '@components/progress-dialog';
import {colors, fonts, ScreenEnum} from '@constants';
import {setToastMessage} from '@redux/slice/main/toast-message/toast-message-slice';
import store, {RootState} from '@redux/store';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect, useDispatch} from 'react-redux';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

interface IProps {}

const mapStateToProps = (state: RootState) => {
  return {};
};

const LoginScreen = memo(({}: IProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const dispatch = useDispatch();

  const bounceValue = useRef(new Animated.Value(0)).current; // For bouncing animation

  useEffect(() => {
    Keyboard.dismiss();

    return () => {
      Keyboard.dismiss();
      setEmail('');
      setPassword('');
    };
  }, []);
  const triggerBounce = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: 10, // Move right by 10 units
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: -10, // Move left by 10 units
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 0, // Back to initial position
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email || !password) {
      triggerBounce(); // Trigger bounce on error
      return dispatch(
        setToastMessage(`Please Enter ${!email ? 'Email' : 'Password'}.`),
      );
    }

    if (email.includes(' ')) {
      triggerBounce();
      dispatch(setToastMessage('Email cannot contain spaces.'));
      return;
    }

    if (!emailRegex.test(email)) {
      triggerBounce();
      dispatch(setToastMessage('Invalid email format.'));
      return;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scroll}
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.contentContainer}>
      <View style={[styles.mainWrapper]}>
        <View style={styles.form}>
          <View style={styles.formHeader}>
            {/* <Image source={require('@images/ABHA.png')} style={styles.logo} /> */}
            <Text style={styles.headerText}>Signup</Text>
          </View>

          <Input
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email address"
            textStyle={{color: colors.black}}
            keyboardType={'email-address'}
            multiLine={false}
            children={
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  paddingHorizontal: 5,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 5,
                }}>
                <Ionicons name={'mail'} size={25} color={colors.white} />
              </TouchableOpacity>
            }
          />

          <Input
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            textStyle={{color: colors.black}}
            secure={!showPass}
            keyboardType={'ascii-capable'}
            multiLine={false}
            children={
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setShowPass(!showPass);
                }}
                style={{
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 5,
                }}>
                <Ionicons
                  name={showPass ? 'eye' : 'eye-off'}
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
            }
          />

          <Animated.View style={{transform: [{translateX: bounceValue}]}}>
            <ButtonPrimary
              onPress={() => {
                Keyboard.dismiss();
                setTimeout(() => {
                  onSubmit();
                }, 500);
              }}
              title="Login"
              style={styles.buttonContainerSave}
            />
          </Animated.View>
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

      <ProgressDialog visible={false} />
    </ScrollView>
  );
});

export default connect(mapStateToProps)(LoginScreen);
