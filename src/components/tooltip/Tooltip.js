import React from 'react';

import { tooltipClasses } from '../../mui-classes/muiClasses';
import { styled } from '../../mui-styles/muiStyles';
import { MuiTooltip } from '../mui-components/MuiComponents';

const Tooltip = styled(({ className, ...props }) => <MuiTooltip {...props} arrow classes={{ popper: className }} />)(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default Tooltip;
