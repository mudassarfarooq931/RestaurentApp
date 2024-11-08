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
    .required('Username is required')
    .matches(/^\S*$/, 'Username cannot contain spaces'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^\S*$/, 'Password cannot contain spaces'),
});

const MapSchema = Yup.object().shape({
  city: Yup.string()
    .required('City is required')
    .matches(/^(?!\s*$).+/, 'City cannot contain only spaces'),
  address: Yup.string()
    .required('Address is required')
    .matches(/^(?!\s*$).+/, 'Address cannot contain only spaces'),
});

export {SignupSchema, LoginSchema, MapSchema};
