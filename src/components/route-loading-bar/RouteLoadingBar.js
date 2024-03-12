'use client';

import React, { useEffect, useState } from 'react';

import { Box, MuiLinearProgress } from '../mui-components/MuiComponents';

export default function RouteLoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ color: 'grey.500', left: 0, position: 'fixed', top: 0, width: '100%', zIndex: 9999 }}>
      <MuiLinearProgress variant="determinate" color="secondary" value={progress} />
    </Box>
  );
}
