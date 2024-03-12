import React from 'react';

import { Box, Grid } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function ProductSpecification({ spec, value }) {
  return (
    <Box flexGrow={1}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography text={spec} variant="body1" color="text.secondary" fontWeight={600} />
        </Grid>
        <Grid item xs={6}>
          <Typography text={value} variant="body2" color="text.secondary" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductSpecification;
