import * as Yup from 'yup';
import {PaymentMethod} from './order-enums';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^\S*$/, 'Email cannot contain spaces'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^\S*$/, 'Password cannot contain spaces'),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^\S*$/, 'Email cannot contain spaces'),
  username: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^\S*$/, 'Password cannot contain spaces'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^\S*$/, 'Email cannot contain spaces'),
});

const MapSchema = Yup.object().shape({
  city: Yup.string()
    .required('City is required')
    .matches(/^(?!\s*$).+/, 'City cannot contain only spaces'),
  address: Yup.string()
    .required('Address is required')
    .matches(/^(?!\s*$).+/, 'Address cannot contain only spaces'),
});

// Address validation schema
const AddressSchema = Yup.object().shape({
  name: Yup.string()
    .required('Address name is required')
    .min(2, 'Address name must be at least 2 characters'),
  address: Yup.string()
    .required('Street address is required')
    .min(5, 'Please enter a valid address'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'Please enter a valid city'),
  state: Yup.string()
    .required('State/Province is required')
    .min(2, 'Please enter a valid state'),
  zipCode: Yup.string()
    .required('ZIP/Postal code is required')
    .min(3, 'Please enter a valid ZIP code'),
  country: Yup.string()
    .required('Country is required')
    .min(2, 'Please enter a valid country'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  instructions: Yup.string().max(
    200,
    'Instructions must be less than 200 characters',
  ),
});

// Edit profile validation schema
const EditProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format')
    .matches(/^\S*$/, 'Email cannot contain spaces'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits'),
  bio: Yup.string().max(150, 'Bio must be less than 150 characters').nullable(),
});

// Payment method validation schema factory
const getPaymentMethodValidationSchema = (paymentType: PaymentMethod) => {
  const baseSchema = {
    isDefault: Yup.boolean(),
  };

  switch (paymentType) {
    case PaymentMethod.CREDIT_CARD:
    case PaymentMethod.DEBIT_CARD:
      return Yup.object().shape({
        ...baseSchema,
        cardNumber: Yup.string()
          .required('Card number is required')
          .matches(/^\d{16}$/, 'Please enter a valid 16-digit card number'),
        expiryMonth: Yup.string()
          .required('Expiry month is required')
          .matches(/^(0[1-9]|1[0-2])$/, 'Please enter a valid month (01-12)'),
        expiryYear: Yup.string()
          .required('Expiry year is required')
          .matches(/^\d{4}$/, 'Please enter a valid 4-digit year'),
        cvv: Yup.string()
          .required('CVV is required')
          .matches(/^\d{3,4}$/, 'Please enter a valid CVV'),
        cardholderName: Yup.string()
          .required('Cardholder name is required')
          .min(2, 'Please enter a valid name'),
      });

    case PaymentMethod.PAYPAL:
      return Yup.object().shape({
        ...baseSchema,
        email: Yup.string()
          .required('PayPal email is required')
          .email('Please enter a valid email address'),
      });

    case PaymentMethod.EASYPAISA:
    case PaymentMethod.JAZZCASH:
      return Yup.object().shape({
        ...baseSchema,
        phoneNumber: Yup.string()
          .required('Phone number is required')
          .matches(
            /^[\+]?[1-9][\d]{0,15}$/,
            'Please enter a valid phone number',
          ),
      });

    case PaymentMethod.APPLE_PAY:
    case PaymentMethod.GOOGLE_PAY:
      return Yup.object().shape({
        ...baseSchema,
      });

    default:
      return Yup.object().shape(baseSchema);
  }
};

export {
  AddressSchema,
  EditProfileSchema,
  ForgotPasswordSchema,
  getPaymentMethodValidationSchema,
  LoginSchema,
  MapSchema,
  SignupSchema,
};
