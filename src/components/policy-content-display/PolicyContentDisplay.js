import React from 'react';

import { Grid, Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function PolicyContentDisplay({ title, content }) {
  return (
    <Grid container justifyContent="center" p={2}>
      <Grid item md={7.5} sm={12}>
        <Stack spacing={4}>
          <Typography text={title} variant="h4" color="primary" />
          <Typography text={content} variant="body2" color="text.secondary" />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default PolicyContentDisplay;
