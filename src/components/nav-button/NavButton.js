import React from 'react';

import { Badge, IconButton } from '../mui-components/MuiComponents';
import Tooltip from '../tooltip/Tooltip';

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

function NavButton({ IconComponent, name, badgeContent, onIconButtonClick }) {
  return (
    <Tooltip title={name} placement="bottom-start">
      <IconButton aria-label={notificationsLabel(badgeContent || 0)} onClick={onIconButtonClick}>
        <Badge badgeContent={badgeContent || 0} color="primary">
          {IconComponent}
        </Badge>
      </IconButton>
    </Tooltip>
  );
}

export default NavButton;
