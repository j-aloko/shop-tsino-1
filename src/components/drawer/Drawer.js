import React from 'react';

import Divider from '../divider/Divider';
import { Box, MuiDrawer, IconButton, Stack } from '../mui-components/MuiComponents';
import { CloseIcon } from '../mui-icons/muiIcons';

function Drawer({ children, anchor, open, isModifyingItem = false, onToggleDrawer }) {
  return (
    <MuiDrawer anchor={anchor} open={open} closeAfterTransition disableScrollLock>
      <Stack spacing={1} width={{ xs: 375 }} role="presentation">
        <Box display="flex" justifyContent="flex-end">
          <IconButton aria-label="close" disabled={isModifyingItem} onClick={onToggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider orientation="horizontal" variant="fullWidth" />
        {children}
      </Stack>
    </MuiDrawer>
  );
}

export default Drawer;
