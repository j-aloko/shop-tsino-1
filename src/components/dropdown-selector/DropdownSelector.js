import React from 'react';

import { Box, FormControl, MenuItem, Select } from '../mui-components/MuiComponents';

function DropdownSelector({ value, onChange, options, style }) {
  return (
    <Box>
      <FormControl size="small">
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={onChange}
          autoWidth
          MenuProps={{ disableScrollLock: true }}
          sx={style || {}}>
          {React.Children.toArray(
            options?.map(({ option, value: optionValue }) => (
              <MenuItem value={optionValue} sx={(theme) => ({ color: theme.palette.text.secondary, ...theme.typography.body2 })}>
                {option}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropdownSelector;
