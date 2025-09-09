import {ButtonPrimary, FormikInput, PrimaryHeader} from '@components';
import {colors, ScreenEnum} from '@constants';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavParamList} from '@routes/param-list';
import {HelperService} from '@services';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {AddressSchema} from '../../constants/yup-schema';
import styles from './styles';

type EditAddressRouteProp = RouteProp<MainNavParamList, 'EditAddress'>;

const EditAddressScreen: React.FC = () => {
  const route = useRoute<EditAddressRouteProp>();
  const {address} = route.params;
  const [selectedType, setSelectedType] = useState<'home' | 'work' | 'other'>(
    address.type,
  );
  const [isDefault, setIsDefault] = useState(address.isDefault);
  const helperService = HelperService.getInstance();

  const addressTypes = [
    {key: 'home', label: 'Home', icon: 'home'},
    {key: 'work', label: 'Work', icon: 'briefcase'},
    {key: 'other', label: 'Other', icon: 'map-marker'},
  ] as const;

  const validationSchema = AddressSchema;

  const initialValues = {
    name: address.name,
    address: address.address,
    city: address.city,
    state: address.state,
    zipCode: address.zipCode,
    country: address.country,
    phoneNumber: address.phoneNumber || '',
    instructions: address.instructions || '',
  };

  const handleSubmit = (values: any) => {
    const addressData = {
      ...address,
      ...values,
      type: selectedType,
      isDefault,
    };

    // TODO: Update address in Redux/API
    console.log('Updating address:', addressData);

    Alert.alert('Success', 'Address updated successfully!', [
      {
        text: 'OK',
        onPress: () => {
          navigate(ScreenEnum.Addresses);
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Delete address from Redux/API
            console.log('Deleting address:', address.id);

            Alert.alert('Success', 'Address deleted successfully!', [
              {
                text: 'OK',
                onPress: () => {
                  navigate(ScreenEnum.Addresses);
                },
              },
            ]);
          },
        },
      ],
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'home':
        return 'home';
      case 'work':
        return 'briefcase';
      case 'other':
        return 'map-marker';
      default:
        return 'map-marker';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'home':
        return colors.primary;
      case 'work':
        return colors.primary;
      case 'other':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <PrimaryHeader title="Edit Address" />
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
                        name={type.icon}
                        size={24}
                        color={
                          selectedType === type.key
                            ? colors.white
                            : getTypeColor(type.key)
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

              {/* Action Buttons */}
              <View style={styles.actionContainer}>
                <View style={styles.submitContainer}>
                  <ButtonPrimary
                    title="Update Address"
                    onPress={handleSubmit}
                    disabled={!isValid || !dirty}
                  />
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                  activeOpacity={0.7}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={colors.red}
                  />
                  <Text style={styles.deleteButtonText}>Delete Address</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditAddressScreen;
