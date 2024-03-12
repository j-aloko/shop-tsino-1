'use client';

import React from 'react';

import { Box } from '../mui-components/MuiComponents';
import TabsPanel from '../tabs-panel/TabsPanel';

function ProductInformationPanel({ productInfoPanelProps }) {
  return (
    <Box sx={(theme) => ({ border: 1, borderColor: theme.palette.grey[300], borderRadius: 5, p: 2 })}>
      <TabsPanel {...productInfoPanelProps} />
    </Box>
  );
}

export default ProductInformationPanel;
