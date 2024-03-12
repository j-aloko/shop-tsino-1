import React from 'react';

import { Box, Fab } from '../mui-components/MuiComponents';
import Tooltip from '../tooltip/Tooltip';

function ProductColorGroup({ productColors, fabSize, selectedProductColor, onProductColorChange }) {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" rowGap={0.5} columnGap={0.5}>
      {React.Children.toArray(
        productColors.map((color) => (
          <Tooltip title={color} placement="top-start">
            <Box
              display="flex"
              p={0}
              m={0}
              justifyContent="center"
              alignItems="center"
              border={selectedProductColor === color ? `1px solid ${color}` : '1px solid transparent'}
              borderRadius="50%"
              sx={{ '&:hover': { border: `1px solid ${color}` }, height: fabSize ? fabSize + 8 : null, width: fabSize ? fabSize + 8 : null }}>
              <Fab
                sx={{
                  '&:hover': { backgroundColor: color },
                  backgroundColor: color,
                  height: fabSize,
                  minHeight: 15,
                  width: fabSize,
                  zIndex: 2,
                }}
                onClick={() => onProductColorChange(color)}
              />
            </Box>
          </Tooltip>
        ))
      )}
    </Box>
  );
}

export default ProductColorGroup;
