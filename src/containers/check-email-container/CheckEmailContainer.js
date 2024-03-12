import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import { useSearchParams } from 'next/navigation';

import CheckEmailCard from '../../components/check-email-card/CheckEmailCard';
import { CHECK_EMAIL_ENUM } from '../../constant/checkEmailEnum';
import { requestPasswordResetLink, resendEmailActivation } from '../../services/redux/slices/auth-slice/authSlice';
import { selectRequestPasswordResetLinkLoading, selectResendEmailActivationLoading } from '../../services/redux/slices/auth-slice/selectors';
import { selectSelectedLanguage } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';

function CheckEmailContainer() {
  const { ready, t: translate } = useTranslation('common');
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const searchParams = useSearchParams();
  const { message, type, values, redirect } = Object.fromEntries(searchParams);

  const decodedMessage = message ? decodeURIComponent(message) : '';
  const decodedValues = useMemo(() => (values ? JSON.parse(decodeURIComponent(values)) : {}), [values]);
  const decodedRedirect = redirect ? decodeURIComponent(redirect) : '';

  const dispatch = useDispatch();
  const resendEmailActivationLoading = useSelector(selectResendEmailActivationLoading);
  const requestPasswordResetLinkLoading = useSelector(selectRequestPasswordResetLinkLoading);

  const handleResendEmail = useCallback(async () => {
    const { toast } = await import('react-toastify');

    if (type === CHECK_EMAIL_ENUM.signUp) {
      decodedValues.language = selectedLanguage;
      dispatch(resendEmailActivation({ toast, values: decodedValues }));
    }

    if (type === CHECK_EMAIL_ENUM.resetPassword) {
      decodedValues.language = selectedLanguage;
      dispatch(requestPasswordResetLink({ resend: true, toast, values: decodedValues }));
    }
  }, [type, decodedValues, selectedLanguage, dispatch]);

  if (!message || !type || !values) {
    return null;
  }

  return (
    <CheckEmailCard
      title={
        type === CHECK_EMAIL_ENUM.signUp
          ? `${ready ? translate('authentication.checkEmail.emailConfirmation') : 'Email Confirmation'}`
          : `${ready ? translate('authentication.checkEmail.passwordReset') : 'Password Reset'}`
      }
      message={decodedMessage}
      onResendEmail={handleResendEmail}
      resendPending={resendEmailActivationLoading || requestPasswordResetLinkLoading}
      decodedRedirect={decodedRedirect}
      translate={translate}
      ready={ready}
    />
  );
}

export default CheckEmailContainer;
