import React from 'react';

import Typography from '../typography/Typography';

function ActualPrice({ actualPrice, variant, color }) {
  return <Typography text={actualPrice} variant={variant} color={color} />;
}

export default ActualPrice;
