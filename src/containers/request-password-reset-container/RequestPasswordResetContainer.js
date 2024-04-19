'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Grid, Stack } from '../../components/mui-components/MuiComponents';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import UserFeedbackForm from '../../components/user-feedback-form/UserFeedbackForm';
import PATH from '../../constant/paths';
import { requestPasswordResetLink } from '../../services/redux/slices/auth-slice/authSlice';
import { selectRequestPasswordResetLinkLoading } from '../../services/redux/slices/auth-slice/selectors';
import { selectSelectedLanguage } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const requestPasswordResetValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
});

const validate = formValidation(requestPasswordResetValidationSchema);

function RequestPasswordResetContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const requestPasswordResetLinkLoading = useSelector(selectRequestPasswordResetLinkLoading);
  const selectedLanguage = useSelector(selectSelectedLanguage);

  const redirect = searchParams.get('redirect') || '';

  const { ready, t: translate } = useTranslation('common');

  const requestPasswordResetFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
    ],
    [ready, translate]
  );

  const handleRequestPasswordReset = useCallback(
    async (values) => {
      const { toast } = await import('react-toastify');
      values.language = selectedLanguage;
      dispatch(requestPasswordResetLink({ redirect, router, toast, values }));
    },
    [dispatch, redirect, router, selectedLanguage]
  );

  const requestPasswordResetFormProps = {
    buttonName: `${ready ? translate('buttons.requestResetLink') : 'Request Reset Link'}`,
    formFields: requestPasswordResetFormFields,
    isButtonFullwidth: true,
    onSubmitForm: handleRequestPasswordReset,
    pending: requestPasswordResetLinkLoading,
    validate,
  };

  return (
    <Grid container justifyContent="center" p={2}>
      <Grid item md={5} sm={6} xs={12} p={2}>
        <Stack spacing={2}>
          <Typography text={ready ? translate('authentication.forgotPassword.title') : 'Forgot Password?'} textAlign="center" variant="h5" color="text.primary" />
          <Typography
            text={
              ready
                ? translate('authentication.forgotPassword.subtitle')
                : 'Enter your email address below and we’ll send you instructions on how to securely create a new password.'
            }
            textAlign="center"
            variant="body1"
            color="text.secondary"
          />
          <UserFeedbackForm {...requestPasswordResetFormProps} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={redirect ? `${PATH.login}?redirect=${encodeURIComponent(redirect)}` : PATH.login}>
                <Typography
                  text={ready ? translate('authentication.supplementalLinks.passwordRembered') : 'Remembered your password? Sign in'}
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

export default RequestPasswordResetContainer;
