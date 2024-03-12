import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { shopifyStorefrontApi } from '../api-handler/apiHandler';
import { TAGS, defaultFilter } from '../constants/constants';
import { collectionsQuery, productsInCollectionQuery, totalNumberOfProductsInCollectionQuery, minMaxPricesOfProductsInCollectionQuery } from '../queries-and-mutations/collections';
import { buildFilterObject, removeEdgesAndNodes } from '../utils/utils';

const defaultLanguage = shopInfoSlice.getInitialState().selectedLanguage.isoCode;

export async function getCollections({ language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: collectionsQuery,
    tags: [TAGS.collections],
    variables: { language },
  });

  if (!res.body.data.collections) {
    return [];
  }

  return removeEdgesAndNodes(res.body.data.collections);
}

export async function getCollectionProducts({ collection, first, after = null, filter = defaultFilter, reverse = null, sortKey = null, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: productsInCollectionQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      after,
      filters: buildFilterObject(filter),
      first,
      handle: collection,
      language,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
    },
  });

  if (!res.body.data.collection) {
    return [];
  }

  return removeEdgesAndNodes(res.body.data.collection.products);
}

// This function uses the Shopify Storefront API’s pagination feature to recursively count all products in a given collection.
export async function getTotalProductsInCollection({ collection, filter = defaultFilter, first = 50, after = null }) {
  let productCount = 0;

  async function countProducts({ collection: collectionHandle, first: firstCount, after: afterCount, filter: filterOptions }) {
    const res = await shopifyStorefrontApi({
      query: totalNumberOfProductsInCollectionQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: { after: afterCount, filters: buildFilterObject(filterOptions), first: firstCount, handle: collectionHandle },
    });

    const products = removeEdgesAndNodes(res.body.data.collection.products);
    productCount += products.length;

    if (res.body.data.collection.products.pageInfo.hasNextPage) {
      return countProducts({ after: products[products.length - 1].cursor, collection: collectionHandle, filters: buildFilterObject(filterOptions), first: firstCount });
    }
    return null;
  }

  await countProducts({ after, collection, filter, first });

  return productCount;
}

// This function uses the Shopify Storefront API’s pagination feature to recursively find the minimum and maximum prices of all products in a given collection.
export async function getMinMaxPricesInCollection({ collection, filter = defaultFilter, first = 50, after = null }) {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  async function calculatePrices({ collection: collectionHandle, first: firstCount, after: afterCount, filter: filterOptions }) {
    const res = await shopifyStorefrontApi({
      query: minMaxPricesOfProductsInCollectionQuery,
      tags: [TAGS.collections, TAGS.products],
      variables: { after: afterCount, filters: buildFilterObject(filterOptions), first: firstCount, handle: collectionHandle },
    });

    const products = removeEdgesAndNodes(res.body.data.collection.products);

    // Find the minimum and maximum prices
    products.forEach((product) => {
      const productMinPrice = parseFloat(product.priceRange.minVariantPrice.amount);
      const productMaxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);

      if (productMinPrice < minPrice) {
        minPrice = productMinPrice;
      }

      if (productMaxPrice > maxPrice) {
        maxPrice = productMaxPrice;
      }
    });

    if (res.body.data.collection.products.pageInfo.hasNextPage) {
      return calculatePrices({ after: products[products.length - 1].cursor, collection: collectionHandle, filters: buildFilterObject(filterOptions), first: firstCount });
    }
    return null;
  }

  await calculatePrices({ after, collection, filter, first });

  return { maxPrice, minPrice };
}
