import React from 'react';

import { MuiBackdrop } from '../mui-components/MuiComponents';

function Backdrop() {
  return <MuiBackdrop sx={{ color: '#fff', overflow: 'hidden', zIndex: (theme) => theme.zIndex.drawer + 1 }} open />;
}

export default Backdrop;
