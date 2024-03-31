'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import CustomCheckbox from '../../components/custom-checkbox/CustomCheckbox';
import Modal from '../../components/modal/Modal';
import { Box, Stack } from '../../components/mui-components/MuiComponents';
import NewsLetter from '../../components/newsletter/NewsLetter';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import { MODAL_TYPE } from '../../constant/modal';
import { subscribe } from '../../services/redux/slices/email-subscription-slice/emailSubscriptionSlice';
import { selectEmailSubscribtionLoading } from '../../services/redux/slices/email-subscription-slice/selectors';
import { changeNewsletterModalDisplayOption, modalSlice } from '../../services/redux/slices/modal-slice/modalSlice';
import { selectNewsletterModal } from '../../services/redux/slices/modal-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const modalStyle = {
  bgcolor: 'background.paper',
  boxShadow: 24,
  left: '50%',
  maxWidth: { sm: 'md', xs: '100%' },
  overflowY: 'hidden',
  p: 2,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
};

const newsLetterValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
});
const validateNewsLetterFields = formValidation(newsLetterValidationSchema);

function NewsletterModalContainer() {
  const { t: translate, ready } = useTranslation('common');

  const dispatch = useDispatch();
  const newsletterModal = useSelector(selectNewsletterModal);
  const emailSubscriptionLoading = useSelector(selectEmailSubscribtionLoading);

  const newsletterSignupDiscount = '25%';

  const newsLetterFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
      {
        component: CustomCheckbox,
        id: 'neverShowNewsletterModal',
        label: `${ready ? translate('forms.labels.neverShowNewsletterModal') : 'Do not show popup again.'}`,
        labelStyle: { fontSize: '0.875rem', fontWeight: 600, letterSpacing: '-0.01562em', lineHeight: 1.167 },
        onHideNewsletter: (checked) => {
          if (checked) {
            dispatch(changeNewsletterModalDisplayOption());
          }
        },
      },
    ],
    [ready, translate, dispatch]
  );

  const handleToggleNewsletterModal = useCallback(() => {
    dispatch(modalSlice.actions.toggleModal({ type: MODAL_TYPE.newsletter }));
  }, [dispatch]);

  const handleNewsLetterFormSubmit = useCallback(
    async (values, form) => {
      const { toast } = await import('react-toastify');

      const newValues = { ...values };
      delete newValues.neverShowNewsletterModal;

      dispatch(subscribe({ form, isModal: true, toast, values: newValues }));
    },
    [dispatch]
  );

  const modalProps = {
    modalStyle,
    onCloseModal: handleToggleNewsletterModal,
    open: newsletterModal,
  };

  const newsLetterFormProps = {
    buttonName: `${ready ? translate('buttons.subscribe') : 'Subscribe'}`,
    formFields: newsLetterFormFields,
    isButtonFullwidth: true,
    onSubmitForm: handleNewsLetterFormSubmit,
    pending: emailSubscriptionLoading,
    validate: validateNewsLetterFields,
  };

  return (
    <Modal {...modalProps}>
      <Stack spacing={2} alignItems={{ sm: 'center', xs: 'flex-start' }}>
        <Typography
          text={`${
            ready ? translate('modals.newsletter.title', { newsletterSignupDiscount }) : `Sign up to our newsletter and save ${newsletterSignupDiscount} off the next purchase`
          }`}
          variant="h2"
          color="primary"
          textAlign="center"
          style={{ fontWeight: 800, letterSpacing: '-0.01562em', lineHeight: 1.167 }}
        />
        <Typography
          text={`${ready ? translate('modals.newsletter.subtitle') : "Don't miss new arrivals, the latest updates and our promotions"}`}
          variant="h6"
          color="text.secondary"
          textAlign="center"
          style={{ fontWeight: 800, letterSpacing: '-0.01562em', lineHeight: 1.167 }}
        />
        <Box maxWidth="sm" width="100%" p={2}>
          <NewsLetter {...newsLetterFormProps} />
        </Box>
      </Stack>
    </Modal>
  );
}

export default React.memo(NewsletterModalContainer);
