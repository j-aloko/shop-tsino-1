import React from 'react';

import { Grid } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function CustomerOrderedProductCostSummary({ title, currency, amount, isTitleBold = false, isAmountBold = false }) {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography text={title} variant="body2" color="text.secondary" fontWeight={isTitleBold ? 600 : null} />
      </Grid>
      <Grid item xs={4} sm={3.6} display="flex" justifyContent="flex-end">
        <Typography text={`${currency}${amount}`} variant="body2" color="text.secondary" fontWeight={isAmountBold ? 600 : null} />
      </Grid>
    </Grid>
  );
}

export default CustomerOrderedProductCostSummary;
