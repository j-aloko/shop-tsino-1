import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { MODAL_TYPE } from '../../../../constant/modal';
import { fetchData } from '../../../api/apiHandler';
import { drawerSlice } from '../drawer-slice/drawerSlice';
import { modalSlice } from '../modal-slice/modalSlice';

const apiUrl = '/api/v1/products/cart';

export const retrieveCartItems = createAsyncThunk('cart/get', async ({ action }, { getState, rejectWithValue }) => {
  try {
    const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
    const data = await fetchData(`${apiUrl}?language=${selectedLanguage}`, { action });
    if (data?.userErrors?.length > 0) {
      return null;
    }
    return data;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

export const addToCart = createAsyncThunk('cart/add', async ({ action, payload, toast }, { getState, dispatch, rejectWithValue }) => {
  try {
    const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
    const data = await fetchData(`${apiUrl}?language=${selectedLanguage}`, { action, payload });
    if (data?.userErrors?.length > 0) {
      toast.error(data.userErrors[0].message);
      dispatch(addToCart.rejected());
      return null;
    }
    dispatch(drawerSlice.actions.toggleDrawer({ anchor: 'right', type: 'cart' }));
    return data;
  } catch (error) {
    toast.error(error?.message);
    return rejectWithValue(error?.message);
  }
});

export const buyNow = createAsyncThunk('cart/buyNow', async ({ action, payload, /* router */ toast }, { getState, dispatch, rejectWithValue }) => {
  try {
    const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
    const data = await fetchData(`${apiUrl}?language=${selectedLanguage}`, { action, payload });
    if (data?.userErrors?.length > 0) {
      toast.error(data.userErrors[0].message);
      dispatch(buyNow.rejected());
      return null;
    }
    // router.push(data.checkoutUrl);

    // TODO: Refactor the code to remove the current implementation of the Shopify preview authentication modal display. Subsequently, reimplement the navigation to the checkout page using router.push(data.checkoutUrl).
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.shopifyPreviewAuth }));
    return data;
  } catch (error) {
    toast.error(error?.message);
    return rejectWithValue(error?.message);
  }
});

export const UpdateCartItemQuantity = createAsyncThunk('cartItem/update/quantity', async ({ id, operation, toast }, { getState, dispatch, rejectWithValue }) => {
  try {
    const state = getState();
    const selectedLanguage = state.shopInfo.selectedLanguage.isoCode;
    const existingItem = state.cart.cart.lineItems.find((item) => item.id === id);
    if (existingItem) {
      let newQuantity = operation === 'add' ? existingItem.quantity + 1 : existingItem.quantity - 1;
      newQuantity = Math.max(newQuantity, 1);
      const data = await fetchData(`${apiUrl}?language=${selectedLanguage}`, {
        action: 'update',
        payload: { lineId: id, quantity: newQuantity, variantId: existingItem.merchandise.id },
      });
      if (data?.userErrors?.length > 0) {
        toast.error(data.userErrors[0].message);
        dispatch(UpdateCartItemQuantity.rejected());
        return null;
      }
      return data;
    }
    return null;
  } catch (error) {
    toast.error(error?.message);
    return rejectWithValue(error?.message);
  }
});

export const RemoveCartItem = createAsyncThunk('cartItem/remove', async ({ action, payload, toast }, { getState, dispatch, rejectWithValue }) => {
  try {
    const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
    const data = await fetchData(`${apiUrl}?language=${selectedLanguage}`, { action, payload });
    if (data?.userErrors?.length > 0) {
      toast.error(data.userErrors[0].message);
      dispatch(RemoveCartItem.rejected());
      return null;
    }
    return data;
  } catch (error) {
    toast.error(error?.message);
    return rejectWithValue(error?.message);
  }
});

