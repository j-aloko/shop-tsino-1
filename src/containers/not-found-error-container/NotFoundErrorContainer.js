import React, { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import Error from '../../components/error/Error';
import { Grid } from '../../components/mui-components/MuiComponents';

function NotFoundErrorContainer() {
  const { t: translate, ready } = useTranslation('common');

  const errorProps = useMemo(
    () => ({
      ready,
      status: 404,
      subtitle: ready ? translate('errorDetails.404.subtitle') : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
      title: ready ? translate('errorDetails.404.title') : 'Page Not Found',
      translate,
    }),
    [ready, translate]
  );

  return (
    <Grid container alignItems="center" justifyContent="center" p={2}>
      <Grid item sm={8} lg={6} xs={12}>
        <Error {...errorProps} />
      </Grid>
    </Grid>
  );
}

export default NotFoundErrorContainer;
