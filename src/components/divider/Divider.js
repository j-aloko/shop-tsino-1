import React from 'react';

import { MuiDivider } from '../mui-components/MuiComponents';

function Divider({ color, orientation, variant, height, width }) {
  return (
    <MuiDivider
      orientation={orientation}
      variant={variant}
      flexItem={orientation === 'vertical' ? true : null}
      sx={{ backgroundColor: color || null, height: height || null, opacity: 1, width: width || null }}
    />
  );
}

export default Divider;
