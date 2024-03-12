import React from 'react';

import { Html, Head, Main, NextScript } from 'next/document';

import nextI18nextConfig from '../../next-i18next.config';
import { theme } from '../theme/theme';

export default function MyDocument(props) {
  const { __NEXT_DATA__ = {} } = props;
  const { locale } = __NEXT_DATA__;
  const currentLocale = locale || nextI18nextConfig.i18n.defaultLocale;

  return (
    <Html lang={currentLocale}>
      <Head>
        <meta name="theme-color" content={theme.palette.background.paper} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
