'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Avatar, Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import { LockOutlinedIcon } from '../../components/mui-icons/muiIcons';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import UserFeedbackForm from '../../components/user-feedback-form/UserFeedbackForm';
import PATH from '../../constant/paths';
import { login } from '../../services/redux/slices/auth-slice/authSlice';
import { selectLoginLoading } from '../../services/redux/slices/auth-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
  password: Yup.string().required('Required Field'),
});

const validate = formValidation(loginValidationSchema);

function LoginContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const loginLoading = useSelector(selectLoginLoading);
  const redirect = searchParams.get('redirect') || '';

  const { ready, t: translate } = useTranslation('common');

  const loginFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
      {
        component: TextField,
        id: 'password',
        label: `${ready ? translate('forms.labels.password') : 'Password'}`,
        placeholder: `${ready ? translate('forms.placeholders.passwordAuthenticate') : 'Enter your password'} *`,
      },
    ],
    [ready, translate]
  );

  const handleLogin = useCallback(
    async (values) => {
      const { toast } = await import('react-toastify');
      dispatch(login({ redirect, router, toast, values }));
    },
    [dispatch, redirect, router]
  );

  const loginFormProps = {
    buttonName: `${ready ? translate('buttons.login') : 'Login'}`,
    formFields: loginFormFields,
    isButtonFullwidth: true,
    onSubmitForm: handleLogin,
    pending: loginLoading,
    validate,
  };

  return (
    <Grid container justifyContent="center" p={2}>
      <Grid item md={5} sm={6} xs={12} p={2}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="center">
            <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>
          <Typography text={ready ? translate('authentication.login.title') : 'Sign in'} textAlign="center" variant="h5" color="text.primary" />
          <UserFeedbackForm {...loginFormProps} />
          <Grid container rowSpacing={1}>
            <Grid item xs>
              <Link href={redirect ? `${PATH.requestResetPassword}?redirect=${encodeURIComponent(redirect)}` : PATH.requestResetPassword}>
                <Typography
                  text={ready ? translate('authentication.supplementalLinks.forgotPassword') : 'Forgot password?'}
                  variant="body2"
                  color="secondary"
                  style={{ textDecoration: 'underline' }}
                />
              </Link>
            </Grid>
            <Grid item>
              <Link href={redirect ? `${PATH.signup}?redirect=${encodeURIComponent(redirect)}` : PATH.signup}>
                <Typography
                  text={ready ? translate('authentication.supplementalLinks.noAccount') : "Don't have an account? Sign Up"}
                  variant="body2"
                  color="secondary"
                  style={{ textDecoration: 'underline' }}
                />
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default LoginContainer;
