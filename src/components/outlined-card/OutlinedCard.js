import React from 'react';

import { Card, Box } from '../mui-components/MuiComponents';

function OutlinedCard({ children }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{children}</Card>
    </Box>
  );
}

export default OutlinedCard;
