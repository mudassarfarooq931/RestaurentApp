import {ButtonPrimary, FormikInput, PrimaryHeader} from '@components';
import {colors, orderEnums, ScreenEnum} from '@constants';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainNavParamList} from '@routes/param-list';
import {HelperService} from '@services';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {getPaymentMethodValidationSchema} from '../../constants/yup-schema';
import {PaymentMethodFormData} from '../../types/custom-types';
import styles from './styles';

type EditPaymentMethodRouteProp = RouteProp<
  MainNavParamList,
  'EditPaymentMethod'
>;

const EditPaymentMethodScreen: React.FC = () => {
  const route = useRoute<EditPaymentMethodRouteProp>();
  const {paymentMethod} = route.params;
  const [selectedType, setSelectedType] = useState<orderEnums.PaymentMethod>(
    paymentMethod.type,
  );
  const [isDefault, setIsDefault] = useState(paymentMethod.isDefault);
  const helperService = HelperService.getInstance();

  const paymentTypes = [
    {
      key: orderEnums.PaymentMethod.CREDIT_CARD,
      label: 'Credit Card',
      icon: 'credit-card',
    },
    {
      key: orderEnums.PaymentMethod.DEBIT_CARD,
      label: 'Debit Card',
      icon: 'credit-card',
    },
    {
      key: orderEnums.PaymentMethod.PAYPAL,
      label: 'PayPal',
      icon: 'credit-card-outline',
    },
    {
      key: orderEnums.PaymentMethod.APPLE_PAY,
      label: 'Apple Pay',
      icon: 'cellphone',
    },
    {
      key: orderEnums.PaymentMethod.GOOGLE_PAY,
      label: 'Google Pay',
      icon: 'cellphone',
    },
    {
      key: orderEnums.PaymentMethod.EASYPAISA,
      label: 'EasyPaisa',
      icon: 'cellphone',
    },
    {
      key: orderEnums.PaymentMethod.JAZZCASH,
      label: 'JazzCash',
      icon: 'cellphone',
    },
  ] as const;

  const getValidationSchema = () => {
    return getPaymentMethodValidationSchema(selectedType);
  };

  const getInitialValues = (): PaymentMethodFormData => {
    const baseValues = {
      type: paymentMethod.type,
      isDefault: paymentMethod.isDefault,
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      email: '',
      phoneNumber: '',
    };

    switch (paymentMethod.type) {
      case orderEnums.PaymentMethod.CREDIT_CARD:
      case orderEnums.PaymentMethod.DEBIT_CARD:
        return {
          ...baseValues,
          cardNumber: `**** **** **** ${paymentMethod.last4 || ''}`,
          expiryMonth:
            paymentMethod.expiryMonth?.toString().padStart(2, '0') || '',
          expiryYear: paymentMethod.expiryYear?.toString() || '',
          cardholderName: 'John Doe', // This would come from the API
        };
      case orderEnums.PaymentMethod.PAYPAL:
        return {
          ...baseValues,
          email: paymentMethod.email || paymentMethod.name || '',
        };
      case orderEnums.PaymentMethod.EASYPAISA:
      case orderEnums.PaymentMethod.JAZZCASH:
        return {
          ...baseValues,
          phoneNumber: paymentMethod.phoneNumber || paymentMethod.name || '',
        };
      default:
        return baseValues;
    }
  };

  const handleSubmit = (values: PaymentMethodFormData) => {
    const paymentData = {
      ...paymentMethod,
      ...values,
      type: selectedType,
      isDefault,
    };

    // TODO: Update payment method in Redux/API
    console.log('Updating payment method:', paymentData);

    Alert.alert('Success', 'Payment method updated successfully!', [
      {
        text: 'OK',
        onPress: () => {
          navigate(ScreenEnum.PaymentMethods);
        },
      },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Delete payment method from Redux/API
            console.log('Deleting payment method:', paymentMethod.id);

            Alert.alert('Success', 'Payment method deleted successfully!', [
              {
                text: 'OK',
                onPress: () => {
                  navigate(ScreenEnum.PaymentMethods);
                },
              },
            ]);
          },
        },
      ],
    );
  };

  const renderPaymentTypeSelection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method Type</Text>
      <View style={styles.typeContainer}>
        {paymentTypes.map(type => (
          <TouchableOpacity
            key={type.key}
            style={[
              styles.typeButton,
              selectedType === type.key && styles.selectedTypeButton,
            ]}
            onPress={() => setSelectedType(type.key)}
            activeOpacity={0.7}>
            <MaterialCommunityIcons
              name={helperService.getPaymentMethodIcon(type.key)}
              size={24}
              color={
                selectedType === type.key
                  ? colors.white
                  : helperService.getPaymentMethodColor(type.key)
              }
            />
            <Text
              style={[
                styles.typeButtonText,
                selectedType === type.key && styles.selectedTypeButtonText,
              ]}>
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCardForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Card Details</Text>

      <FormikInput
        name="cardNumber"
        placeholder="1234 5678 9012 3456"
        label="Card Number"
        isRequired
        keyboardType="numeric"
        maxLength={16}
      />

      <FormikInput
        name="cardholderName"
        placeholder="John Doe"
        label="Cardholder Name"
        isRequired
      />

      <View style={styles.row}>
        <View style={styles.thirdWidth}>
          <FormikInput
            name="expiryMonth"
            placeholder="MM"
            label="Month"
            isRequired
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View style={styles.thirdWidth}>
          <FormikInput
            name="expiryYear"
            placeholder="YYYY"
            label="Year"
            isRequired
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View style={styles.thirdWidth}>
          <FormikInput
            name="cvv"
            placeholder="123"
            label="CVV"
            isRequired
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
      </View>
    </View>
  );

  const renderPayPalForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>PayPal Account</Text>

      <FormikInput
        name="email"
        placeholder="your.email@example.com"
        label="PayPal Email"
        isRequired
        keyboardType="email-address"
      />
    </View>
  );

  const renderMobileWalletForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {selectedType === orderEnums.PaymentMethod.EASYPAISA
          ? 'EasyPaisa Account'
          : 'JazzCash Account'}
      </Text>

      <FormikInput
        name="phoneNumber"
        placeholder="+92 300 1234567"
        label="Phone Number"
        isRequired
        keyboardType="phone-pad"
      />
    </View>
  );

  const renderDigitalWalletForm = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        {selectedType === orderEnums.PaymentMethod.APPLE_PAY
          ? 'Apple Pay'
          : 'Google Pay'}
      </Text>

      <View style={styles.digitalWalletInfo}>
        <MaterialCommunityIcons
          name={helperService.getPaymentMethodIcon(selectedType)}
          size={48}
          color={helperService.getPaymentMethodColor(selectedType)}
        />
        <Text style={styles.digitalWalletText}>
          {selectedType === orderEnums.PaymentMethod.APPLE_PAY
            ? 'Apple Pay is already set up and ready to use.'
            : 'Google Pay is already set up and ready to use.'}
        </Text>
      </View>
    </View>
  );

  const renderPaymentForm = () => {
    switch (selectedType) {
      case orderEnums.PaymentMethod.CREDIT_CARD:
      case orderEnums.PaymentMethod.DEBIT_CARD:
        return renderCardForm();
      case orderEnums.PaymentMethod.PAYPAL:
        return renderPayPalForm();
      case orderEnums.PaymentMethod.EASYPAISA:
      case orderEnums.PaymentMethod.JAZZCASH:
        return renderMobileWalletForm();
      case orderEnums.PaymentMethod.APPLE_PAY:
      case orderEnums.PaymentMethod.GOOGLE_PAY:
        return renderDigitalWalletForm();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <PrimaryHeader title="Edit Payment Method" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={getInitialValues()}
          validationSchema={getValidationSchema()}
          onSubmit={handleSubmit}>
          {({handleSubmit, isValid, dirty}) => (
            <>
              {renderPaymentTypeSelection()}
              {renderPaymentForm()}

              {/* Default Payment Method Toggle */}
              <View style={styles.section}>
                <TouchableOpacity
                  style={styles.defaultToggle}
                  onPress={() => setIsDefault(!isDefault)}
                  activeOpacity={0.7}>
                  <View style={styles.toggleContent}>
                    <View style={styles.toggleInfo}>
                      <Text style={styles.toggleTitle}>
                        Set as Default Payment Method
                      </Text>
                      <Text style={styles.toggleSubtitle}>
                        This will be used as your primary payment method
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
                    title="Update Payment Method"
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
                  <Text style={styles.deleteButtonText}>
                    Delete Payment Method
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default EditPaymentMethodScreen;
