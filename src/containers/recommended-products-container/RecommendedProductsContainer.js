'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import { Box, Stack } from '../../components/mui-components/MuiComponents';
import { PRODUCT_RECOMMENDATION_INTENT } from '../../constant/shopify';
import { selectSelectedLanguage, selectSelectedCountry } from '../../services/redux/slices/shop-info-slice/selectors';
import { useSelector } from '../../services/redux/store/store';
import { fetcher } from '../../utils/swrFetcher';
import ProductsContainer from '../products-container/ProductsContainer';

function RecommendedProductsContainer({ productId }) {
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const selectedCountry = useSelector(selectSelectedCountry);

  const { t: translate, ready } = useTranslation('common');

  const { data: recommendedProducts } = useSWR(
    ['/api/v1/products/recommended', { country: selectedCountry, intent: PRODUCT_RECOMMENDATION_INTENT.related, language: selectedLanguage, productId }],
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  const { data: complementaryProducts } = useSWR(
    ['/api/v1/products/recommended', { country: selectedCountry, intent: PRODUCT_RECOMMENDATION_INTENT.complementary, language: selectedLanguage, productId }],
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  return (
    <Box>
      <Stack spacing={4}>
        {complementaryProducts?.length > 0 ? (
          <ProductsContainer
            title={ready ? translate('homePage.sections.complementaryProduct.title') : 'Complete Your Purchase'}
            subtitle={ready ? translate('homePage.sections.complementaryProduct.subtitle') : 'Products That Go Well With Your Selection'}
            products={recommendedProducts}
            isViewMoreButton={false}
          />
        ) : null}
        {recommendedProducts?.length > 0 ? (
          <ProductsContainer
            title={ready ? translate('homePage.sections.recommendedProduct.title') : 'Recommended Products'}
            subtitle={ready ? translate('homePage.sections.recommendedProduct.subtitle') : 'You May Also Like'}
            products={recommendedProducts}
          />
        ) : null}
      </Stack>
    </Box>
  );
}

export default RecommendedProductsContainer;
