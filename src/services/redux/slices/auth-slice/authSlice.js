import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CHECK_EMAIL_ENUM } from '../../../../constant/checkEmailEnum';
import PATH from '../../../../constant/paths';
import { STOREFRONT_ERRORS } from '../../../../constant/shopify';
import { fetchData, handleErrors } from '../../../api/apiHandler';
import { retrieveCartItems } from '../cart-slice/cartSlice';

export const signUp = createAsyncThunk('customer/signUp', async ({ values, toast, router, redirect }, { rejectWithValue, dispatch }) => {
  try {
    const data = await fetchData('/api/v1/auth/sign-up', values);

    if (data?.userErrors?.length > 0) {
      toast.error(data.userErrors[0].message);
      dispatch(signUp.rejected());
      return null;
    }
    if (data?.customerUserErrors?.length > 0) {
      const firstError = data.customerUserErrors[0];
      if (firstError.code === STOREFRONT_ERRORS.customerDisabled) {
        const { message } = firstError;
        const queryString = new URLSearchParams({
          message: encodeURIComponent(message),
          redirect: encodeURIComponent(redirect || PATH.home),
          type: CHECK_EMAIL_ENUM.signUp,
          values: encodeURIComponent(JSON.stringify(values)),
        }).toString();
        router.push(`${PATH.checkEmail}?${queryString}`);
      } else {
        toast.error(firstError.message);
        dispatch(signUp.rejected());
        return null;
      }
    }

    return null;
  } catch (error) {
    return handleErrors(error, toast, 'Signup Failed. Something went wrong', rejectWithValue);
  }
});

export const login = createAsyncThunk('customer/login', async ({ values, toast, redirect, router }, { getState, dispatch, rejectWithValue }) => {
  try {
    const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
    const data = await fetchData(`/api/v1/auth/login?language=${selectedLanguage}`, values);

    let customer = null;

    if (data?.customerUserErrors?.length > 0) {
      const firstError = data.customerUserErrors[0];
      if (firstError.code === STOREFRONT_ERRORS.customerDisabled) {
        const { message } = firstError;
        const queryString = new URLSearchParams({
          message: encodeURIComponent(message),
          redirect: encodeURIComponent(redirect || PATH.home),
          type: CHECK_EMAIL_ENUM.signUp,
          values: encodeURIComponent(JSON.stringify(values)),
        }).toString();
        router.push(`${PATH.checkEmail}?${queryString}`);
        return null;
      }
      toast.error(firstError.message);
      dispatch(login.rejected());
      return null;
    }

    if (data && !data?.customerUserErrors?.length) {
      customer = data;
      await dispatch(retrieveCartItems({ action: 'get' }));
      router.push(redirect || PATH.home);
    }

    return { customer };
  } catch (error) {
    return handleErrors(error, toast, 'Login Failed. Something went wrong', rejectWithValue);
  }
});

export const resendEmailActivation = createAsyncThunk('customer/resend-email-activation', async ({ values, toast }, { rejectWithValue, dispatch }) => {
  try {
    const data = await fetchData('/api/v1/auth/resend-email-activation', values);

    if (data?.customerUserErrors?.length > 0) {
      const firstError = data.customerUserErrors[0];
      if (firstError.code === STOREFRONT_ERRORS.customerDisabled) {
        toast.success('Success! The activation link has been successfully resent to your email');
      } else {
        toast.error(firstError.message);
        dispatch(resendEmailActivation.rejected());
        return null;
      }
    }

    return null;
  } catch (error) {
    return handleErrors(error, toast, 'Failed to resend email activation link. Something went wrong', rejectWithValue);
  }
});

export const activateAccount = createAsyncThunk('customer/activate-account', async ({ values, toast, router }, { rejectWithValue, dispatch }) => {
  try {
    const data = await fetchData('/api/v1/auth/activate-account', values);

    if (data?.customerUserErrors?.length > 0) {
      const firstError = data.customerUserErrors[0];
      toast.error(firstError.message);
      dispatch(activateAccount.rejected());
      return null;
    }

    if (data.customer && data?.customerUserErrors?.length === 0) {
      toast.success('Account activation successful');
      router.push(PATH.login);
    }

    return null;
  } catch (error) {
    return handleErrors(error, toast, 'Account activation failed. Something went wrong', rejectWithValue);
  }
});

export const logout = createAsyncThunk('customer/logout', async (_, { rejectWithValue }) => {
  try {
    await fetchData('/api/v1/auth/logout');
    return null;
  } catch (error) {
    return rejectWithValue(error.message || 'Logout Failed!');
  }
});

export const requestPasswordResetLink = createAsyncThunk(
  'customer/request-password-reset-link',
  async ({ values, toast, router, redirect, resend = false }, { rejectWithValue, dispatch }) => {
    try {
      const data = await fetchData('/api/v1/auth/request-password-reset-link', values);

      if (data?.customerUserErrors?.length > 0) {
        toast.error(data.customerUserErrors[0].message);
        dispatch(requestPasswordResetLink.rejected());
        return null;
      }
      if (data?.message) {
        if (resend) {
          toast.success('Success! The password reset link has been successfully resent to your email');
        } else {
          const { message } = data;
          const queryString = new URLSearchParams({
            message: encodeURIComponent(message),
            redirect: encodeURIComponent(redirect || PATH.home),
            type: CHECK_EMAIL_ENUM.resetPassword,
            values: encodeURIComponent(JSON.stringify(values)),
          }).toString();
          router.push(`${PATH.checkEmail}?${queryString}`);
        }
      }

      return null;
    } catch (error) {
      const errorMessage = resend ? 'Failed to resend password reset link. Something went wrong' : 'Request Failed. Something went wrong';
      return handleErrors(error, toast, errorMessage, rejectWithValue);
    }
  }
);

