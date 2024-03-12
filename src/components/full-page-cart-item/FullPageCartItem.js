import React from 'react';

import Image from '../image/Image';
import { Box, Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function FullPageCartItem({
  cartItem: {
    merchandise: {
      image: { url: selectedVariantImage },
      product: {
        title,
        featuredImage: { url: productFeaturedImage },
      },
      title: variantTitle,
    },
  },
}) {
  return (
    <Box display="flex" columnGap={2} p={2}>
      <Image
        src={selectedVariantImage || productFeaturedImage}
        alt="cart item"
        objectFit="contain"
        height={100}
        width={100}
        sizes="(max-width: 600px) 37px,
               (max-width: 900px) 74px,
               100px"
      />
      <Stack spacing={0.5}>
        <Typography text={title} variant="subtitle1" color="primary" fontWeight={600} style={{ lineHeight: 1.57, whiteSpace: 'normal', wordWrap: 'break-word' }} />
        <Typography text={variantTitle} variant="body2" color="text.secondary" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} />
      </Stack>
    </Box>
  );
}

export default FullPageCartItem;
