import cartFragment from '../fragments/cart';

// Storefront mutation
export const getCartQuery = `
  query getCart($cartId: ID!, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
    cart(id: $cartId) {
      ...cart
    }
  }
  ${cartFragment}
`;

// Storefront mutation
export const addToCartMutation = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

// Storefront mutation
export const createCartMutation = `
  mutation createCart($buyerIdentity: CartBuyerIdentityInput, $lineItems: [CartLineInput!], $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
    cartCreate(input: {buyerIdentity: $buyerIdentity, lines: $lineItems }) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

// Storefront mutation
export const updateCartItemsMutation = `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;

// Storefront mutation
export const updateCartBuyerIdentityMutation = `
    mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
      cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
        cart {
          ...cart
        }
        userErrors {
          field
          message
        }
      }
    }
    ${cartFragment}
    `;

// Storefront mutation
export const removeFromCartMutation = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!, $language: LanguageCode!, $country: CountryCode!) @inContext(language: $language, country: $country) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;
