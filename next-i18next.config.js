const ChainedBackend = require('i18next-chained-backend').default;
const HttpBackend = require('i18next-http-backend/cjs');
const LocalStorageBackend = require('i18next-localstorage-backend').default;

const isBrowser = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  backend: {
    backendOptions: [{ expirationTime: isDev ? 0 : 60 * 60 * 1000 }, {}],
    backends: isBrowser ? [LocalStorageBackend, HttpBackend] : [],
  },
  debug: isDev,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr'],
  },

  partialBundledLanguages: isBrowser && true,
  serializeConfig: false,
  use: isBrowser ? [ChainedBackend] : [],
};
