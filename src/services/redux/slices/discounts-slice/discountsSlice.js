import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData } from '../../../api/apiHandler';

export const getAutomaticDiscountBasic = createAsyncThunk('automatic/discount-basic', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchData('/api/v1/shop/discounts/automatic-basic');
    if (data?.length) {
      return data[0];
    }
    return null;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

const initialState = {
  automaticDiscountBasic: null,
  automaticDiscountBasicStatus: {
    error: false,
    loading: false,
  },
};

export const discountsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getAutomaticDiscountBasic.pending, (state) => {
        state.automaticDiscountBasicStatus.loading = true;
        state.automaticDiscountBasicStatus.error = false;
      })
      .addCase(getAutomaticDiscountBasic.fulfilled, (state, action) => {
        state.automaticDiscountBasicStatus.loading = false;
        state.automaticDiscountBasic = action.payload;
        state.automaticDiscountBasicStatus.error = false;
      })
      .addCase(getAutomaticDiscountBasic.rejected, (state) => {
        state.automaticDiscountBasicStatus.loading = false;
        state.automaticDiscountBasicStatus.error = true;
      });
  },
  initialState,
  name: 'discounts',
});
