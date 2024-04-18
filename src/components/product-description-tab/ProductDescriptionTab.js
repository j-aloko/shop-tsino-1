import React from 'react';

import Typography from '../typography/Typography';

function ProductDescriptionTab({ productDescription }) {
  return <Typography text={productDescription} variant="body1" color="text.secondary" />;
}

export default ProductDescriptionTab;
