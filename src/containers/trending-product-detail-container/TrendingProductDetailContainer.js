'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import Divider from '../../components/divider/Divider';
import { Box, Stack } from '../../components/mui-components/MuiComponents';
import Typography from '../../components/typography/Typography';
import { selectSelectedLanguage, selectSelectedCountry } from '../../services/redux/slices/shop-info-slice/selectors';
import { useSelector } from '../../services/redux/store/store';
import { extractId } from '../../utils/extractId';
import { fetcher } from '../../utils/swrFetcher';
import ProductDetailContainer from '../product-detail-container/ProductDetailContainer';

function TrendingProductDetailContainer() {
  const searchParams = useSearchParams();
  const selectedLanguage = useSelector(selectSelectedLanguage);
  const selectedCountry = useSelector(selectSelectedCountry);

  const { t: translate, ready } = useTranslation('common');

  const variantIdFromQuery = searchParams.get('variant') || '';

  const { data: bestSellingProduct } = useSWR(
    ['/api/v1/products/best-selling', { country: selectedCountry, first: 1, language: selectedLanguage, sortKey: 'BEST_SELLING' }],
    fetcher,
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
    }
  );
  const selectedVariant = bestSellingProduct ? bestSellingProduct.variants?.find((variant) => extractId(variant.id) === variantIdFromQuery) || bestSellingProduct.variants[0] : {};

  return (
    <div>
      {bestSellingProduct ? (
        <Box>
          <Stack p={2} spacing={4}>
            <Stack spacing={2} alignItems="center">
              <Typography text={ready ? translate('homePage.sections.trendingProduct.title') : 'Featured'} variant="h1" color="secondary" />
              <Typography text={ready ? translate('homePage.sections.trendingProduct.subtitle') : 'Trending Now'} variant="h2" color="primary" fontWeight={600} />
              <Divider orientation="horizontal" variant="fullWidth" color="secondary.main" height={5} width={80} />
            </Stack>
            <ProductDetailContainer product={bestSellingProduct} selectedVariant={selectedVariant || {}} />
          </Stack>
        </Box>
      ) : null}
    </div>
  );
}

export default TrendingProductDetailContainer;
