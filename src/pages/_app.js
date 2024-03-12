import React from 'react';

import { Global } from '@emotion/react';
import { appWithTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';

import nextI18nextConfig from '../../next-i18next.config';
import { CssBaseline } from '../components/mui-components/MuiComponents';
import useRouteChange from '../hooks/useRouteChange';
import Layout from '../layout/Layout';
import { responsiveFontSizes, ThemeProvider } from '../mui-styles/muiStyles';
import { wrapper } from '../services/redux/store/store';
import { globalStyles, bootstrapCarouselStyles } from '../styles/globals';
import { theme } from '../theme/theme';

const ToastContainer = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer), {
  ssr: false,
});
const DataRetriever = dynamic(() => import('../components/utility-components/DataRetriever'), { ssr: false });
const RouteLoadingBar = dynamic(() => import('../components/route-loading-bar/RouteLoadingBar'), { ssr: false });
const ErrorBoundaryContainer = dynamic(() => import('../containers/error-boundary-container/ErrorBoundaryContainer'), { ssr: false });

const _theme = responsiveFontSizes(theme);

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const loading = useRouteChange();

  return (
    <ThemeProvider theme={_theme}>
      <CssBaseline />
      <Global styles={globalStyles(_theme)} />
      <Global styles={bootstrapCarouselStyles(_theme)} />
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={20000} style={{ maxWidth: 450, width: '100%' }} />
        {loading && <RouteLoadingBar />}
        <DataRetriever />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ErrorBoundaryContainer>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </ErrorBoundaryContainer>
      </Provider>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default appWithTranslation(MyApp, nextI18nextConfig);
