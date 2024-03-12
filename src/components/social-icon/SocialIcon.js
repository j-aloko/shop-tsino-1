import React from 'react';

import Link from 'next/link';

import { Box } from '../mui-components/MuiComponents';

function SocialIcon({ IconComponent, url }) {
  return (
    <Box>
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {IconComponent}
      </Link>
    </Box>
  );
}

export default SocialIcon;
