import React from 'react';

import NextImage from 'next/image';

import { Box } from '../mui-components/MuiComponents';

function Image({ height, width, src, alt, quality = 70, objectFit = 'contain', priority = false, sizes = '' }) {
  return (
    <Box
      sx={{
        border: 'none',
        boxShadow: 0,
        height,
        position: 'relative',
        width: width || '100%',
      }}>
      <NextImage src={src} alt={alt} style={{ objectFit }} fill sizes={sizes} placeholder="blur" blurDataURL={src} quality={quality || null} priority={priority} />
    </Box>
  );
}

export default Image;
