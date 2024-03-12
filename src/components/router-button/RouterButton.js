import React from 'react';

import Link from 'next/link';

import { Box, Button } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function RouterButton({ name, path = '/', color = 'primary', size = 'medium', variant = 'contained', fullwidth = false, disabled, onButtonClick }) {
  return (
    <Box>
      <Button variant={variant} disabled={disabled} fullWidth={fullwidth} color={color} size={size} sx={{ borderRadius: 10 }} onClick={onButtonClick}>
        <Link href={path}>
          <Typography text={name} variant="button" color="inherit" />
        </Link>
      </Button>
    </Box>
  );
}

export default RouterButton;
