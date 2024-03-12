import { seoFragment } from './seo';

const imageFragment = `
  fragment image on Image {
    id
    url
    altText
    width
    height
  }
`;

const productPriceFragment = `
  fragment priceRange on ProductPriceRange {
    maxVariantPrice {
      amount
      currencyCode
    }
    minVariantPrice {
      amount
      currencyCode
    }
  }
`;

const productOptionsFragment = `
  fragment option on ProductOption {
    id
    name
    values
  }
`;

const productVariantFragment = `
  fragment productVariant on ProductVariant {
    id
    title
    availableForSale
    quantityAvailable
    image {
      ...image
    }
    selectedOptions {
      name
      value
    }
    compareAtPrice {
      amount
      currencyCode
    }
    price {
      amount
      currencyCode
    }
  }
`;

const productMetafieldFragment = `
  fragment metafield on Metafield {
    key
    value
  }
`;

const productFragment = `
  fragment productFields on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    totalInventory
    productType
    featuredImage {
      ...image
    }
    images(first: 100) {
      edges {
        node {
         ...image
        }
      }
    }
    priceRange {
      ...priceRange
    }
    options(first: 100) {
      ...option
    }
    variants(first: 100) {
      edges {
        node {
          ...productVariant
        }
      }
    }
    metafields(identifiers: [
      {namespace: "product_reviews", key: "reviews"},
      {namespace: "average_rating", key: "rating"},
      {namespace: "skill_level", key: "skill_level"},
      {namespace: "age_range", key: "age_range"},
      {namespace: "wheel_size", key: "wheel_size"}
    ]) {
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
    seo {
      ...seo
    }
    vendor
    tags
    updatedAt
  }
  ${imageFragment}
  ${productOptionsFragment}
  ${productVariantFragment}
  ${productMetafieldFragment}
  ${seoFragment}
  ${productPriceFragment}
`;

export { imageFragment, productVariantFragment, productFragment, productPriceFragment, productMetafieldFragment };
