import React from 'react';

import { Box, MUIAppBar, Toolbar } from '../mui-components/MuiComponents';

function AppBar({ children, color }) {
  return (
    <Box>
      <MUIAppBar position="static" color={color} sx={{ border: '1px solid transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ p: 2 }}>{children}</Toolbar>
      </MUIAppBar>
    </Box>
  );
}

export default AppBar;
