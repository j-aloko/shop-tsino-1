'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Drawer from '../../components/drawer/Drawer';
import ListItemText from '../../components/list-item-text/ListItemText';
import { Stack } from '../../components/mui-components/MuiComponents';
import { AppsIcon, BusinessIcon, HomeIcon, LocalGroceryStoreIcon, SendIcon } from '../../components/mui-icons/muiIcons';
import { DRAWER_TYPE } from '../../constant/drawer';
import PATH from '../../constant/paths';
import { drawerSlice } from '../../services/redux/slices/drawer-slice/drawerSlice';
import { selectAnchor, selectMenuDrawer } from '../../services/redux/slices/drawer-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';

function MenuItemsContainer() {
  const dispatch = useDispatch();
  const menuDrawer = useSelector(selectMenuDrawer);
  const anchor = useSelector(selectAnchor);

  const { t: translate, ready } = useTranslation('common');

  const menuItems = useMemo(
    () => [
      { icon: <HomeIcon />, item: `${ready ? translate('menu.home') : 'Home'}`, path: PATH.home },
      { icon: <AppsIcon />, item: `${ready ? translate('menu.collections') : 'Collections'}`, path: PATH.collections },
      { icon: <LocalGroceryStoreIcon />, item: `${ready ? translate('menu.orders') : 'Orders'}`, path: PATH.orders },
      { icon: <BusinessIcon />, item: `${ready ? translate('menu.aboutUs') : 'About us'}`, path: PATH.about },
      { icon: <SendIcon />, item: `${ready ? translate('menu.contactUs') : 'Contact us'}`, path: PATH.contact },
    ],
    [ready, translate]
  );

  const handleToggleMenuDrawer = useCallback(() => {
    dispatch(drawerSlice.actions.toggleDrawer({ anchor: 'left', type: DRAWER_TYPE.menu }));
  }, [dispatch]);

  return (
    <Drawer anchor={anchor} open={menuDrawer} onToggleDrawer={handleToggleMenuDrawer}>
      <Stack spacing={3} p={2}>
        {React.Children.toArray(
          menuItems?.map(({ item, icon, path }) => (
            <Link href={path}>
              <ListItemText
                text={item}
                hasIcon
                IconComponent={icon}
                textStyle={(theme) => ({ color: theme.palette.text.secondary })}
                onListItemTextClick={handleToggleMenuDrawer}
              />
            </Link>
          ))
        )}
      </Stack>
    </Drawer>
  );
}

export default MenuItemsContainer;
