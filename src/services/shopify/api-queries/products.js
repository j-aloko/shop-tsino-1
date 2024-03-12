import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { shopifyAdminApi, shopifyStorefrontApi } from '../api-handler/apiHandler';
import { TAGS, defaultFilter } from '../constants/constants';
import {
  allProductsQuery,
  minMaxPricesQuery,
  bestSellingProductQuery,
  productByHandleQuery,
  productRecommendationsQuery,
  totalNumberOfProductsQuery,
  getProductMetaFieldsQuery,
  addMetafieldToProductMutation,
} from '../queries-and-mutations/products';
import { buildFilterQuery, removeEdgesAndNodes, reshapeProduct, reshapeProducts } from '../utils/utils';

const defaultLanguage = shopInfoSlice.getInitialState().selectedLanguage.isoCode;

export async function getProducts({ filter = defaultFilter, reverse = null, sortKey = null, first, after = null, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: allProductsQuery,
    tags: [TAGS.products],
    variables: {
      after,
      first,
      language,
      query: buildFilterQuery(filter),
      reverse,
      sortKey,
    },
  });

  if (!res.body.data.products) {
    return undefined;
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

// This function uses the Shopify Storefront API’s pagination feature to recursively count all products in a store.
export async function getTotalNumberOfProducts({ filter = defaultFilter, first = 50, after = null }) {
  let productCount = 0;

  async function countProducts({ first: firstCount, after: afterCount, filter: filterOptions }) {
    const res = await shopifyStorefrontApi({
      query: totalNumberOfProductsQuery,
      tags: [TAGS.products],
      variables: { after: afterCount, first: firstCount, query: buildFilterQuery(filterOptions) },
    });

    if (!res.body.data.products) {
      return undefined;
    }

    const products = removeEdgesAndNodes(res.body.data.products);
    productCount += products.length;

    if (res.body.data.products.pageInfo.hasNextPage) {
      return countProducts({ after: products[products.length - 1].cursor, filter: filterOptions, first: firstCount });
    }
    return null;
  }

  await countProducts({ after, filter, first });

  return productCount;
}

// This function uses the Shopify Storefront API’s pagination feature to recursively find the minimum and maximum prices of all products in a store.
export async function getMinMaxPrices({ filter = defaultFilter, first = 50, after = null }) {
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  async function calculatePrices({ first: firstCount, after: afterCount, filter: filterOptions }) {
    const res = await shopifyStorefrontApi({
      query: minMaxPricesQuery,
      tags: [TAGS.products],
      variables: { after: afterCount, first: firstCount, query: buildFilterQuery(filterOptions) },
    });

    if (!res.body.data.products) {
      return undefined;
    }

    const products = removeEdgesAndNodes(res.body.data.products);

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

    if (res.body.data.products.pageInfo.hasNextPage) {
      return calculatePrices({ after: products[products.length - 1].cursor, filter: filterOptions, first: firstCount });
    }
    return null;
  }

  await calculatePrices({ after, filter, first });

  return { maxPrice, minPrice };
}

export async function getProductByHandle({ handle, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: productByHandleQuery,
    tags: [TAGS.products],
    variables: {
      handle,
      language,
    },
  });

  if (!res.body.data.product) {
    return undefined;
  }

  return reshapeProduct(res.body.data.product, false);
}

export async function getBestSellingProduct({ query = null, reverse = null, sortKey = null, first, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: bestSellingProductQuery,
    tags: [TAGS.products],
    variables: {
      first,
      language,
      query,
      reverse,
      sortKey,
    },
  });

  if (!res.body.data.products) {
    return undefined;
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getProductRecommendations({ productId, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: productRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      language,
      productId,
    },
  });

  if (!res.body.data.productRecommendations) {
    return undefined;
  }

  return res.body.data.productRecommendations;
}

export async function fetchProductMetafields({ productId, namespace, key }) {
  const res = await shopifyAdminApi({
    query: getProductMetaFieldsQuery,
    variables: {
      key,
      namespace,
      productId,
    },
  });

  if (!res.body.data.product.metafield) {
    return undefined;
  }

  return res.body.data.product.metafield;
}

export async function addMetafieldToProduct({ productId, value, namespace, key, metafieldId, type }) {
  const input = {
    id: productId,
    metafields: [
      {
        id: metafieldId,
        key,
        namespace,
        type,
        value: JSON.stringify(value),
      },
    ],
  };

  const res = await shopifyAdminApi({
    query: addMetafieldToProductMutation,
    variables: { input },
  });

  if (!res.body.data.productUpdate) {
    return undefined;
  }

  return res.body.data.productUpdate;
}
