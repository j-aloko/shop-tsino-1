import React from 'react';

import Typography from '../typography/Typography';

function PreviousPrice({ previousPrice, variant, color }) {
  return <Typography text={previousPrice} variant={variant} color={color} style={{ textDecoration: 'line-through' }} />;
}

export default PreviousPrice;
