import {ButtonPrimary, PrimaryHeader} from '@components';
import {appEnums, colors, orderEnums, ScreenEnum} from '@constants';
import {HelperService} from '@services';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../../root-navigation';
import {PaymentMethod} from '../../types/custom-types';
import styles from './styles';

const PaymentMethodsScreen: React.FC = () => {
  const helperService = HelperService.getInstance();
  // TODO: Replace with actual payment methods from Redux/API
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: orderEnums.PaymentMethod.CREDIT_CARD,
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: orderEnums.PaymentMethod.CREDIT_CARD,
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
    },
    {
      id: '3',
      type: orderEnums.PaymentMethod.PAYPAL,
      name: 'john.doe@example.com',
      isDefault: false,
    },
    {
      id: '4',
      type: orderEnums.PaymentMethod.EASYPAISA,
      name: '+92 300 1234567',
      isDefault: false,
    },
    {
      id: '5',
      type: orderEnums.PaymentMethod.JAZZCASH,
      name: '+92 321 9876543',
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleDeleteMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };

  const handleAddPaymentMethod = () => {
    navigate(ScreenEnum.AddPaymentMethod);
  };

  const handleEditPaymentMethod = (id: string) => {
    const paymentMethod = paymentMethods.find(method => method.id === id);
    if (paymentMethod) {
      navigate(ScreenEnum.EditPaymentMethod, {paymentMethod});
    }
  };

  const renderPaymentMethod = ({item}: {item: PaymentMethod}) => (
    <View style={styles.paymentMethodItem}>
      <View style={styles.paymentMethodContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={helperService.getPaymentMethodIcon(item.type)}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.methodName}>
            {helperService.getPaymentMethodDisplayName(item)}
          </Text>
          <Text style={styles.methodSubtitle}>
            {helperService.getPaymentMethodSubtitle(item)}
          </Text>
        </View>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditPaymentMethod(item.id)}>
          <MaterialCommunityIcons
            name="pencil"
            size={16}
            color={colors.primary}
          />
          <Text style={styles.actionButtonText}>
            {appEnums.ButtonLabel.EDIT}
          </Text>
        </TouchableOpacity>
        {!item.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefault(item.id)}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.actionButtonText}>
              {appEnums.ButtonLabel.SET_DEFAULT}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteMethod(item.id)}>
          <MaterialCommunityIcons name="delete" size={16} color={colors.red} />
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
            {appEnums.ButtonLabel.DELETE}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons
        name="credit-card-outline"
        size={80}
        color={colors.gray}
      />
      <Text style={styles.emptyTitle}>No Payment Methods</Text>
      <Text style={styles.emptySubtitle}>
        Add a payment method to make ordering easier
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <PrimaryHeader title={appEnums.ScreenTitle.PAYMENT_METHODS} />
      {paymentMethods.length > 0 ? (
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={item => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        renderEmptyState()
      )}
      <View style={styles.addButtonContainer}>
        <ButtonPrimary
          title={appEnums.ButtonLabel.ADD_PAYMENT_METHOD}
          onPress={handleAddPaymentMethod}
        />
      </View>
    </View>
  );
};

export default PaymentMethodsScreen;
