import React from 'react';

import { Box, MuiRating } from '../mui-components/MuiComponents';

function DisplayRating({ value, precision, size }) {
  return (
    <Box>
      <MuiRating name="half-rating-read" value={value} precision={precision} size={size} readOnly />
    </Box>
  );
}

export default DisplayRating;
