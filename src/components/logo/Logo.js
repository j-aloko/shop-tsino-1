import React from 'react';

import Link from 'next/link';

import PATH from '../../constant/paths';
import { Box } from '../mui-components/MuiComponents';
import { CircleIcon } from '../mui-icons/muiIcons';
import Typography from '../typography/Typography';

function Logo() {
  return (
    <Link href={PATH.home}>
      <Box display="flex" columnGap={0.5}>
        <Typography text="ShopTsino" variant="logo" color="text.primary" />
        <CircleIcon color="secondary" sx={{ alignSelf: 'flex-end', height: 12, width: 12 }} />
      </Box>
    </Link>
  );
}

export default Logo;
