import React from 'react';

import Image from '../image/Image';
import { Box, Grid, Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function CustomerOrderProductInfo({ img, title, variantTitle, quantity, amountPerQuantity, amountPerQuantityCurrency, totalPrice, totalPriceCurrency }) {
  return (
    <Grid container alignItems="center" justifyContent={{ sm: 'space-between', xs: 'flex-start' }} rowSpacing={2}>
      <Grid item xs={4.5}>
        <Box display="flex" alignItems="center" flexWrap="wrap" columnGap={2} rowGap={2}>
          <Image
            src={img}
            alt="order item"
            objectFit="contain"
            width={70}
            height={70}
            sizes="(max-width: 600px) 23px,
                   (max-width: 900px) 47px,
                   70px"
          />
          <Stack spacing={0.5}>
            <Typography text={title} variant="body2" color="primary" fontWeight={600} style={{ lineHeight: 1.57 }} />
            <Typography text={variantTitle} variant="body2" color="text.secondary" />
          </Stack>
        </Box>
      </Grid>
      <Grid item sm={5} xs={7.5}>
        <Box display="flex" justifyContent={{ sm: 'space-around', xs: 'flex-end' }} columnGap={2}>
          <Typography text={`${amountPerQuantityCurrency}${amountPerQuantity} x ${quantity}`} variant="body2" color="text.secondary" />
          <Typography text={`${totalPriceCurrency}${totalPrice}`} variant="body2" color="text.secondary" />
        </Box>
      </Grid>
    </Grid>
  );
}

export default CustomerOrderProductInfo;
