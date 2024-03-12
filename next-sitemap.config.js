const PATH = require('./src/constant/paths');

const { signup, checkEmail, accountActivation, login, requestResetPassword, resetPassword, orders, cart } = PATH;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: [signup, checkEmail, accountActivation, login, requestResetPassword, resetPassword, orders, cart],
  generateRobotsTxt: true,
  siteUrl: process.env.SHOPIFY_STORE_DOMAIN,
  sitemapSize: 5000,
};
