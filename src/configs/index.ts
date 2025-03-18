import env from 'react-native-config';

const config = {
  BASE_URL: env.BASE_URL,
  GOOGLE_WEB_CLIENT_ID: env.GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID: env.GOOGLE_IOS_CLIENT_ID,

  ACCESS_KEY: env.ACCESS_KEY,
  PRODUCTION: env.PRODUCTION === 'true',
};

export default config;
