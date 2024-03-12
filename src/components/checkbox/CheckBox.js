import React from 'react';

import { MuiCheckbox, FormControl, FormControlLabel } from '../mui-components/MuiComponents';

function CheckBox({ checked, label, labelplacement, name, onCheckBoxChange }) {
  return (
    <FormControl component="fieldset" variant="standard">
      <FormControlLabel control={<MuiCheckbox checked={checked} onChange={onCheckBoxChange} name={name} color="secondary" />} label={label} labelPlacement={labelplacement} />
    </FormControl>
  );
}

export default CheckBox;
