import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { fetchData } from '../../../api/apiHandler';

export const getShopInfo = createAsyncThunk('shop/info', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchData('/api/v1/shop/info');
    return data;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

export const getAvailableLanguages = createAsyncThunk('shop/available-languages', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchData('/api/v1/shop/available-languages');
    return data;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

export const getAvailableCountries = createAsyncThunk('shop/available-countries', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchData('/api/v1/shop/available-countries');
    return data;
  } catch (error) {
    return rejectWithValue(error?.message);
  }
});

const initialState = {
  availableCountries: [],
  availableLanguages: [],
  error: false,
  loading: false,
  selectedCountry: {
    isoCode: 'US',
  },
  selectedLanguage: {
    isoCode: 'EN',
  },
  shop: {
    billingAddress: {
      address1: '',
      address2: '',
      city: '',
      company: '',
      id: '',
      phone: '',
    },
    contactEmail: '',
    currencyCode: '',
  },
};

export const shopInfoSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        const { shopInfo } = action.payload;
        if (shopInfo) {
          const { selectedLanguage, selectedCountry } = shopInfo;
          state.selectedLanguage.isoCode = selectedLanguage?.isoCode || 'EN';
          state.selectedCountry.isoCode = selectedCountry?.isoCode || 'US';
        } else {
          state.selectedLanguage.isoCode = 'EN';
          state.selectedCountry.isoCode = 'US';
        }
      })
      .addCase(getShopInfo.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getShopInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload;
        state.error = false;
      })
      .addCase(getShopInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getAvailableLanguages.fulfilled, (state, action) => {
        state.availableLanguages = action.payload.availableLanguages;
      })
      .addCase(getAvailableCountries.fulfilled, (state, action) => {
        state.availableCountries = action.payload.availableCountries.map(({ isoCode: countryIsoCode, currency: { isoCode: currencyIsoCode, symbol } }) => ({
          countryIsoCode,
          currencyIsoCode,
          symbol,
        }));
      });
  },
  initialState,
  name: 'shopInfo',
  reducers: {
    selectCountry: (state, action) => {
      state.selectedCountry.isoCode = action.payload;
    },
    selectLanguage: (state, action) => {
      state.selectedLanguage.isoCode = action.payload;
    },
  },
});
