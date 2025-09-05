import {colors, ScreenEnum} from '@constants';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {navigate} from '../../../root-navigation';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate elements on screen load
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
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

  const handleDeliveryPress = () => {
    // Add haptic feedback and smooth transition
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigate(ScreenEnum.Map);
    });
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
            <Text style={styles.tagline}>Delicious Burgers</Text>
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
        <View style={styles.welcomeContent}>
          <View style={styles.top_row}>
            <Text style={styles.title}>Welcome to Brim Burgers</Text>
            <MaterialIcons
              name="waving-hand"
              size={28}
              color={colors.yellow_darkest}
            />
          </View>
          <Text style={styles.subtitle}>
            Discover amazing burgers delivered fresh to your doorstep
          </Text>

          {/* Feature highlights */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="clock-fast"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Fast Delivery</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="food"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Fresh Food</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialCommunityIcons
                name="star"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.featureText}>Premium Quality</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleDeliveryPress}
          style={styles.deliveryButton}>
          <Animated.View
            style={[
              styles.deliveryButtonContent,
              {transform: [{scale: scaleAnim}]},
            ]}>
            <View style={styles.deliveryIconContainer}>
              <MaterialCommunityIcons
                name="truck-fast"
                size={28}
                color={colors.white}
              />
            </View>
            <View style={styles.deliveryTextContainer}>
              <Text style={styles.deliveryTitle}>Start Your Order</Text>
              <Text style={styles.deliverySubtitle}>
                Get delicious food delivered
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color={colors.white}
            />
          </Animated.View>
        </TouchableOpacity>

        {/* Skip option for returning users */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigate(ScreenEnum.Login)}>
          <Text style={styles.skipText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default WelcomeScreen;
