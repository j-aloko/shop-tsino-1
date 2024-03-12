import React from 'react';

import CheckBox from '../checkbox/CheckBox';
import { Stack } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

function AvailabilityFilter({ availability: { inStock, outOfStock }, handleAvailabilityChange }) {
  return (
    <Stack>
      <CheckBox
        checked={inStock}
        onCheckBoxChange={handleAvailabilityChange}
        name="inStock"
        labelplacement="end"
        label={<Typography text="In stock" variant="body2" color="text.seconadry" />}
      />
      <CheckBox
        checked={outOfStock}
        onCheckBoxChange={handleAvailabilityChange}
        name="outOfStock"
        labelplacement="end"
        label={<Typography text="Out of stock" variant="body2" color="text.seconadry" />}
      />
    </Stack>
  );
}

export default AvailabilityFilter;
