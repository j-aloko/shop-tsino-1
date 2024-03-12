import { createSlice } from '@reduxjs/toolkit';

import { DRAWER_TYPE } from '../../../../constant/drawer';

const initialState = {
  anchor: 'left',
  cartDrawer: false,
  menuDrawer: false,
  wishlistDrawer: false,
};

export const drawerSlice = createSlice({
  initialState,
  name: 'drawer',
  reducers: {
    toggleDrawer: (state, action) => {
      if (action.payload.type === DRAWER_TYPE.cart) {
        state.cartDrawer = !state.cartDrawer;
        state.anchor = action.payload.anchor;
      } else if (action.payload.type === DRAWER_TYPE.menu) {
        state.menuDrawer = !state.menuDrawer;
        state.anchor = action.payload.anchor;
      } else if (action.payload.type === DRAWER_TYPE.wishlist) {
        state.wishlistDrawer = !state.wishlistDrawer;
        state.anchor = action.payload.anchor;
      }
      return state;
    },
  },
});
