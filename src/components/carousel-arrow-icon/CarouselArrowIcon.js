import React from 'react';

import { Box } from '../mui-components/MuiComponents';

const boxStyles = (theme) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
  alignItems: 'center',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  color: theme.palette.secondary.contrastText,
  display: 'flex',
  height: 30,
  justifyContent: 'center',
  width: 30,
});
const arrowStyles = { fontSize: 'medium', fontWeight: 600 };

function CarouselArrowIcon({ IconComponent }) {
  return (
    <Box sx={boxStyles}>
      <IconComponent sx={arrowStyles} />
    </Box>
  );
}

export default CarouselArrowIcon;
