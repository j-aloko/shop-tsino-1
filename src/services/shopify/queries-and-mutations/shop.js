import { shopInfoFragment } from '../fragments/shop';

// Admin mutation
export const shopInfoQuery = `
    query {
      shop {
        ...shopInfo
      }
    }
    ${shopInfoFragment}
    `;

// Storefront mutation
export const shopPoliciesQuery = `
    query getShopPolicies($language: LanguageCode!) @inContext(language: $language) {
      shop {
        privacyPolicy {
          id
          handle
          body
          title
        }
        refundPolicy {
          id
          handle
          body
          title
        }
        shippingPolicy {
          id
          handle
          body
          title
        }
        termsOfService {
          id
          handle
          body
          title
        }
        subscriptionPolicy {
          id
          handle
          body
          title
        }
      }
    }
    `;

// Storefront mutation
export const shopDescriptionQuery = `
    query getShopPolicies($language: LanguageCode!) @inContext(language: $language) {
      shop {
        description
      }
    }
    `;

// Storefront mutation
export const getAvailableCountriesQuery = `
    query Localization @inContext(country: US, language: ES) {
      localization {
        # for the current country
        availableLanguages {
          isoCode
          endonymName
        }

        # and for non-current countries
        availableCountries {
          isoCode
          name
          availableLanguages {
            isoCode
            endonymName
          }
        }
      }
    }
    `;
