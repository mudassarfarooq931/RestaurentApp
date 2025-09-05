import * as Yup from 'yup';

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

export {ForgotPasswordSchema, LoginSchema, MapSchema, SignupSchema};
