import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { Stack } from '../components/mui-components/MuiComponents';
import PATH from '../constant/paths';
import FeaturedItemsContainer from '../containers/featured-items-container/FeaturedItemsContainer';
import { wrapper } from '../services/redux/store/store';
import { getBestSellingProduct, getProducts } from '../services/shopify/api-queries/products';
import { getShopDescription } from '../services/shopify/api-queries/shop';

const MetaTags = dynamic(() => import('../components/meta-tags/MetaTags'), { ssr: true });

const CommitmentsContainer = dynamic(() => import('../containers/commitments-container/CommitmentsContainer'), {
  ssr: true,
});
const DiscountBannerContainer = dynamic(() => import('../containers/discount-banner-container/DiscountBannerContainer'), {
  ssr: true,
});
const LatestProductsContainer = dynamic(() => import('../containers/latest-products-container/LatestProductsContainer'), {
  ssr: true,
});
const TrendingProductDetailContainer = dynamic(() => import('../containers/trending-product-detail-container/TrendingProductDetailContainer'), {
  ssr: true,
});

function Home({ featured, bestSellingProduct, selectedLanguage, shopDescription, uniqueKey }) {
  const metaProps = useMemo(
    () => ({
      canonical: PATH.home,
      description: shopDescription,
      isHomePage: true,
      locale: selectedLanguage,
      title: `Home | ${process.env.NEXT_PUBLIC_NAME_STORE_NAME}`,
    }),
    [shopDescription, selectedLanguage]
  );

  return (
    <>
      <MetaTags {...metaProps} />
      <Stack spacing={{ sm: 10, xs: 6 }}>
        <FeaturedItemsContainer featuredItems={featured} />
        <LatestProductsContainer />
        <DiscountBannerContainer maxWidth="md" justifyContent="center" />
        <TrendingProductDetailContainer key={uniqueKey} bestSellingProduct={bestSellingProduct} />
        <CommitmentsContainer />
      </Stack>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const selectedLanguage = store.getState().shopInfo.selectedLanguage.isoCode;
  const selectedCountry = store.getState().shopInfo.selectedCountry.isoCode;

  const featured = await getProducts({ country: selectedCountry, first: 5, language: selectedLanguage, sortKey: 'BEST_SELLING' });
  const bestSellingProducts = await getBestSellingProduct({ country: selectedCountry, first: 1, language: selectedLanguage, sortKey: 'BEST_SELLING' });
  const shop = await getShopDescription({ language: selectedLanguage });

  const uniqueKey = Date.now();

  return {
    props: {
      bestSellingProduct: bestSellingProducts[0],
      featured,
      selectedLanguage,
      shopDescription: shop?.description || '',
      uniqueKey,
    },
  };
});

export default Home;
