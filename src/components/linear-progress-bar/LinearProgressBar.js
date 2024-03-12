import * as React from 'react';

import { linearProgressClasses } from '../../mui-classes/muiClasses';
import { styled } from '../../mui-styles/muiStyles';
import { Box, MuiLinearProgress } from '../mui-components/MuiComponents';

const BorderLinearProgress = styled(MuiLinearProgress)(({ theme, value }) => {
  let barColor;

  if (value <= 20) {
    barColor = theme.palette.error.dark;
  } else if (value <= 40) {
    barColor = theme.palette.error.main;
  } else if (value <= 60) {
    barColor = theme.palette.warning.main;
  } else if (value <= 80) {
    barColor = theme.palette.success.light;
  } else {
    barColor = theme.palette.success.main;
  }

  return {
    borderRadius: 5,
    height: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[400],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: barColor,
      borderRadius: 5,
    },
  };
});

export default function LinearProgressBar({ stockQuantityLeft }) {
  return (
    <Box flexGrow={1}>
      <BorderLinearProgress variant="determinate" value={stockQuantityLeft} />
    </Box>
  );
}
