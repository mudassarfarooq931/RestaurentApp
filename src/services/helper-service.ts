// TODO: Replace with actual data generation from API
import {colors, orderEnums} from '@constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearAllAuthStates} from '@redux/slice/auth/auth-slice';
import {clearAllMapState} from '@redux/slice/common/map-slice';
import {setIsConnected} from '@redux/slice/common/net-info-slice';
import {setToastMessage} from '@redux/slice/common/toast-message-slice';
import {DropDownType} from '@redux/states';
import store from '@redux/store';
import {showMessage} from 'react-native-flash-message';
import * as Yup from 'yup';

export class HelperService {
  private static _instance: HelperService;
  private constructor() {}

  public static getInstance = () => {
    if (!HelperService._instance) {
      HelperService._instance = new HelperService();
    }
    return HelperService._instance;
  };

  getParsedData = (data: string) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  };

  handleLogout = async () => {
    const dispatch = store.store.dispatch;
    const {currentUser} = store.store.getState().auth;
    if (currentUser) {
      //   dispatch(
      //     logoutUser({
      //       userId: currentUser?.id ?? '',
      //       token: currentUser?.fireBaseToken ?? '',
      //     }),
      //   );
    } else {
      const temp = await AsyncStorage.getItem('persist:root');
      const authPersist = temp ? this.getParsedData(temp)?.auth : null;
      const _currentUser = this.getParsedData(authPersist)?.currentUser
        ? this.getParsedData(this.getParsedData(authPersist)?.currentUser)
        : null;
      //   dispatch(
      //     logoutUser({
      //       userId: _currentUser?.id ?? '',
      //       token: _currentUser?.fireBaseToken ?? '',
      //     }),
      //   );
    }
  };

  clearAllStates = async () => {
    const dispatch = store.store.dispatch;
    dispatch(clearAllAuthStates());
    dispatch(clearAllMapState());
    dispatch(setToastMessage('Logout Success'));
  };

  getLabel = (val?: string, list?: Array<DropDownType>) => {
    if (val && list && list.length > 0) {
      let label = list.find(v => v.value == val)?.label;
      return label;
    }
    return val ? val : null;
  };

  isNetAvailable = () => {
    const netInfo = store?.store?.getState()?.netInfo?.isConnected;
    const dispatch = store.store.dispatch;
    if (!netInfo) {
      dispatch(setToastMessage('Internet unavailable!'));
      return false;
    } else {
      return true;
    }
  };

  isSchemaValid = async (
    schema: Yup.ObjectSchema<{}, Yup.AnyObject, {}, ''>,
    formData: Object,
  ): Promise<{
    error: boolean;
    data: any;
    msg: string | null;
  }> => {
    return schema
      .validate(formData, {abortEarly: false})
      .then(data => {
        return {error: false, data: data, msg: null};
      })
      .catch(err => {
        return {error: true, data: null, msg: err?.errors[0]};
      });
  };

  showTimedToast = (time: number, message?: string) => {
    const dispatch = store.store.dispatch;
    setTimeout(() => {
      dispatch(setToastMessage(message));
    }, time);
  };

  showNetworkStatus = (isConnected: boolean) => {
    const prevStatus = store.store.getState()?.netInfo.isConnected;
    const dispatch = store.store.dispatch;

    if (prevStatus != isConnected) {
      dispatch(setIsConnected(isConnected));
      if (!isConnected) {
        showMessage({
          type: 'danger',
          icon: 'warning',
          message: 'Internet unavailable!',
          autoHide: false,
          hideOnPress: true,
        });
      } else {
        showMessage({
          type: 'success',
          icon: 'success',
          message: 'Back Online!',
          duration: 2000,
          hideOnPress: true,
        });
      }
    }
  };

  getUserFullName = (firstName: string, lastName: string) => {
    const fullName =
      firstName && lastName
        ? firstName + ' ' + lastName
        : firstName
        ? firstName
        : lastName;

    return fullName;
  };

  // TODO: Replace with actual menu item generation from API
  generateMenuItem = (category?: string) => {
    return {
      id: '1',
      title: 'Sample Item',
      description: 'Sample description',
      price: 10.99,
      image: 'https://via.placeholder.com/800x600',
      category: category || 'General',
      rating: 4.0,
      reviews: 0,
      ingredients: [],
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    };
  };

  // TODO: Replace with actual menu generation from API
  generateFullMenu = (count = 30) => {
    return Array.from({length: count}, () => this.generateMenuItem());
  };

  // Address Helper Functions
  getAddressTypeIcon = (type: string) => {
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

  getAddressTypeColor = (type: string) => {
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

  // Payment Method Helper Functions
  getPaymentMethodIcon = (type: orderEnums.PaymentMethod) => {
    switch (type) {
      case orderEnums.PaymentMethod.CREDIT_CARD:
        return 'credit-card';
      case orderEnums.PaymentMethod.DEBIT_CARD:
        return 'credit-card';
      case orderEnums.PaymentMethod.PAYPAL:
        return 'credit-card-outline';
      case orderEnums.PaymentMethod.APPLE_PAY:
        return 'cellphone';
      case orderEnums.PaymentMethod.GOOGLE_PAY:
        return 'cellphone';
      case orderEnums.PaymentMethod.EASYPAISA:
        return 'cellphone';
      case orderEnums.PaymentMethod.JAZZCASH:
        return 'cellphone';
      case orderEnums.PaymentMethod.CASH:
        return 'cash';
      default:
        return 'credit-card';
    }
  };

  getPaymentMethodColor = (type: orderEnums.PaymentMethod) => {
    switch (type) {
      case orderEnums.PaymentMethod.CREDIT_CARD:
      case orderEnums.PaymentMethod.DEBIT_CARD:
        return colors.primary;
      case orderEnums.PaymentMethod.PAYPAL:
        return '#0070ba';
      case orderEnums.PaymentMethod.APPLE_PAY:
        return '#000000';
      case orderEnums.PaymentMethod.GOOGLE_PAY:
        return '#4285f4';
      case orderEnums.PaymentMethod.EASYPAISA:
        return '#00a651';
      case orderEnums.PaymentMethod.JAZZCASH:
        return '#ff6b35';
      default:
        return colors.primary;
    }
  };

  getPaymentMethodDisplayName = (method: any) => {
    switch (method.type) {
      case orderEnums.PaymentMethod.CREDIT_CARD:
      case orderEnums.PaymentMethod.DEBIT_CARD:
        return `${method.brand} •••• ${method.last4}`;
      case orderEnums.PaymentMethod.PAYPAL:
        return method.name || 'PayPal';
      case orderEnums.PaymentMethod.APPLE_PAY:
        return 'Apple Pay';
      case orderEnums.PaymentMethod.GOOGLE_PAY:
        return 'Google Pay';
      case orderEnums.PaymentMethod.EASYPAISA:
        return method.name || 'EasyPaisa';
      case orderEnums.PaymentMethod.JAZZCASH:
        return method.name || 'JazzCash';
      case orderEnums.PaymentMethod.CASH:
        return 'Cash on Delivery';
      default:
        return 'Unknown Payment Method';
    }
  };

  getPaymentMethodSubtitle = (method: any) => {
    switch (method.type) {
      case orderEnums.PaymentMethod.CREDIT_CARD:
      case orderEnums.PaymentMethod.DEBIT_CARD:
        return `Expires ${method.expiryMonth}/${method.expiryYear}`;
      case orderEnums.PaymentMethod.PAYPAL:
        return 'PayPal Account';
      case orderEnums.PaymentMethod.APPLE_PAY:
        return 'Apple Pay';
      case orderEnums.PaymentMethod.GOOGLE_PAY:
        return 'Google Pay';
      case orderEnums.PaymentMethod.EASYPAISA:
        return 'EasyPaisa Account';
      case orderEnums.PaymentMethod.JAZZCASH:
        return 'JazzCash Account';
      case orderEnums.PaymentMethod.CASH:
        return 'Pay when order arrives';
      default:
        return '';
    }
  };

  // Validation Helper Functions
  validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phoneNumber);
  };

  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validateCreditCardNumber = (cardNumber: string) => {
    // Remove spaces and dashes
    const cleaned = cardNumber.replace(/[\s-]/g, '');
    // Check if it's a valid credit card number (basic validation)
    return /^\d{13,19}$/.test(cleaned);
  };

  formatCreditCardNumber = (cardNumber: string) => {
    // Remove all non-digits
    const cleaned = cardNumber.replace(/\D/g, '');
    // Add spaces every 4 digits
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  formatExpiryDate = (expiryDate: string) => {
    // Remove all non-digits
    const cleaned = expiryDate.replace(/\D/g, '');
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  // String Helper Functions
  capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Date Helper Functions
  formatDate = (date: Date, format: 'short' | 'long' | 'time' = 'short') => {
    let options: Intl.DateTimeFormatOptions;

    switch (format) {
      case 'short':
        options = {year: 'numeric', month: 'short', day: 'numeric'};
        break;
      case 'long':
        options = {year: 'numeric', month: 'long', day: 'numeric'};
        break;
      case 'time':
        options = {hour: '2-digit', minute: '2-digit'};
        break;
      default:
        options = {year: 'numeric', month: 'short', day: 'numeric'};
    }

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return this.formatDate(date, 'short');
  };
}
