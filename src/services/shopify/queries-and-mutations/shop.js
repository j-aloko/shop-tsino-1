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
export const getAvailableLanguagesQuery = `
    query Localization @inContext(country: US, language: EN) {
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

export const getAvailableCountriesQuery = `
    query @inContext(country: US) {
      localization {
        availableCountries {
          currency {
            isoCode
            name
            symbol
          }
          isoCode
          name
          unitSystem
        }
        country {
          currency {
            isoCode
            name
            symbol
          }
          isoCode
          name
          unitSystem
        }
      }
    }
    `;
