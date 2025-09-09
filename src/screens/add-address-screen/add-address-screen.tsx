import {ButtonPrimary, FormikInput, PrimaryHeader} from '@components';
import {colors, ScreenEnum} from '@constants';
import {HelperService} from '@services';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {AddressSchema} from '../../constants/yup-schema';
import {AddressFormData} from '../../types/custom-types';
import styles from './styles';

const AddAddressScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>(
    'home',
  );
  const [isDefault, setIsDefault] = useState(false);
  const helperService = HelperService.getInstance();

  const addressTypes = [
    {key: 'home', label: 'Home', icon: 'home'},
    {key: 'work', label: 'Work', icon: 'briefcase'},
    {key: 'other', label: 'Other', icon: 'map-marker'},
  ] as const;

  const validationSchema = AddressSchema;

  const initialValues: AddressFormData = {
    type: 'home',
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    phoneNumber: '',
    instructions: '',
    isDefault: false,
  };

  const handleSubmit = (values: AddressFormData) => {
    const addressData = {
      ...values,
      type: selectedType,
      isDefault,
    };

    // TODO: Save address to Redux/API
    console.log('Saving address:', addressData);

    Alert.alert('Success', 'Address added successfully!', [
      {
        text: 'OK',
        onPress: () => {
          navigate(ScreenEnum.Addresses);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <PrimaryHeader title="Add Address" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({handleSubmit, isValid, dirty}) => (
            <>
              {/* Address Type Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address Type</Text>
                <View style={styles.typeContainer}>
                  {addressTypes.map(type => (
                    <TouchableOpacity
                      key={type.key}
                      style={[
                        styles.typeButton,
                        selectedType === type.key && styles.selectedTypeButton,
                      ]}
                      onPress={() => setSelectedType(type.key)}
                      activeOpacity={0.7}>
                      <MaterialCommunityIcons
                        name={helperService.getAddressTypeIcon(type.key)}
                        size={24}
                        color={
                          selectedType === type.key
                            ? colors.white
                            : helperService.getAddressTypeColor(type.key)
                        }
                      />
                      <Text
                        style={[
                          styles.typeButtonText,
                          selectedType === type.key &&
                            styles.selectedTypeButtonText,
                        ]}>
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Address Form */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address Details</Text>

                <FormikInput
                  name="name"
                  placeholder="Address name (e.g., Home, Office)"
                  label="Address Name"
                  isRequired
                />

                <FormikInput
                  name="address"
                  placeholder="Street address, building, house number"
                  label="Street Address"
                  isRequired
                  multiline
                  numberOfLines={2}
                />

                <View style={styles.row}>
                  <View style={styles.halfWidth}>
                    <FormikInput
                      name="city"
                      placeholder="City"
                      label="City"
                      isRequired
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <FormikInput
                      name="state"
                      placeholder="State/Province"
                      label="State/Province"
                      isRequired
                    />
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.halfWidth}>
                    <FormikInput
                      name="zipCode"
                      placeholder="ZIP/Postal Code"
                      label="ZIP/Postal Code"
                      isRequired
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.halfWidth}>
                    <FormikInput
                      name="country"
                      placeholder="Country"
                      label="Country"
                      isRequired
                    />
                  </View>
                </View>

                <FormikInput
                  name="phoneNumber"
                  placeholder="Phone number"
                  label="Phone Number"
                  isRequired
                  keyboardType="phone-pad"
                />

                <FormikInput
                  name="instructions"
                  placeholder="Delivery instructions (optional)"
                  label="Delivery Instructions"
                  multiline
                  numberOfLines={3}
                />
              </View>

              {/* Default Address Toggle */}
              <View style={styles.section}>
                <TouchableOpacity
                  style={styles.defaultToggle}
                  onPress={() => setIsDefault(!isDefault)}
                  activeOpacity={0.7}>
                  <View style={styles.toggleContent}>
                    <View style={styles.toggleInfo}>
                      <Text style={styles.toggleTitle}>
                        Set as Default Address
                      </Text>
                      <Text style={styles.toggleSubtitle}>
                        This will be used as your primary delivery address
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.toggleSwitch,
                        isDefault && styles.toggleSwitchActive,
                      ]}>
                      <View
                        style={[
                          styles.toggleThumb,
                          isDefault && styles.toggleThumbActive,
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <View style={styles.submitContainer}>
                <ButtonPrimary
                  title="Add Address"
                  onPress={handleSubmit}
                  disabled={!isValid || !dirty}
                />
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddAddressScreen;
