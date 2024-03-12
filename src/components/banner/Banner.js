import React from 'react';

import Image from '../image/Image';
import { Box } from '../mui-components/MuiComponents';

const src = 'https://m.media-amazon.com/images/S/aplus-media/sc/d63c1039-598c-4929-a5c6-aa16ee4d23ec.__CR0,0,970,600_PT0_SX970_V1___.jpg';

function Banner() {
  return (
    <Box display="flex" justifyContent="center">
      <Box maxWidth="xl" width="100%" p={2}>
        <Image height={{ md: 400, sm: 300, xs: 200 }} src={src} alt="banner" quality={100} objectFit="contain" />
      </Box>
    </Box>
  );
}

export default Banner;
