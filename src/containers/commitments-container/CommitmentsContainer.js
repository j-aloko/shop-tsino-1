'use client';

import React, { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import CommitmentCard from '../../components/commitment-card/CommitmentCard';
import Divider from '../../components/divider/Divider';
import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import { CardGiftcardIcon, LocalShippingOutlinedIcon, MonetizationOnOutlinedIcon, Person2OutlinedIcon } from '../../components/mui-icons/muiIcons';
import Typography from '../../components/typography/Typography';

const servicesIconStyle = {
  height: 50,
  width: 50,
};

function CommitmentsContainer() {
  const { t: translate, ready } = useTranslation('common');

  const services = useMemo(
    () => [
      {
        IconComponent: <LocalShippingOutlinedIcon color="secondary" sx={servicesIconStyle} />,
        subtitle: `${ready ? translate('customerBenefits.fastDelivery.subtitle') : 'Get your items in no time!'}`,
        title: `${ready ? translate('customerBenefits.fastDelivery.title') : 'Fast Delivery'}`,
      },
      {
        IconComponent: <MonetizationOnOutlinedIcon color="secondary" sx={servicesIconStyle} />,
        subtitle: `${ready ? translate('customerBenefits.bigSavings.subtitle') : 'Save more with every purchase'}`,
        title: `${ready ? translate('customerBenefits.bigSavings.title') : 'Big Savings'}`,
      },
      {
        IconComponent: <Person2OutlinedIcon color="secondary" sx={servicesIconStyle} />,
        subtitle: `${ready ? translate('customerBenefits.customerSupport.subtitle') : 'Your satisfaction, our priority'}`,
        title: `${ready ? translate('customerBenefits.customerSupport.title') : 'Customer Support'}`,
      },
      {
        IconComponent: <CardGiftcardIcon color="secondary" sx={servicesIconStyle} />,
        subtitle: `${ready ? translate('customerBenefits.giftVoucher.subtitle') : 'Your loyalty rewarded with special discounts'}`,
        title: `${ready ? translate('customerBenefits.giftVoucher.title') : 'Gift Voucher'}`,
      },
    ],
    [ready, translate]
  );

  return (
    <Box>
      <Stack spacing={4}>
        <Stack spacing={2} alignItems="center">
          <Typography text={ready ? translate('homePage.sections.customerBenefits.title') : 'Our Commitments'} variant="h1" color="text.secondary" />
          <Typography text={ready ? translate('homePage.sections.customerBenefits.subtitle') : 'Superior Shopping'} variant="h2" color="text.primary" fontWeight={600} />
          <Divider orientation="horizontal" variant="fullWidth" color="secondary.main" height={5} width={80} />
        </Stack>
        <Grid container justifyContent="space-between">
          {React.Children.toArray(services?.map((service) => <CommitmentCard service={service} />))}
        </Grid>
        1
      </Stack>
    </Box>
  );
}

export default CommitmentsContainer;
