'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import { Box } from '../../components/mui-components/MuiComponents';
import { selectSelectedLanguage, selectSelectedCountry } from '../../services/redux/slices/shop-info-slice/selectors';
import { useSelector } from '../../services/redux/store/store';
import { fetcher } from '../../utils/swrFetcher';
import ProductsContainer from '../products-container/ProductsContainer';

function LatestProductsContainer() {
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const selectedCountry = useSelector(selectSelectedCountry);
  const { t: translate, ready } = useTranslation('common');

  const { data: latestProducts } = useSWR(
    ['/api/v1/products', { country: selectedCountry, first: 12, language: selectedLanguage, reverse: true, sortKey: 'CREATED_AT' }],
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );

  return (
    <Box spacing={4}>
      {latestProducts?.length > 0 ? (
        <ProductsContainer
          title={ready ? translate('homePage.sections.latestProducts.title') : 'The Latest'}
          subtitle={ready ? translate('homePage.sections.latestProducts.subtitle') : 'Products'}
          products={latestProducts}
          isCarouselProduct
        />
      ) : null}
    </Box>
  );
}

export default LatestProductsContainer;
