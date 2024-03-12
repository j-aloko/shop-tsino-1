'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import CustomCheckbox from '../../components/custom-checkbox/CustomCheckbox';
import { Avatar, Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import { LockOutlinedIcon } from '../../components/mui-icons/muiIcons';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import UserFeedbackForm from '../../components/user-feedback-form/UserFeedbackForm';
import PATH from '../../constant/paths';
import { signUp } from '../../services/redux/slices/auth-slice/authSlice';
import { selectSignUpLoading } from '../../services/redux/slices/auth-slice/selectors';
import { selectSelectedLanguage } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const signUpValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
  firstName: Yup.string().required('Required Field'),
  lastName: Yup.string().required('Required Field'),
});

const validate = formValidation(signUpValidationSchema);

function SignUpContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const signUpLoading = useSelector(selectSignUpLoading);
  const selectedLanguage = useSelector(selectSelectedLanguage);

  const redirect = searchParams.get('redirect') || '';

  const { ready, t: translate } = useTranslation('common');

  const signUpFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'firstName',
        label: `${ready ? translate('forms.labels.firstName') : 'First Name'}`,
        placeholder: `${ready ? translate('forms.placeholders.firstName') : "What's your first name?"} *`,
      },
      {
        component: TextField,
        id: 'lastName',
        label: `${ready ? translate('forms.labels.lastName') : 'Last Name'}`,
        placeholder: `${ready ? translate('forms.placeholders.lastName') : 'And your last name?'} *`,
      },
      {
        component: TextField,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
      {
        component: CustomCheckbox,
        id: 'acceptsMarketing',
        label: `${ready ? translate('forms.labels.newsletter') : 'Sign me up for exclusive deals, and product updates via email.'}`,
      },
    ],
    [ready, translate]
  );

  const handleSignUp = useCallback(
    async (values) => {
      const { toast } = await import('react-toastify');
      values.language = selectedLanguage;
      values.firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1);
      values.lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1);
      dispatch(signUp({ redirect, router, toast, values }));
    },
    [dispatch, redirect, router, selectedLanguage]
  );

  const signUpFormProps = {
    buttonName: `${ready ? translate('buttons.signup') : 'Sign up'}`,
    formFields: signUpFormFields,
    isButtonFullwidth: true,
    onSubmitForm: handleSignUp,
    pending: signUpLoading,
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
          <Typography text={ready ? translate('authentication.signup.title') : 'Sign up'} textAlign="center" variant="h5" color="primary" />
          <UserFeedbackForm {...signUpFormProps} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={redirect ? `${PATH.login}?redirect=${encodeURIComponent(redirect)}` : PATH.login}>
                <Typography
                  text={ready ? translate('authentication.supplementalLinks.accountExist') : 'Already have an account? Sign in'}
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

export default SignUpContainer;
