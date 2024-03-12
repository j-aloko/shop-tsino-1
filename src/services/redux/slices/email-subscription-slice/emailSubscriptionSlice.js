import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData, handleErrors } from '../../../api/apiHandler';

export const subscribe = createAsyncThunk('email/subscription', async ({ form, toast, values }, { rejectWithValue, dispatch }) => {
  try {
    const data = await fetchData('/api/v1/email-subscriptions', values);

    // Check if the subscription was successful
    if (data.customer && data.userErrors.length === 0) {
      toast.success('Email subscribed successfully');
    }
    // Check if the email is already subscribed
    else if (data.userErrors.length > 0) {
      toast.error(data.userErrors[0].message);
      dispatch(subscribe.rejected());
      return null;
    }

    Object.keys(values).forEach((key) => {
      form.change(key, undefined);
      form.resetFieldState(key);
    });

    return data;
  } catch (error) {
    Object.keys(values).forEach((key) => {
      form.change(key, undefined);
      form.resetFieldState(key);
    });

    return handleErrors(error, toast, 'Subscribtion Failed. Something went wrong', rejectWithValue);
  }
});

const initialState = {
  error: false,
  loading: false,
};

export const emailSubscriptionSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(subscribe.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  initialState,
  name: 'emailSubscription',
});
