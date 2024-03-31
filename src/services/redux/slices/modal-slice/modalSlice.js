import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { MODAL_TYPE } from '../../../../constant/modal';

const newsletterModalOpens = process.env.NEXT_PUBLIC_NEWSLETTER_MODAL_OPEN_TIME; // in milliseconds

export const checkNewsletterModal = createAsyncThunk('modal/checkNewsletterModal', async (_, { dispatch }) => {
  const neverShowNewsletterModal = localStorage.getItem('neverShowNewsletterModal');

  if (!neverShowNewsletterModal) {
    await new Promise((resolve) => {
      setTimeout(resolve, +newsletterModalOpens);
    });
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.newsletter }));
  }
});

export const changeNewsletterModalDisplayOption = createAsyncThunk('modal/handleNewsletterModalOption', async () => {
  localStorage.setItem('neverShowNewsletterModal', 'true');
});

const initialState = {
  newsletterModal: false,
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
      } else if (action.payload.type === MODAL_TYPE.newsletter) {
        state.newsletterModal = !state.newsletterModal;
      }
      return state;
    },
  },
});
