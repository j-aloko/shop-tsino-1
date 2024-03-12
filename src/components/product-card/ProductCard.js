import React from 'react';

import Link from 'next/link';

import PATH from '../../constant/paths';
import { getAverageRating } from '../../utils/getAverageRating';
import DisplayRating from '../display-rating/DisplayRating';
import Image from '../image/Image';
import { Box, Grid } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function ProductCard({ handle, featuredImage: { url }, title, metafields }) {
  const averageRating = getAverageRating(metafields);

  return (
    <Box sx={{ cursor: 'pointer' }}>
      <Grid container>
        <Grid item xs={12} p={0.5} display="flex" justifyContent="center">
          <Link href={`${PATH.products}/${handle}`} style={{ width: '100%' }}>
            <Image
              height={140}
              src={url}
              alt={title}
              objectFit="contain"
              sizes="(max-width: 600px) 76px,
                     (max-width: 900px) 152px,
                     228px"
            />
          </Link>
        </Grid>
        <Grid item xs={12} p={0.5} display="flex" justifyContent="center">
          <Link href={`${PATH.products}/${handle}`}>
            <DisplayRating value={averageRating} precision={0.5} size="small" />
          </Link>
        </Grid>
        <Grid item xs={12} p={0.5} display="flex" justifyContent="center">
          <Link href={`${PATH.products}/${handle}`}>
            <Typography text={title} textAlign="center" variant="subtitle2" color="text.secondary" />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductCard;
