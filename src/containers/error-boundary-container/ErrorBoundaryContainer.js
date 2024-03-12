'use client';

import React, { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import Error from '../../components/error/Error';
import { Grid } from '../../components/mui-components/MuiComponents';

function TranslatedError() {
  const { t: translate, ready } = useTranslation('common');

  const errorProps = useMemo(
    () => ({
      ready,
      status: ready ? translate('errorDetails.clientError.status') : 'Bad Request',
      subtitle: ready ? translate('errorDetails.clientError.subtitle') : 'There was an error with your request. Please try again later.',
      title: ready ? translate('errorDetails.clientError.title') : 'Client Error',
      translate,
    }),
    [ready, translate]
  );

  return <Error {...errorProps} />;
}

class ErrorBoundaryContainer extends React.Component {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Grid container alignItems="center" justifyContent="center" p={2}>
          <Grid item sm={8} lg={6} xs={12}>
            <TranslatedError />
          </Grid>
        </Grid>
      );
    }

    return children;
  }
}

export default ErrorBoundaryContainer;
