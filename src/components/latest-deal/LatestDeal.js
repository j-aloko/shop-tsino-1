import React from 'react';

import Typography from '../typography/Typography';

function LatestDeal({ title }) {
  return <Typography text={title} variant="body1" style={{ fontWeight: 600, textAlign: { sm: 'left', xs: 'center' } }} />;
}

export default LatestDeal;
