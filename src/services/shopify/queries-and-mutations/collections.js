import { imageFragment, productMetafieldFragment, productPriceFragment } from '../fragments/products';

export const collectionsQuery = `
    query getCollections($language: LanguageCode!) @inContext(language: $language) {
      collections(first: 250) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              altText
              url
            }
            metafield (namespace: "slogan", key: "slogan") {
              value
            }
          }
        }
      }
    }
    `;

export const productsInCollectionQuery = `
    query getProductsInCollection($handle: String!, $first: Int, $after: String, $reverse: Boolean, $sortKey: ProductCollectionSortKeys, $filters: [ProductFilter!], $language: LanguageCode!) @inContext(language: $language) {
      collection(handle: $handle) {
        products(first: $first, after: $after, reverse: $reverse, sortKey: $sortKey, filters: $filters) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              handle
              id
              title
              featuredImage {
                ...image
              }
              metafields(identifiers: [{namespace: "average_rating", key: "rating"}, {namespace: "description_summary", key: "summary"}, {namespace: "product_slogan", key: "slogan"}]) {
                ...metafield
              }
            }
          }
        }
      }
    }
    ${imageFragment}
    ${productMetafieldFragment}
    `;

export const totalNumberOfProductsInCollectionQuery = `
    query getProductsInCollection($handle: String!, $first: Int, $after: String, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        products(first: $first, after: $after, filters: $filters) {
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
    }
    `;

export const minMaxPricesOfProductsInCollectionQuery = `
    query getProductsInCollection($handle: String!, $first: Int, $after: String, $filters: [ProductFilter!]) {
      collection(handle: $handle) {
        products(first: $first, after: $after, filters: $filters) {
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
    }
    ${productPriceFragment}
    `;
