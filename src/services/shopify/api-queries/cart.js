import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { shopifyStorefrontApi } from '../api-handler/apiHandler';
import { TAGS } from '../constants/constants';
import {
  addToCartMutation,
  createCartMutation,
  updateCartItemsMutation,
  getCartQuery,
  removeFromCartMutation,
  updateCartBuyerIdentityMutation,
} from '../queries-and-mutations/cart';
import { reshapeCart } from '../utils/utils';

const defaultLanguage = shopInfoSlice.getInitialState().selectedLanguage.isoCode;
const defaultCountry = shopInfoSlice.getInitialState().selectedCountry.isoCode;

// Storefront query handler
export async function getCart({ cartId, language = defaultLanguage, country = defaultCountry }) {
  const res = await shopifyStorefrontApi({
    cache: 'no-store',
    query: getCartQuery,
    tags: [TAGS.cart],
    variables: { cartId, country, language },
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart);
}

// Storefront query handler
export async function createCart({ buyerIdentity, language = defaultLanguage, country = defaultCountry }) {
  const res = await shopifyStorefrontApi({
    cache: 'no-store',
    query: createCartMutation,
    variables: { buyerIdentity, country, language },
  });

  if (!res.body.data.cartCreate) {
    return undefined;
  }

  if (res.body.data.cartCreate?.userErrors?.length > 0) {
    return res.body.data.cartCreate;
  }

  return reshapeCart(res.body.data.cartCreate.cart);
}

// Storefront query handler
export async function addToCart({ cartId, lines, language = defaultLanguage, country = defaultCountry }) {
  const res = await shopifyStorefrontApi({
    cache: 'no-store',
    query: addToCartMutation,
    variables: {
      cartId,
      country,
      language,
      lines,
    },
  });

  if (!res.body.data.cartLinesAdd) {
    return undefined;
  }

  if (res.body.data.cartLinesAdd?.userErrors?.length > 0) {
    return res.body.data.cartLinesAdd;
  }

  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

// Storefront query handler
export async function removeFromCart({ cartId, lineIds, language = defaultLanguage, country = defaultCountry }) {
  const res = await shopifyStorefrontApi({
    cache: 'no-store',
    query: removeFromCartMutation,
    variables: {
      cartId,
      country,
      language,
      lineIds,
    },
  });

  if (!res.body.data.cartLinesRemove) {
    return undefined;
  }

  if (res.body.data.cartLinesRemove?.userErrors?.length > 0) {
    return res.body.data.cartLinesRemove;
  }

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

// Storefront query handler
export async function updateCart({ cartId, lines, language = defaultLanguage, country = defaultCountry }) {
  const res = await shopifyStorefrontApi({
    cache: 'no-store',
    query: updateCartItemsMutation,
    variables: {
      cartId,
      country,
      language,
      lines,
    },
  });

  if (!res.body.data.cartLinesUpdate) {
    return undefined;
  }

  if (res.body.data.cartLinesUpdate?.userErrors?.length > 0) {
    return res.body.data.cartLinesUpdate;
  }

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

// Storefront query handler
export async function updateCartBuyerIdentity({ buyerIdentity, cartId, language = defaultLanguage, country = defaultCountry }) {
  const res = await shopifyStorefrontApi({
    cache: 'no-store',
    query: updateCartBuyerIdentityMutation,
    variables: {
      buyerIdentity,
      cartId,
      country,
      language,
    },
  });

  if (!res.body.data.cartBuyerIdentityUpdate) {
    return undefined;
  }

  if (res.body.data.cartBuyerIdentityUpdate?.userErrors?.length > 0) {
    return res.body.data.cartBuyerIdentityUpdate;
  }

  return reshapeCart(res.body.data.cartBuyerIdentityUpdate.cart);
}
