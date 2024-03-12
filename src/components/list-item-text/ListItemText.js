import React from 'react';

import { List, ListItem, ListItemButton, ListItemIcon, MuiListItemText } from '../mui-components/MuiComponents';

function ListItemText({ text, textStyle, hasIcon = false, IconComponent, eventHandlerArgs = [], onListItemTextClick }) {
  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton sx={{ p: 0 }} onClick={() => (onListItemTextClick ? onListItemTextClick(...eventHandlerArgs) : null)}>
          {hasIcon ? <ListItemIcon>{IconComponent}</ListItemIcon> : null}
          <MuiListItemText primary={text} sx={textStyle} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default ListItemText;
