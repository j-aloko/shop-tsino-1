'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import UserFeedbackForm from '../../components/user-feedback-form/UserFeedbackForm';
import { selectUser } from '../../services/redux/slices/auth-slice/selectors';
import { submitContactForm } from '../../services/redux/slices/contact-form-slice/contactFormSlice';
import { selectContactFormSubmitLoading } from '../../services/redux/slices/contact-form-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const QuillTextEditor = dynamic(() => import('../../components/quill-editor/QuillEditor'), { ssr: false });

const contactValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
  message: Yup.string().required('Required Field'),
  name: Yup.string().required('Required Field'),
});

const validate = formValidation(contactValidationSchema);

function ContactContainer() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const contactFormSubmitLoading = useSelector(selectContactFormSubmitLoading);

  const { t: translate, ready } = useTranslation('common');

  const contactFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'name',
        label: `${ready ? translate('forms.labels.fullName') : 'Full name'}`,
        placeholder: `${ready ? translate('forms.placeholders.fullName') : 'May I know your full name?'} *`,
      },
      {
        component: TextField,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
      {
        component: QuillTextEditor,
        id: 'message',
        label: `${ready ? translate('forms.labels.message') : 'Message'}`,
        placeholder: `${ready ? translate('forms.placeholders.message') : 'Compose your message here'} *`,
      },
    ],
    [translate, ready]
  );

  const handleContactFormSubmit = useCallback(
    async (values, form) => {
      const { toast } = await import('react-toastify');
      dispatch(submitContactForm({ form, toast, values }));
    },
    [dispatch]
  );

  const contactFormProps = {
    buttonName: `${ready ? translate('buttons.sendMessage') : 'Send message'}`,
    formFields: contactFormFields,
    initialValues: { email: user?.email || '', name: user?.displayName || '' },
    onSubmitForm: handleContactFormSubmit,
    pending: contactFormSubmitLoading,
    validate,
  };

  return (
    <Grid container justifyContent="center" p={2}>
      <Grid item md={7.5} sm={12} p={2}>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography text={ready ? translate('contact.title') : 'Leave us a message'} textAlign="center" variant="h4" color="primary" />
            <Typography text={ready ? translate('contact.subtitle') : "We'd love to hear from you, lets get in touch!"} textAlign="center" variant="body1" color="text.secondary" />
          </Stack>
          <Box display="flex" justifyContent="center">
            <UserFeedbackForm {...contactFormProps} />
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ContactContainer;
