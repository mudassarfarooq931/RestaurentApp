import {ButtonPrimary} from '@components';
import {appEnums, colors, ScreenEnum} from '@constants';
import {AuthRouteProp} from '@routes/param-list';
import React, {useEffect, useRef} from 'react';
import {Animated, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

//-------------------------------------
interface Props {
  route: AuthRouteProp<'PasswordResetSuccess'>;
}

//-------------------------------------
const PasswordResetSuccessScreen: React.FC<Props> = ({route}) => {
  const {email} = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackToLogin = () => {
    navigate(ScreenEnum.Login);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              opacity: fadeAnim,
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <View style={styles.iconBackground}>
            <MaterialCommunityIcons
              name="email-check"
              size={48}
              color={colors.primary}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a password reset link to
          </Text>
          {email && <Text style={styles.emailText}>{email}</Text>}
          <Text style={styles.description}>
            Please check your email and follow the instructions to reset your
            password. The link will expire in 24 hours.
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <ButtonPrimary
            title={appEnums.ButtonLabel.BACK_TO_LOGIN}
            onPress={handleBackToLogin}
            style={styles.button}
          />

          <TouchableOpacity
            style={styles.resendButton}
            onPress={() => {
              // You can add resend functionality here
              console.log('Resend email');
            }}>
            <Text style={styles.resendText}>
              Didn't receive the email? Resend
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default PasswordResetSuccessScreen;