const updateCartState = (state, action) => {
  if (action?.payload?.id) {
    const {
      id,
      checkoutUrl,
      buyerIdentity,
      lines,
      discountAllocations,
      cost: { subtotalAmount, totalAmount, totalTaxAmount },
      totalQuantity,
    } = action.payload;

    state.cart.id = id;
    state.cart.checkoutUrl = checkoutUrl;
    state.cart.buyerIdentity = buyerIdentity;
    state.cart.lineItems = lines;
    state.cart.discountAllocations = discountAllocations;
    state.cart.subtotalAmount = subtotalAmount;
    state.cart.totalAmount = totalAmount;
    state.cart.totalTaxAmount = totalTaxAmount;
    state.cart.totalQuantity = totalQuantity;
  }
};

const initialState = {
  addStatus: {
    error: false,
    loading: false,
  },
  buyNowStatus: {
    error: false,
    loading: false,
  },
  cart: {
    buyerIdentity: { countryCode: null, customer: null },
    checkoutUrl: '',
    discountAllocations: [],
    id: '',
    lineItems: [],
    subtotalAmount: { amount: '', currencyCode: '' },
    totalAmount: { amount: '', currencyCode: '' },
    totalQuantity: 0,
    totalTaxAmount: { amount: '', currencyCode: '' },
  },
  removeStatus: {
    error: {},
    loading: {},
  },
  retrieveCartStatus: {
    error: false,
    loading: false,
  },
  updateStatus: {
    error: {},
    loading: {},
  },
};

export const cartSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.addStatus.loading = true;
        state.addStatus.error = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addStatus.loading = false;
        updateCartState(state, action);
        state.addStatus.error = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.addStatus.loading = false;
        state.addStatus.error = true;
      })
      .addCase(buyNow.pending, (state) => {
        state.buyNowStatus.loading = true;
        state.buyNowStatus.error = false;
      })
      .addCase(buyNow.fulfilled, (state, action) => {
        state.buyNowStatus.loading = false;
        updateCartState(state, action);
        state.buyNowStatus.error = false;
      })
      .addCase(buyNow.rejected, (state) => {
        state.buyNowStatus.loading = false;
        state.buyNowStatus.error = true;
      })
      .addCase(retrieveCartItems.pending, (state) => {
        state.retrieveCartStatus.loading = true;
        state.retrieveCartStatus.error = false;
      })
      .addCase(retrieveCartItems.fulfilled, (state, action) => {
        state.retrieveCartStatus.loading = false;
        updateCartState(state, action);
        state.retrieveCartStatus.error = false;
      })
      .addCase(retrieveCartItems.rejected, (state) => {
        state.retrieveCartStatus.loading = false;
        state.retrieveCartStatus.error = true;
      })
      .addCase(UpdateCartItemQuantity.pending, (state, action) => {
        state.updateStatus.loading[action.meta.arg.id] = true;
        state.updateStatus.error[action.meta.arg.id] = false;
      })
      .addCase(UpdateCartItemQuantity.fulfilled, (state, action) => {
        delete state.updateStatus.loading[action.meta.arg.id];
        updateCartState(state, action);
        delete state.updateStatus.error[action.meta.arg.id];
      })
      .addCase(UpdateCartItemQuantity.rejected, (state, action) => {
        state.updateStatus.loading[action.meta.arg.id] = false;
        state.updateStatus.error[action.meta.arg.id] = true;
      })
      .addCase(RemoveCartItem.pending, (state, action) => {
        state.removeStatus.loading[action.meta.arg.payload.lineId] = true;
        state.removeStatus.error[action.meta.arg.payload.lineId] = false;
      })
      .addCase(RemoveCartItem.fulfilled, (state, action) => {
        delete state.removeStatus.loading[action.meta.arg.payload.lineId];
        updateCartState(state, action);
        delete state.removeStatus.error[action.meta.arg.payload.lineId];
      })
      .addCase(RemoveCartItem.rejected, (state, action) => {
        state.removeStatus.loading[action.meta.arg.payload.lineId] = false;
        state.removeStatus.error[action.meta.arg.payload.lineId] = true;
      });
  },
  initialState,
  name: 'cart',
});
