import React from 'react';

import { Avatar } from '../mui-components/MuiComponents';
import Tooltip from '../tooltip/Tooltip';

function stringAvatar(name) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    sx: {
      bgcolor: 'secondary.main',
      color: '#fff',
      fontSize: 18,
    },
  };
}

export default function LetterAvatar({ userName }) {
  return (
    <Tooltip title={userName} placement="bottom">
      <Avatar {...stringAvatar(userName)} />
    </Tooltip>
  );
}
