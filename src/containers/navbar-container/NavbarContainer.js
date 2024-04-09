'use client';

import React, { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import ActionButton from '../../components/action-button/ActionButton';
import AppBar from '../../components/app-bar/AppBar';
import LetterAvatar from '../../components/letter-avatar/LetterAvatar';
import Logo from '../../components/logo/Logo';
import { Box, Badge, IconButton, Menu, MenuItem } from '../../components/mui-components/MuiComponents';
import { MenuIcon, MoreIcon, AddShoppingCartIcon, PersonIcon } from '../../components/mui-icons/muiIcons';
import NavButton from '../../components/nav-button/NavButton';
import { DRAWER_TYPE } from '../../constant/drawer';
import { MODAL_TYPE } from '../../constant/modal';
import PATH from '../../constant/paths';
import { logout } from '../../services/redux/slices/auth-slice/authSlice';
import { selectLogoutLoading, selectUser } from '../../services/redux/slices/auth-slice/selectors';
import { selectCart } from '../../services/redux/slices/cart-slice/selectors';
import { drawerSlice } from '../../services/redux/slices/drawer-slice/drawerSlice';
import { modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { useDispatch, useSelector } from '../../services/redux/store/store';

const SearchBar = dynamic(() => import('../../components/search-bar/SearchBar'), { ssr: false });
const SearchModalContainer = dynamic(() => import('../search-modal-container/SearchModalContainer'), { ssr: false });
const MenuItemsContainer = dynamic(() => import('../menu-items-container/MenuItemsContainer'), { ssr: false });
const DrawerCartItemsContainer = dynamic(() => import('../drawer-cart-items-container/DrawerCartItemsContainer'), { ssr: false });

function NavbarContainer() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const logoutLoading = useSelector(selectLogoutLoading);

  const { ready, t: translate } = useTranslation('common');

  const router = useRouter();
  const pathname = usePathname();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const cartItems = cart?.lineItems || [];

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMobileMenuOpen = useCallback((event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }, []);

  const handleToggleMenuDrawer = useCallback(() => {
    dispatch(drawerSlice.actions.toggleDrawer({ anchor: 'left', type: DRAWER_TYPE.menu }));
  }, [dispatch]);

  const handleToggleCartDrawer = useCallback(() => {
    if (pathname !== PATH.cart) {
      setMobileMoreAnchorEl(null);
      dispatch(drawerSlice.actions.toggleDrawer({ anchor: 'right', type: DRAWER_TYPE.cart }));
    } else {
      router.push(PATH.cart);
    }
  }, [dispatch, pathname, router]);

  const handleToggleSearchModalQuery = useCallback(() => {
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.searchQuery }));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <NavButton
          name="Cart"
          badgeContent={cartItems?.length || 0}
          IconComponent={<AddShoppingCartIcon color="secondary" fontSize="medium" />}
          onIconButtonClick={handleToggleCartDrawer}
        />
      </MenuItem>
      <MenuItem>
        {user ? (
          <ActionButton name={user?.displayName} size="small" color="secondary" variant="text" />
        ) : (
          <Link href={PATH.login}>
            <NavButton name="Account" IconComponent={<PersonIcon color="secondary" fontSize="medium" />} />
          </Link>
        )}
      </MenuItem>
      {user ? (
        <MenuItem>
          <ActionButton
            name={ready ? translate('authentication.logout.title') : 'Logout'}
            size="small"
            color="secondary"
            variant="text"
            pending={logoutLoading}
            onButtonClick={handleLogout}
          />
        </MenuItem>
      ) : null}
    </Menu>
  );

  return (
    <Box>
      <AppBar color="transparent">
        <IconButton size="large" edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }} onClick={handleToggleMenuDrawer}>
          <MenuIcon />
        </IconButton>
        <SearchBar onSearchBarClick={handleToggleSearchModalQuery} />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
          <Logo />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ alignItems: 'center', columnGap: 4, display: { md: 'flex', xs: 'none' } }}>
          {user ? (
            <LetterAvatar userName={user?.displayName} />
          ) : (
            <Link href={PATH.login}>
              <NavButton name="Account" IconComponent={<PersonIcon color="secondary" fontSize="large" />} />
            </Link>
          )}
          <NavButton
            name="Cart"
            badgeContent={cartItems?.length || 0}
            IconComponent={<AddShoppingCartIcon color="secondary" fontSize="large" />}
            onIconButtonClick={handleToggleCartDrawer}
          />
          {user ? (
            <ActionButton
              name={ready ? translate('authentication.logout.title') : 'Logout'}
              size="small"
              color="secondary"
              variant="text"
              pending={logoutLoading}
              onButtonClick={handleLogout}
            />
          ) : null}
        </Box>
        <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
          <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
            <Badge badgeContent={cartItems?.length || 0} color="primary">
              <MoreIcon />
            </Badge>
          </IconButton>
        </Box>
      </AppBar>
      {renderMobileMenu}
      <SearchModalContainer />
      <MenuItemsContainer />
      <DrawerCartItemsContainer />
    </Box>
  );
}

export default NavbarContainer;
