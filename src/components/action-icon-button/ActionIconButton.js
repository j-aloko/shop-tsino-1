import React from 'react';

import { Box, Button } from '../mui-components/MuiComponents';

function ActionIconButton({ IconComponent, name, variant, style }) {
  return (
    <Box>
      <Button variant={variant} startIcon={<IconComponent />} sx={style || {}}>
        {name}
      </Button>
    </Box>
  );
}

export default ActionIconButton;
