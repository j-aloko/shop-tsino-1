import React from 'react';

import { MuiCheckbox, FormControlLabel } from '../mui-components/MuiComponents';
import Typography from '../typography/Typography';

const CustomCheckbox = ({ input: { value, onChange }, label, labelStyle = null, onHideNewsletter, ...rest }) => {
  const handleChange = (event) => {
    onChange(event.target.checked);
    if (onHideNewsletter) {
      onHideNewsletter(event.target.checked);
    }
  };

  return (
    <FormControlLabel
      control={<MuiCheckbox color="secondary" checked={!!value} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} {...rest} />}
      label={<Typography text={label} variant="subtitle1" color="text.secondary" style={labelStyle} />}
    />
  );
};

export default CustomCheckbox;
