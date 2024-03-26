import { createSlice } from '@reduxjs/toolkit';

import { MODAL_TYPE } from '../../../../constant/modal';

const initialState = {
  reviewModal: false,
  searchQueryModal: false,
  shopifyPreviewAuthModal: false,
};

export const modalSlice = createSlice({
  initialState,
  name: 'modal',
  reducers: {
    toggleModal: (state, action) => {
      if (action.payload.type === MODAL_TYPE.review) {
        state.reviewModal = !state.reviewModal;
      } else if (action.payload.type === MODAL_TYPE.searchQuery) {
        state.searchQueryModal = !state.searchQueryModal;
      } else if (action.payload.type === MODAL_TYPE.shopifyPreviewAuth) {
        state.shopifyPreviewAuthModal = !state.shopifyPreviewAuthModal;
      }
      return state;
    },
  },
});
