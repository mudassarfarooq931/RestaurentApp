import env from 'react-native-config';

const config = {
  BASE_URL: env.BASE_URL,

  ACCESS_KEY: env.ACCESS_KEY,
  PRODUCTION: env.PRODUCTION === 'true',
};

export default config;
