import React from 'react';

import { Box, Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function CompanyInfoCard({ IconComponent, title, subtitle }) {
  return (
    <Box display="flex" alignItems="center" columnGap={2}>
      <Box>{IconComponent}</Box>
      <Stack>
        <Typography text={title} variant="h6" color="primary" fontWeight={600} />
        <Typography text={subtitle} variant="body2" color="text.secondary" />
      </Stack>
    </Box>
  );
}

export default CompanyInfoCard;