export const resetPassword = createAsyncThunk('customer/reset-password', async ({ values, toast, router }, { rejectWithValue, dispatch }) => {
  try {
    const data = await fetchData('/api/v1/auth/reset-password', values);

    if (data?.customerUserErrors?.length > 0) {
      const firstError = data.customerUserErrors[0];
      toast.error(firstError.message);
      dispatch(resetPassword.rejected());
      return null;
    }

    if (data.customer && data?.customerUserErrors?.length === 0) {
      toast.success('Success! Your password has been successfully reset.');
      router.push(PATH.login);
    }

    return null;
  } catch (error) {
    return handleErrors(error, toast, 'Password reset failed. Something went wrong', rejectWithValue);
  }
});

export const getCustomerInfo = createAsyncThunk('customer/info', async ({ router }, { getState, rejectWithValue, dispatch }) => {
  const selectedLanguage = getState().shopInfo.selectedLanguage.isoCode;
  try {
    const data = await fetchData(`/api/v1/auth/customer-info?language=${selectedLanguage}`);
    return data;
  } catch (error) {
    const { message, status } = error;

    if (status === 401 && message === STOREFRONT_ERRORS.tokenExpired) {
      dispatch(logout())
        .then(() => router.push(PATH.login))
        .catch((err) => err);
    }
    return rejectWithValue(message);
  }
});

const initialState = {
  activateAccountStatus: {
    error: false,
    loading: false,
  },
  loginStatus: {
    error: false,
    loading: false,
  },
  logoutStatus: {
    error: false,
    loading: false,
  },
  passwordResetStatus: {
    error: false,
    loading: false,
  },
  requestPasswordResetLinkStatus: {
    error: false,
    loading: false,
  },
  resendEmailActivationStatus: {
    error: false,
    loading: false,
  },
  signUpStatus: {
    error: false,
    loading: false,
  },
  user: null,
};

export const authSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.signUpStatus.loading = true;
        state.signUpStatus.error = false;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpStatus.loading = false;
        state.signUpStatus.error = false;
      })
      .addCase(signUp.rejected, (state) => {
        state.signUpStatus.loading = false;
        state.signUpStatus.error = true;
      })
      .addCase(resendEmailActivation.pending, (state) => {
        state.resendEmailActivationStatus.loading = true;
        state.resendEmailActivationStatus.error = false;
      })
      .addCase(resendEmailActivation.fulfilled, (state) => {
        state.resendEmailActivationStatus.loading = false;
        state.resendEmailActivationStatus.error = false;
      })
      .addCase(resendEmailActivation.rejected, (state) => {
        state.resendEmailActivationStatus.loading = false;
        state.resendEmailActivationStatus.error = true;
      })
      .addCase(activateAccount.pending, (state) => {
        state.activateAccountStatus.loading = true;
        state.activateAccountStatus.error = false;
      })
      .addCase(activateAccount.fulfilled, (state) => {
        state.activateAccountStatus.loading = false;
        state.activateAccountStatus.error = false;
      })
      .addCase(activateAccount.rejected, (state) => {
        state.activateAccountStatus.loading = false;
        state.activateAccountStatus.error = true;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus.loading = true;
        state.loginStatus.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus.loading = false;
        if (action.payload !== null) {
          const { customer } = action.payload;
          state.user = customer;
          state.loginStatus.error = false;
        } else {
          state.loginStatus.error = true;
        }
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus.loading = false;
        state.loginStatus.error = true;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus.loading = true;
        state.logoutStatus.error = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutStatus.loading = false;
        state.user = null;
        state.logoutStatus.error = false;
      })
      .addCase(logout.rejected, (state) => {
        state.logoutStatus.loading = false;
        state.logoutStatus.error = true;
      })
      .addCase(requestPasswordResetLink.pending, (state) => {
        state.requestPasswordResetLinkStatus.loading = true;
        state.requestPasswordResetLinkStatus.error = false;
      })
      .addCase(requestPasswordResetLink.fulfilled, (state) => {
        state.requestPasswordResetLinkStatus.loading = false;
        state.requestPasswordResetLinkStatus.error = false;
      })
      .addCase(requestPasswordResetLink.rejected, (state) => {
        state.requestPasswordResetLinkStatus.loading = false;
        state.requestPasswordResetLinkStatus.error = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.passwordResetStatus.loading = true;
        state.passwordResetStatus.error = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordResetStatus.loading = false;
        state.passwordResetStatus.error = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.passwordResetStatus.loading = false;
        state.passwordResetStatus.error = true;
      })
      .addCase(getCustomerInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
  initialState,
  name: 'auth',
});
