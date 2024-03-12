import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchData, handleErrors } from '../../../api/apiHandler';

export const submitContactForm = createAsyncThunk('submit/contact-form', async ({ form, toast, values }, { rejectWithValue }) => {
  try {
    const data = await fetchData('/api/v1/contact', values);
    toast.success('Message delivered successfully');

    Object.keys(values).forEach((key) => {
      form.change(key, undefined);
      form.resetFieldState(key);
    });

    return data;
  } catch (error) {
    return handleErrors(error, toast, 'Message failed to deliver. Something went wrong', rejectWithValue);
  }
});

const initialState = {
  error: false,
  loading: false,
};

export const contactFormSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(submitContactForm.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
  initialState,
  name: 'contactForm',
});
