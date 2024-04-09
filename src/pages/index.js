import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';

import { Stack } from '../components/mui-components/MuiComponents';
import PATH from '../constant/paths';
import FeaturedProductsContainer from '../containers/featured-products-container/FeaturedProductsContainer';
import { wrapper } from '../services/redux/store/store';
import { getProducts } from '../services/shopify/api-queries/products';
import { getShopDescription } from '../services/shopify/api-queries/shop';

const MetaTags = dynamic(() => import('../components/meta-tags/MetaTags'), { ssr: true });
const CommitmentsContainer = dynamic(() => import('../containers/commitments-container/CommitmentsContainer'), {
  ssr: false,
});
const DiscountBannerContainer = dynamic(() => import('../containers/discount-banner-container/DiscountBannerContainer'), {
  ssr: false,
});
const LatestProductsContainer = dynamic(() => import('../containers/latest-products-container/LatestProductsContainer'), {
  ssr: false,
});
const TrendingProductDetailContainer = dynamic(() => import('../containers/trending-product-detail-container/TrendingProductDetailContainer'), {
  ssr: false,
});

function Home({ featuredProducts, selectedLanguage, shopDescription }) {
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
        <FeaturedProductsContainer featuredProducts={featuredProducts} />
        <CommitmentsContainer />
        <DiscountBannerContainer maxWidth="md" justifyContent="center" isBackgroundColor />
        <LatestProductsContainer />
        <TrendingProductDetailContainer />
      </Stack>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const selectedLanguage = store.getState().shopInfo.selectedLanguage.isoCode;
  const selectedCountry = store.getState().shopInfo.selectedCountry.isoCode;

  const featuredProducts = await getProducts({ country: selectedCountry, first: 5, language: selectedLanguage, sortKey: 'BEST_SELLING' });
  const shop = await getShopDescription({ language: selectedLanguage });

  return {
    props: {
      featuredProducts,
      selectedLanguage,
      shopDescription: shop?.description || '',
    },
  };
});

export default Home;
