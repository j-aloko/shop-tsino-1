const PATH = require('./src/constant/paths');

const { signup, checkEmail, accountActivation, login, requestResetPassword, resetPassword, orders, cart, contact } = PATH;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: [signup, checkEmail, accountActivation, login, requestResetPassword, resetPassword, orders, cart, contact],
  generateRobotsTxt: true,
  siteUrl: process.env.HOST,
  sitemapSize: 5000,
};
