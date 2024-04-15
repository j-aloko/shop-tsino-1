import { imageFragment, productFragment, productMetafieldFragment, productPriceFragment } from '../fragments/products';

export const productByHandleQuery = `
    query getProductByHandle($handle: String!, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
      product(handle: $handle) {
        ...productFields
      }
    }
    ${productFragment}
    `;

export const bestSellingProductQuery = `
    query getProducts($first: Int, $reverse: Boolean, $sortKey: ProductSortKeys, $query: String, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
      products(first: $first, reverse: $reverse, sortKey: $sortKey, query: $query) {
        edges {
          node {
            ...productFields
          }
        }
      }
    }
    ${productFragment}
      `;

export const productRecommendationsQuery = `
  query getProductRecommendations($productId: ID!, $intent: ProductRecommendationIntent, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
    productRecommendations(productId: $productId, intent: $intent) {
      id
      handle
      title
      productType
      featuredImage {
        ...image
      }
      metafields(
        identifiers: [{ namespace: "average_rating", key: "rating" }, { namespace: "description_summary", key: "summary" }, { namespace: "product_slogan", key: "slogan" }]
      ) {
        ...metafield
      }
      collections(first: 100) {
        edges {
          node {
            id
            title
          }
        }
      }

    }
  }
  ${imageFragment}
  ${productMetafieldFragment}
`;

export const allProductsQuery = `
    query getProducts($first: Int, $after: String, $reverse: Boolean, $sortKey: ProductSortKeys, $query: String, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
      products(first: $first, after: $after, reverse: $reverse, sortKey: $sortKey, query: $query) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            productType
            featuredImage {
              ...image
            }
            metafields(identifiers: [{namespace: "average_rating", key: "rating"}, {namespace: "description_summary", key: "summary"}, {namespace: "product_slogan", key: "slogan"}]) {
              ...metafield
            }
            collections(first: 100) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
    ${imageFragment}
    ${productMetafieldFragment}
      `;

export const totalNumberOfProductsQuery = `
    query getProducts($first: Int, $after: String, $query: String) {
      products(first: $first, after: $after, query: $query) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
          }
        }
      }
    }
      `;

export const minMaxPricesQuery = `
    query getProducts($first: Int, $after: String, $query: String) {
      products(first: $first, after: $after, query: $query) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            priceRange {
              ...priceRange
            }
          }
        }
      }
    }
    ${productPriceFragment}
      `;

export const getProductMetaFieldsQuery = `
    query getProductMetafield($productId: ID!, $namespace: String!, $key: String!) {
      product(id: $productId) {
        metafield(namespace: $namespace, key: $key) {
          id
          value
        }
      }
    }
    `;

export const addMetafieldToProductMutation = `
    mutation updateProductMetafields($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          metafields(first: 100) {
            edges {
              node {
                id
                namespace
                key
                value
              }
            }
          }
        }
        userErrors {
          message
          field
        }
      }
    }
`;
