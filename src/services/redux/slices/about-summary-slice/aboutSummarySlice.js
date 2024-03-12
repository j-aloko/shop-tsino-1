import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData } from '../../../api/apiHandler';

export const getAboutSummary = createAsyncThunk('about/summary', async (_, { getState, rejectWithValue }) => {
  try {
    const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
    const data = await fetchData(`/api/v1/pages?page=about&language=${selectedLanguage}`);
    return data;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

const initialState = {
  error: false,
  loading: false,
  summary: '',
};

export const aboutSummarySlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getAboutSummary.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAboutSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.bodySummary;
        state.error = false;
      })
      .addCase(getAboutSummary.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  initialState,
  name: 'aboutSummary',
});
