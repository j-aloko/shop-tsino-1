import React from 'react';

import DropdownSelector from '../dropdown-selector/DropdownSelector';
import { Box } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

const dropdownSelectorStyle = (theme) => ({
  '& .MuiSelect-icon': {
    color: 'text.secondary',
  },
  backgroundColor: theme.palette.background.paper,
  color: 'text.secondary',
  ...theme.typography.body2,
});

function ProductSortDropdown({ sortValue, sortOptions, handleSortOrder, translate, ready }) {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" columnGap={2} rowGap={1}>
      <Typography text={ready ? translate('collections.sortBy') : 'Sort By'} variant="body1" color="primary" fontWeight={600} />
      <DropdownSelector value={sortValue} options={sortOptions} onChange={handleSortOrder} style={dropdownSelectorStyle} />
    </Box>
  );
}

export default ProductSortDropdown;
