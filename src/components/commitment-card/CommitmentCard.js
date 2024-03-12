import React from 'react';

import { Box, Stack, Grid } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function CommitmentCard({ service: { IconComponent, title, subtitle } }) {
  return (
    <Grid item sm={3} xs={6} p={2}>
      <Stack spacing={1} alignItems="center">
        <Box>{IconComponent}</Box>
        <Typography text={title} textAlign="center" variant="subtitle1" color="text.secondary" fontWeight={600} />
        <Typography text={subtitle} textAlign="center" variant="body2" color="text.secondary" />
      </Stack>
    </Grid>
  );
}

export default CommitmentCard;
