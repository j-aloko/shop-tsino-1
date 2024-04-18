'use client';

import React from 'react';

import { useTranslation } from 'next-i18next';
import { useSearchParams } from 'next/navigation';

import Divider from '../../components/divider/Divider';
import { Box, Stack } from '../../components/mui-components/MuiComponents';
import Typography from '../../components/typography/Typography';
import { extractId } from '../../utils/extractId';
import ProductDetailContainer from '../product-detail-container/ProductDetailContainer';

function TrendingProductDetailContainer({ bestSellingProduct }) {
  const searchParams = useSearchParams();

  const { t: translate, ready } = useTranslation('common');

  const variantIdFromQuery = searchParams.get('variant') || '';
  const selectedVariant = bestSellingProduct ? bestSellingProduct.variants?.find((variant) => extractId(variant.id) === variantIdFromQuery) || bestSellingProduct.variants[0] : {};

  return (
    <div>
      {bestSellingProduct ? (
        <Box>
          <Stack p={2} spacing={4}>
            <Stack spacing={2} alignItems="center">
              <Typography text={ready ? translate('homePage.sections.trendingProduct.title') : 'Featured'} variant="h1" color="text.secondary" />
              <Typography text={ready ? translate('homePage.sections.trendingProduct.subtitle') : 'Trending Now'} variant="h2" color="text.primary" fontWeight={600} />
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
