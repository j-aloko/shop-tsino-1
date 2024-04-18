import React from 'react';

import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import Image from '../../components/image/Image';
import { Box, Grid, Stack } from '../../components/mui-components/MuiComponents';
import RouterButton from '../../components/router-button/RouterButton';
import Typography from '../../components/typography/Typography';
import PATH from '../../constant/paths';
import { DISCOUNT_STATUS } from '../../constant/shopify';
import { selectAutomaticDiscountBasic } from '../../services/redux/slices/discounts-slice/selectors';
import { selectSelectedLanguage } from '../../services/redux/slices/shop-info-slice/selectors';
import { useSelector } from '../../services/redux/store/store';
import { fetcher } from '../../utils/swrFetcher';

function DiscountBannerContainer({ maxWidth = '100%', justifyContent = 'flex-start', imagePrority = false }) {
  const automaticDiscountBasic = useSelector(selectAutomaticDiscountBasic);
  const selectedLanguage = useSelector(selectSelectedLanguage);

  const { t: translate, ready } = useTranslation('common');

  const { data } = useSWR(['/api/v1/products', { first: 1, language: selectedLanguage, reverse: true, sortKey: 'CREATED_AT' }], fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  });

  const [product] = data || [];

  if (automaticDiscountBasic?.discount?.status === DISCOUNT_STATUS.active && product) {
    return (
      <Box sx={{ display: 'flex', justifyContent }}>
        <Grid container sx={{ backgroundColor: 'background.paper' }} alignItems="center" maxWidth={maxWidth} spacing={2} p={4}>
          <Grid item sm={5} xs={12}>
            <Image
              height={250}
              src={product?.featuredImage?.url}
              alt="discount banner"
              objectFit="contain"
              priority={imagePrority}
              sizes="(max-width: 600px) 113px,
                     (max-width: 900px) 226px,
                     340px"
            />
          </Grid>
          <Grid item sm={7} xs={12}>
            <Stack spacing={1} alignItems="center">
              <Typography
                text={automaticDiscountBasic.discount.title}
                textAlign="center"
                variant="subtitle1"
                color="text.secondary"
                fontWeight={600}
                style={{ textTransform: 'uppercase' }}
              />
              <Typography text={automaticDiscountBasic.discount.summary} textAlign="center" variant="h5" color="text.primary" fontWeight={600} />
              <RouterButton
                path={`${PATH.products}/${product?.handle}`}
                name={ready ? translate('buttons.shopNow') : 'Shop Now'}
                color="secondary"
                size="medium"
                fullWidth={false}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return null;
}

export default DiscountBannerContainer;
