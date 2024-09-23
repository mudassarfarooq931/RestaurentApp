import {ButtonPrimary} from '@components';
import {colors, ScreenEnum} from '@constants';
import APPLE from '@svgs/apple.svg';
import FACEBOOK from '@svgs/facebook.svg';
import GOOGLE from '@svgs/google.svg';
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

const WelcomeScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* <Image source={require('@images/ABHA.png')} style={styles.logo} /> */}

          <Text style={styles.headerText}>Welcome </Text>
          <Text style={styles.secondaryHeading}>
            Please login or sign up to continue ordering
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            style={[styles.buttonStyle, {}]}
            textStyle={[styles.buttonTextStyle, {color: colors.black}]}
            title="Continue with Google"
            onPress={() => {
              Linking.openURL('https://mail.google.com/mail/');
            }}
            children={<GOOGLE />}
          />
          <ButtonPrimary
            style={[styles.buttonStyle, {backgroundColor: '#0067DB'}]}
            textStyle={[styles.buttonTextStyle]}
            title="Continue with Facebook"
            onPress={() => {
              Linking.openURL('https://www.facebook.com/');
            }}
            children={<FACEBOOK />}
          />
          {Platform?.OS == 'ios' && (
            <ButtonPrimary
              style={[styles.buttonStyle, {backgroundColor: colors.primary}]}
              textStyle={styles.buttonTextStyle}
              title="Continue with Apple"
              onPress={() => {
                Linking.openURL('https://appleid.apple.com/');
              }}
              children={<APPLE />}
            />
          )}
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
          <Text style={{paddingHorizontal: 10}}>or</Text>
          <View style={styles.divider}></View>
        </View>
        <ButtonPrimary
          style={[styles.buttonStyle, {backgroundColor: colors.primary}]}
          textStyle={styles.buttonTextStyle}
          title="Sign in with password"
          onPress={() => {
            navigate(ScreenEnum?.Login);
          }}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.footerText2}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigate(ScreenEnum?.Signup)}>
            <Text style={styles.footerText1}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default WelcomeScreen;
