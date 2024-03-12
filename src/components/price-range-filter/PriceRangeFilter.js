import React from 'react';

import { Box, Slider } from '../mui-components/MuiComponents';
import Tooltip from '../tooltip/Tooltip';

function ValueLabelComponent(props) {
  const { children, open, value, index } = props;

  return (
    <Tooltip open={open} placement={index === 0 ? 'top-end' : 'bottom-start'} title={value} sx={{ zIndex: 2 }}>
      {children}
    </Tooltip>
  );
}

function valuetext(value, index, currencyCode) {
  if (Array.isArray(value)) {
    return `${currencyCode}${value[index].toFixed(2)}`;
  }
  return `${currencyCode}${value.toFixed(2)}`;
}

function PriceRangeFilter({ priceRange, handlePriceRangeChange, maxPrice, currencyCode }) {
  return (
    <Box>
      <Slider
        getAriaLabel={() => 'Price range'}
        color="secondary"
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="on"
        getAriaValueText={(value, index) => valuetext(value, index, currencyCode)}
        valueLabelFormat={(value, index) => valuetext(value, index, currencyCode)}
        components={{ ValueLabel: ValueLabelComponent }}
        min={5}
        max={maxPrice}
        step={0.01}
      />
    </Box>
  );
}

export default PriceRangeFilter;
