/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.shopify.com',
        pathname: '**',
        protocol: 'https',
      },
      {
        hostname: 'm.media-amazon.com',
        pathname: '**',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
};

module.exports = nextConfig;
