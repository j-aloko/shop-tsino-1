import React from 'react';

import Link from 'next/link';

import PATH from '../../constant/paths';
import Image from '../image/Image';
import { Box, Grid, Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function SearchResultCard({ handle, featuredImage: { url }, title, productType, onClickSearchResultCard }) {
  return (
    <Box maxWidth={{ sm: 350, xs: 'xs' }} width="100%" onClick={onClickSearchResultCard}>
      <Grid container>
        <Grid item xs={3} p={0.5}>
          <Link href={`${PATH.products}/${handle}`} style={{ width: '100%' }}>
            <Image height={60} src={url} alt={title} objectFit="contain" />
          </Link>
        </Grid>
        <Grid item xs={6} p={0.5}>
          <Link href={`${PATH.products}/${handle}`}>
            <Stack spacing={1}>
              <Typography text={productType || ''} textAlign="left" variant="subtitle2" color="text.secondary" style={{ opacity: 0.8 }} />
              <Typography text={title} textAlign="left" variant="subtitle2" color="text.secondary" />
            </Stack>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SearchResultCard;
