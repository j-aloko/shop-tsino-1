'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter, useSearchParams } from 'next/navigation';

import { Grid, Stack } from '../../components/mui-components/MuiComponents';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import UserFeedbackForm from '../../components/user-feedback-form/UserFeedbackForm';
import { resetPassword } from '../../services/redux/slices/auth-slice/authSlice';
import { selectPasswordResetLoading } from '../../services/redux/slices/auth-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const resetPasswordValidationSchema = Yup.object({
  confirmPassword: Yup.string()
    .required('Required Field')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  password: Yup.string()
    .required('Required Field')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

const validate = formValidation(resetPasswordValidationSchema);

function ResetPasswordContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const passwordResetLinkLoading = useSelector(selectPasswordResetLoading);

  const { ready, t: translate } = useTranslation('common');

  const resetPasswordFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'password',
        label: `${ready ? translate('forms.labels.password') : 'Password'}`,
        placeholder: `${ready ? translate('forms.placeholders.passwordCreate') : 'Enter your password'} *`,
      },
      {
        component: TextField,
        id: 'confirmPassword',
        label: `${ready ? translate('forms.labels.confirmPassword') : 'Confirm password'}`,
        placeholder: `${ready ? translate('forms.placeholders.confirmPassword') : 'Confirm your password'} *`,
      },
    ],
    [ready, translate]
  );

  const handleResetPassword = useCallback(
    async ({ password }) => {
      const { toast } = await import('react-toastify');

      const { reset_url: encodedUrl } = Object.fromEntries(searchParams);

      const decodedUrl = decodeURIComponent(encodedUrl);
      const urlParts = decodedUrl.split('/');
      const id = `gid://shopify/Customer/${urlParts[urlParts.length - 2]}`;
      const resetToken = urlParts[urlParts.length - 1];

      dispatch(resetPassword({ router, toast, values: { id, password, resetToken } }));
    },
    [dispatch, router, searchParams]
  );

  const resetPasswordFormProps = {
    buttonName: `${ready ? translate('buttons.resetPassword') : 'Reset Password'}`,
    formFields: resetPasswordFormFields,
    isButtonFullwidth: true,
    onSubmitForm: handleResetPassword,
    pending: passwordResetLinkLoading,
    validate,
  };

  return (
    <Grid container justifyContent="center" p={2}>
      <Grid item md={5} sm={6} xs={12} p={2}>
        <Stack spacing={2}>
          <Typography text={ready ? translate('authentication.createPassword.title') : 'Create Your New Password'} textAlign="center" variant="h5" color="text.primary" />
          <Typography
            text={ready ? translate('authentication.createPassword.subtitle') : 'Please enter your new password below to regain access to your account.'}
            textAlign="center"
            variant="body1"
            color="text.secondary"
          />
          <UserFeedbackForm {...resetPasswordFormProps} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ResetPasswordContainer;
