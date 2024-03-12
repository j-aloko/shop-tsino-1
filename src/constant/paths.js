const PATH = {
  about: '/about',
  accountActivation: '/account-activation',
  cart: '/cart',
  checkEmail: '/check-email',
  checkout: '/checkout',
  collections: '/collections',
  contact: '/contact',
  home: '/',
  login: '/login',
  orders: '/orders',
  privacyPolicy: '/privacy-policy',
  products: '/products',
  refundPolicy: '/refund-policy',
  requestResetPassword: '/request-password-reset',
  resetPassword: '/reset-password',
  shippingPolicy: '/shipping-policy',
  signup: '/sign-up',
  termsOfService: '/terms-of-service',
};

module.exports = PATH;

// This line is needed for ES6 default import compatibility
// It allows both `import PATH from './path.js'` and `const PATH = require('./path.js')`
module.exports.default = PATH;
