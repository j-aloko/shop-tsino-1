import React, { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import Error from '../../components/error/Error';
import { Grid } from '../../components/mui-components/MuiComponents';

function ServerErrorContainer() {
  const { t: translate, ready } = useTranslation('common');

  const errorProps = useMemo(
    () => ({
      ready,
      status: 500,
      subtitle: ready ? translate('errorDetails.500.subtitle') : "There's a problem with the server. Please try again later.",
      title: ready ? translate('errorDetails.500.title') : 'Server Error',
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

export default ServerErrorContainer;
