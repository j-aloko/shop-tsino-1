import React from 'react';

import { MuiCheckbox, FormControlLabel } from '../mui-components/MuiComponents';

const CustomCheckbox = ({ input: { value, onChange }, label, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel control={<MuiCheckbox color="secondary" checked={!!value} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} {...rest} />} label={label} />
  );
};

export default CustomCheckbox;
