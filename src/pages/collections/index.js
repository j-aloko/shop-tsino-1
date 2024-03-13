import React, { useMemo } from 'react';

import dynamic from 'next/dynamic';

import PATH from '../../constant/paths';
import { wrapper } from '../../services/redux/store/store';
import { getCollectionProducts, getCollections, getMinMaxPricesInCollection, getTotalProductsInCollection } from '../../services/shopify/api-queries/collections';
import { getMinMaxPrices, getProducts, getTotalNumberOfProducts } from '../../services/shopify/api-queries/products';
import { defaultSort, sorting } from '../../services/shopify/constants/constants';

const MetaTags = dynamic(() => import('../../components/meta-tags/MetaTags'), { ssr: true });
const CollectionsContainer = dynamic(() => import('../../containers/collections-container/CollectionsContainer'), { ssr: true });

function Collections(props) {
  const { selectedLanguage } = props;

  const metaProps = useMemo(
    () => ({
      canonical: PATH.collections,
      description:
        'Explore our diverse collections of top-quality products at our online store. From fashion to electronics, find everything you need in one place. Shop now and enjoy seamless shopping experience.',
      locale: selectedLanguage,
      title: `Collections | ${process.env.NEXT_PUBLIC_NAME_STORE_NAME}`,
    }),
    [selectedLanguage]
  );

  return (
    <>
      <MetaTags {...metaProps} />
      <CollectionsContainer {...props} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, query }) => {
  const { setCookie, parseCookies } = await import('../../utils/cookies');

  const selectedLanguage = store.getState().shopInfo.selectedLanguage.isoCode;

  let products = [];
  let totalProducts;
  let prices;
  const first = 30;
  const page = query.page ? +query.page : 1;
  const cookies = await parseCookies(req);
  const cursors = cookies.cursors ? JSON.parse(cookies.cursors) : {};
  const after = cursors[page] || null;
  const selectedSortObject = sorting().find((sortObject) => sortObject?.slug === query?.sort) || defaultSort();

  const filter = {
    available_for_sale: query?.available_for_sale || null,
    price_max: query.price_max || null,
    price_min: query.price_min || null,
    product_type: query.product_type || null,
  };

  // Check if at least one item in the filter object is not null or query?.collection exists
  const isFilterInUrl = Object.values(filter).some((value) => value !== null) || !!query?.collection;

  const collections = await getCollections({ language: selectedLanguage });

  if (!query?.collection) {
    totalProducts = await getTotalNumberOfProducts({
      filter,
      first: 250,
    });
    prices = await getMinMaxPrices({ first: 250 });
    products = await getProducts({
      after,
      filter,
      first,
      language: selectedLanguage,
      reverse: selectedSortObject?.reverse || null,
      sortKey: selectedSortObject?.sortKey || null,
    });
  } else {
    totalProducts = await getTotalProductsInCollection({ collection: query?.collection, filter, first: 250 });
    prices = await getMinMaxPricesInCollection({ collection: query?.collection, first: 250 });
    products = await getCollectionProducts({
      after,
      collection: query?.collection,
      filter,
      first,
      language: selectedLanguage,
      reverse: selectedSortObject?.reverse || null,
      sortKey: selectedSortObject?.sortKey || null,
    });
  }

  const totalPages = Math.ceil(totalProducts / first);

  // Store the cursor for the next page
  if (products.length > 0 && page < totalPages) {
    cursors[page + 1] = products[products.length - 1].cursor;
    await setCookie(res, 'cursors', cursors);
  }

  return {
    props: { collections, isFilterInUrl, maxPrice: prices.maxPrice || 10, minPrice: prices.minPrice || 1000, page, products, selectedLanguage, totalPages },
  };
});

export default Collections;
