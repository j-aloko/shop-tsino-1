import { pageFragment } from '../fragments/pages';

// Storefront mutation
export const pageQuery = `
  query getPage($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
    pageByHandle(handle: $handle) {
      ...page
    }
  }
  ${pageFragment}
`;

// Storefront mutation
export const pagesQuery = `
  query getPages($language: LanguageCode!) @inContext(language: $language) {
    pages(first: 100) {
      edges {
        node {
          ...page
        }
      }
    }
  }
  ${pageFragment}
`;
