'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

import { Box } from '../../components/mui-components/MuiComponents';
import { selectSelectedLanguage, selectSelectedCountry } from '../../services/redux/slices/shop-info-slice/selectors';
import { useSelector } from '../../services/redux/store/store';
import { fetcher } from '../../utils/swrFetcher';
import ProductsContainer from '../products-container/ProductsContainer';

function RelatedProductsContainer({ productId }) {
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const selectedCountry = useSelector(selectSelectedCountry);

  const { t: translate, ready } = useTranslation('common');

  const { data: recommendedProducts } = useSWR(['/api/v1/products/recommended', { country: selectedCountry, language: selectedLanguage, productId }], fetcher, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
  });

  return (
    <Box>
      {recommendedProducts?.length > 0 ? (
        <ProductsContainer
          title={ready ? translate('homePage.sections.recommendedProduct.title') : 'Recommended Products'}
          subtitle={ready ? translate('homePage.sections.recommendedProduct.subtitle') : 'You May Also Like'}
          products={recommendedProducts}
        />
      ) : null}
    </Box>
  );
}

export default RelatedProductsContainer;
