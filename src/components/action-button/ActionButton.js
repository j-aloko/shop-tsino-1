import React from 'react';

import { Box, Button, CircularProgress } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function ActionButton({ name, color = 'primary', size = 'medium', variant = 'contained', disabled = false, fullwidth, onButtonClick = null, pending = false }) {
  return (
    <Box>
      <Button variant={variant} disabled={disabled || false} fullWidth={fullwidth || false} color={color} size={size} sx={{ borderRadius: 10 }} onClick={onButtonClick}>
        {pending ? <CircularProgress color="inherit" size={25} /> : <Typography text={name} variant="button" color="inherit" />}
      </Button>
    </Box>
  );
}

export default ActionButton;
