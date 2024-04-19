'use client';

import React, { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import AppBar from '../../components/app-bar/AppBar';
import CompanyInfoCard from '../../components/company-info-card/CompanyInfoCard';
import Logo from '../../components/logo/Logo';
import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import {
  CallRoundedIcon,
  FacebookIcon,
  AlternateEmailIcon,
  EmailRoundedIcon,
  InstagramIcon,
  LocationOnRoundedIcon,
  PinterestIcon,
  TwitterIcon,
} from '../../components/mui-icons/muiIcons';
import NewsLetter from '../../components/newsletter/NewsLetter';
import PaymentMethodLogo from '../../components/payment-method-logo/PaymentMethodLogo';
import SocialIcon from '../../components/social-icon/SocialIcon';
import TextField from '../../components/textfield/TextField';
import Typography from '../../components/typography/Typography';
import PATH from '../../constant/paths';
import { alpha } from '../../mui-styles/muiStyles';
import { selectAboutSummary } from '../../services/redux/slices/about-summary-slice/selectors';
import { subscribe } from '../../services/redux/slices/email-subscription-slice/emailSubscriptionSlice';
import { selectEmailSubscribtionLoading } from '../../services/redux/slices/email-subscription-slice/selectors';
import { selectShopInfo } from '../../services/redux/slices/shop-info-slice/selectors';
import { useDispatch, useSelector } from '../../services/redux/store/store';
import { formValidation, Yup } from '../../utils/formValidation';

const newsLetterValidationSchema = Yup.object({
  email: Yup.string().email().required('Required Field'),
});
const validateNewsLetterFields = formValidation(newsLetterValidationSchema);

const paymentMethods = [
  { img: '/payment-methods/visa-logo.png', title: 'Visa' },
  { img: '/payment-methods/mastercard-logo.png', title: 'Mastercard' },
  { img: '/payment-methods/discover-logo.png', title: 'Discover' },
  { img: '/payment-methods/shopify-logo.png', title: 'Shopify pay' },
  { img: '/payment-methods/apple-pay-logo.png', title: 'Apple pay' },
  { img: '/payment-methods/google-pay-logo.png', title: 'Google pay' },
];

function FooterContainer() {
  const dispatch = useDispatch();
  const aboutSummary = useSelector(selectAboutSummary);
  const shopInfo = useSelector(selectShopInfo);
  const emailSubscriptionLoading = useSelector(selectEmailSubscribtionLoading);

  const { t: translate, ready } = useTranslation('common');

  const companyInfo = useMemo(
    () => [
      {
        IconComponent: <LocationOnRoundedIcon color="secondary" fontSize="large" />,
        subtitle: `${shopInfo.billingAddress?.address1 || shopInfo.billingAddress?.address2 || ''}`,
        title: `${ready ? translate('footer.location') : 'Location'}`,
      },
      {
        IconComponent: <CallRoundedIcon color="secondary" fontSize="large" />,
        subtitle: `${shopInfo.billingAddress?.phone || ''}`,
        title: `${ready ? translate('footer.contactUs') : 'Contact us'}`,
      },
      {
        IconComponent: <EmailRoundedIcon color="secondary" fontSize="large" />,
        subtitle: `${shopInfo?.contactEmail || ''}`,
        title: `${ready ? translate('footer.email') : 'Email'}`,
      },
    ],
    [ready, shopInfo.billingAddress?.address1, shopInfo.billingAddress?.address2, shopInfo.billingAddress?.phone, shopInfo?.contactEmail, translate]
  );

  const socialIcons = useMemo(
    () => [
      { IconComponent: <FacebookIcon fontSize="medium" sx={{ color: 'socialMedia.facebook' }} />, url: 'https://www.example.com' },
      { IconComponent: <TwitterIcon fontSize="medium" sx={{ color: 'socialMedia.twitter' }} />, url: 'https://www.example.com' },
      { IconComponent: <InstagramIcon fontSize="medium" sx={{ color: 'socialMedia.instagram' }} />, url: 'https://www.example.com' },
      { IconComponent: <PinterestIcon fontSize="medium" sx={{ color: 'socialMedia.pinterest' }} />, url: 'https://www.example.com' },
    ],
    []
  );

  const policies = useMemo(
    () => [
      { item: `${ready ? translate('footer.privacy') : 'Privacy'}`, path: PATH.privacyPolicy },
      { item: `${ready ? translate('footer.service') : 'Service'}`, path: PATH.termsOfService },
      { item: `${ready ? translate('footer.shipping') : 'Shipping'}`, path: PATH.shippingPolicy },
      { item: `${ready ? translate('footer.refund') : 'Refund'}`, path: PATH.refundPolicy },
    ],
    [ready, translate]
  );

  const newsLetterFormFields = useMemo(
    () => [
      {
        component: TextField,
        id: 'email',
        label: `${ready ? translate('forms.labels.email') : 'Email'}`,
        placeholder: `${ready ? translate('forms.placeholders.email') : 'Type your email address'} *`,
      },
    ],
    [translate, ready]
  );

  const handleNewsLetterFormSubmit = useCallback(
    async (values, form) => {
      const { toast } = await import('react-toastify');
      dispatch(subscribe({ form, toast, values }));
    },
    [dispatch]
  );

  const newsLetterFormProps = {
    buttonName: `${ready ? translate('buttons.subscribe') : 'Subscribe'}`,
    formFields: newsLetterFormFields,
    isButtonFullwidth: true,
    onSubmitForm: handleNewsLetterFormSubmit,
    pending: emailSubscriptionLoading,
    validate: validateNewsLetterFields,
  };

  return (
    <Box>
      <Stack>
        <Grid container spacing={2} p={{ sm: 5, xs: 2 }} sx={(theme) => ({ backgroundColor: alpha(theme.palette.secondary.light, 0.15) })}>
          <Grid item sm={4} xs={12} p={2}>
            <Stack spacing={2}>
              <Logo />
              <Typography text={aboutSummary || ''} variant="body2" color="text.secondary" />
              <Box display="flex" alignItems="center" flexWrap="wrap" rowGap={1} columnGap={1}>
                {React.Children.toArray(socialIcons?.map((icon) => <SocialIcon {...icon} />))}
              </Box>
            </Stack>
          </Grid>
          <Grid item sm={4} xs={12} p={2}>
            <Stack spacing={1.5}>
              <Stack alignItems="center">
                <AlternateEmailIcon color="secondary" fontSize="large" />
                <Typography text={ready ? translate('footer.newsletter') : 'NewsLetter'} variant="h5" color="text.primary" fontWeight={600} />
              </Stack>
              <NewsLetter {...newsLetterFormProps} />
            </Stack>
          </Grid>
          <Grid item sm={4} xs={12} p={2}>
            <Stack spacing={2}>{React.Children.toArray(companyInfo?.map((info) => <CompanyInfoCard {...info} />))}</Stack>
          </Grid>
        </Grid>
        <AppBar color="primary">
          <Grid container p={2} alignItems="center">
            <Grid item sm={4} xs={12} p={2}>
              <Typography
                text={`${ready ? translate('footer.copyright', { year: new Date().getFullYear() }) : `© ${new Date().getFullYear()}, All right reserved`}`}
                variant="body2"
                color="primary.contrastText"
                fontWeight={600}
              />
            </Grid>
            <Grid item sm={4} xs={12} p={2}>
              <Box display="flex" alignItems="center" justifyContent={{ sm: 'center', xs: 'flex-start' }} flexWrap="wrap" columnGap={2} rowGap={1}>
                {React.Children.toArray(
                  policies?.map(({ item, path }) => (
                    <Link href={path}>
                      <Typography text={item} variant="body2" color="primary.contrastText" fontWeight={600} />
                    </Link>
                  ))
                )}
              </Box>
            </Grid>
            <Grid item sm={4} xs={12} p={2}>
              <Box display="flex" alignItems="center" justifyContent={{ sm: 'flex-end', xs: 'flex-start' }} flexWrap="wrap" columnGap={1} rowGap={1}>
                {React.Children.toArray(paymentMethods?.map((method) => <PaymentMethodLogo {...method} />))}
              </Box>
            </Grid>
          </Grid>
        </AppBar>
      </Stack>
    </Box>
  );
}

export default FooterContainer;
