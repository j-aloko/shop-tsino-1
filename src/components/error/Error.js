import React from 'react';

import { Stack } from '../mui-components/MuiComponents';
import RouterButton from '../router-button/RouterButton';
import Typography from '../typography/Typography';

function Error({ status, title, subtitle, translate, ready }) {
  return (
    <Stack spacing={2}>
      {status ? <Typography text={status} variant="h2" color="primary" /> : null}
      <Stack spacing={1.5}>
        <Typography text={title} variant="h1" color="primary" />
        <Typography text={subtitle} variant="subtitle1" color="primary" />
        <RouterButton name={ready ? translate('buttons.goToHomepage') : 'Go To Homepage'} color="secondary" />
      </Stack>
    </Stack>
  );
}

export default Error;
