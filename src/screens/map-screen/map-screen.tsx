import {ButtonPrimary} from '@components';
import {appEnums, colors, ScreenEnum, yupSchemas} from '@constants';
import {
  clearAllMapState,
  setArea,
  setCity,
} from '@redux/slice/common/map-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {RootState} from '@redux/store';
import {HelperService} from '@services';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect, useDispatch} from 'react-redux';
import {goBack, navigate} from '../../../root-navigation';
import {styles} from './styles';

interface IProps {
  city: string;
  area: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    city: state.map.city,
    area: state.map.area,
  };
};

const {width, height} = Dimensions.get('window');

const MapScreen = memo(({city, area}: IProps) => {
  const dispatch = useDispatch();
  const [isLocating, setIsLocating] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
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
      dispatch(clearAllMapState());
    };
  }, []);

  const handleLocateMe = () => {
    setIsLocating(true);
    // Simulate location detection
    setTimeout(() => {
      dispatch(setCity('Lahore'));
      dispatch(setArea('Johar Town'));
      setIsLocating(false);
      dispatch(setToastMessage('Location detected successfully!'));
    }, 2000);
  };

  const handleConfirmLocation = async () => {
    const formData = {city: city, address: area};
    const {data, msg, error} =
      await HelperService?.getInstance()?.isSchemaValid(
        yupSchemas.MapSchema,
        formData,
      );
    if (data) {
      navigate(ScreenEnum.Login);
    } else {
      dispatch(setToastMessage(msg));
    }
  };

  const popularCities = [
    {name: 'Lahore', areas: ['Johar Town', 'Gulberg', 'DHA', 'Model Town']},
    {
      name: 'Karachi',
      areas: ['Clifton', 'Defence', 'Gulshan', 'North Nazimabad'],
    },
    {name: 'Islamabad', areas: ['F-8', 'F-10', 'G-9', 'Blue Area']},
  ];

  const handleCitySelect = (cityName: string) => {
    dispatch(setCity(cityName));
    dispatch(setArea(''));
  };

  const handleAreaSelect = (areaName: string) => {
    dispatch(setArea(areaName));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          activeOpacity={0.6}
          style={styles.btnBack}>
          <Ionicons name="chevron-back" color={colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={60}
            color={colors.primary}
          />
          <Text style={styles.mapText}>Interactive Map</Text>
          <Text style={styles.mapSubtext}>
            {city && area ? `${area}, ${city}` : 'Select your location below'}
          </Text>
        </View>
      </View>

      <Animated.View
        style={[
          styles.bottom,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        {/* Locate Me Button */}
        <TouchableOpacity
          style={[styles.btnLocate, isLocating && styles.btnLocateActive]}
          activeOpacity={0.8}
          onPress={handleLocateMe}
          disabled={isLocating}>
          <MaterialIcons
            name={isLocating ? 'my-location' : 'my-location'}
            color={colors.white}
            size={20}
          />
          <Text style={styles.textLocate}>
            {isLocating ? 'Locating...' : 'Use Current Location'}
          </Text>
        </TouchableOpacity>

        {/* Location Selection Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.heading}>Select Your Location</Text>
          </View>

          {/* Popular Cities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Cities</Text>
            <View style={styles.citiesContainer}>
              {popularCities.map((cityData, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.cityButton,
                    city === cityData.name && styles.cityButtonActive,
                  ]}
                  onPress={() => handleCitySelect(cityData.name)}>
                  <Text
                    style={[
                      styles.cityButtonText,
                      city === cityData.name && styles.cityButtonTextActive,
                    ]}>
                    {cityData.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Areas for Selected City */}
          {city && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Areas in {city}</Text>
              <View style={styles.areasContainer}>
                {popularCities
                  .find(c => c.name === city)
                  ?.areas.map((areaName, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.areaButton,
                        area === areaName && styles.areaButtonActive,
                      ]}
                      onPress={() => handleAreaSelect(areaName)}>
                      <Text
                        style={[
                          styles.areaButtonText,
                          area === areaName && styles.areaButtonTextActive,
                        ]}>
                        {areaName}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          )}

          {/* Manual Input */}
          <View style={styles.manualInputSection}>
            <Text style={styles.sectionTitle}>Or Enter Manually</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>City</Text>
              <View style={styles.manualInput}>
                <MaterialCommunityIcons
                  name="city"
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={appEnums.FormPlaceholder.ENTER_CITY_NAME}
                  value={city}
                  onChangeText={value => dispatch(setCity(value))}
                  placeholderTextColor={colors.lightGray}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Area/Neighborhood</Text>
              <View style={styles.manualInput}>
                <MaterialCommunityIcons
                  name="home-outline"
                  size={20}
                  color={colors.gray}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder={appEnums.FormPlaceholder.ENTER_AREA_NAME}
                  value={area}
                  onChangeText={value => dispatch(setArea(value))}
                  placeholderTextColor={colors.lightGray}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Confirm Button */}
        <ButtonPrimary
          title={appEnums.ButtonLabel.CONFIRM_LOCATION}
          onPress={handleConfirmLocation}
          style={styles.btnConfirm}
          disabled={!city || !area}
        />
      </Animated.View>
    </View>
  );
});

export default connect(mapStateToProps)(MapScreen);
