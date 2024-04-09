import { isTokenExpired } from '../../../utils/auth';
import { parseCookies, setCookie } from '../../../utils/cookies';
import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { addToCart, createCart, getCart, removeFromCart, updateCart, updateCartBuyerIdentity } from '../api-queries/cart';
import { retrieveCustomerInfoByToken } from '../api-queries/customers';

const defaultCountry = shopInfoSlice.getInitialState().selectedCountry.isoCode;

async function getBuyerIdentity(cookies) {
  let buyerIdentity = {};
  const { customerAccessToken } = cookies;

  if (customerAccessToken) {
    const parsedCustomerAccessToken = JSON.parse(customerAccessToken);
    const { accessToken, expiresAt } = parsedCustomerAccessToken;

    if (!isTokenExpired(expiresAt)) {
      const customer = await retrieveCustomerInfoByToken({ customerAccessToken: accessToken });
      buyerIdentity = {
        customer: {
          displayName: customer.displayName,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
        customerAccessToken: accessToken,
        email: customer.email,
      };
    }
  }

  return buyerIdentity;
}

export async function getCartItems(req) {
  const { language, country } = req.query;

  const cookies = await parseCookies(req);
  const { cartId } = cookies;
  let cart = null;

  const buyerIdentity = await getBuyerIdentity(cookies);
  buyerIdentity.countryCode = country || defaultCountry;

  try {
    if (cartId) {
      cart = await getCart({ cartId, country, language });
    }

    if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
      const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, country, language });
      if (!updatedCartResponse?.userErrors?.length) {
        cart = updatedCartResponse || cart;
      }
    }

    return cart;
  } catch (error) {
    return cart;
  }
}

export async function addCartItem(req, res, selectedVariantId, quantity) {
  const { language, country } = req.query;

  const cookies = await parseCookies(req);
  let { cartId } = cookies;
  let cart;

  const buyerIdentity = await getBuyerIdentity(cookies);
  buyerIdentity.countryCode = country || defaultCountry;

  if (cartId) {
    cart = await getCart({ cartId, country, language });
  }

  if (!cartId || !cart) {
    cart = await createCart({ buyerIdentity, country, language });
    if (!cart?.userErrors?.length) {
      cartId = cart.id;
      await setCookie(res, 'cartId', cartId, 60 * 60 * 24 * 30);
    }
  } else if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
    const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, country, language });
    if (!updatedCartResponse?.userErrors?.length) {
      cart = updatedCartResponse || cart;
    }
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    const result = await addToCart({ cartId, country, language, lines: [{ merchandiseId: selectedVariantId, quantity }] });
    return result;
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(req, res, lineId) {
  const { language, country } = req.query;

  const cookies = await parseCookies(req);
  const { cartId } = cookies;
  let cart;

  const buyerIdentity = await getBuyerIdentity(cookies);
  buyerIdentity.countryCode = country || defaultCountry;

  if (cartId) {
    cart = await getCart({ cartId, country, language });
  }

  if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
    const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, country, language });
    if (!updatedCartResponse?.userErrors?.length) {
      cart = updatedCartResponse || cart;
    }
  }

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    const result = await removeFromCart({ cartId, country, language, lineIds: [lineId] });
    return result;
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(req, res, payload) {
  const { language, country } = req.query;

  const cookies = await parseCookies(req);
  const { cartId } = cookies;
  let cart;

  const buyerIdentity = await getBuyerIdentity(cookies);
  buyerIdentity.countryCode = country || defaultCountry;

  if (cartId) {
    cart = await getCart({ cartId, country, language });
  }

  if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
    const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, country, language });
    if (!updatedCartResponse?.userErrors?.length) {
      cart = updatedCartResponse || cart;
    }
  }

  if (!cartId) {
    return 'Missing cart ID';
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart({ cartId, country, language, lineIds: [lineId] });
      return null;
    }

    const result = await updateCart({
      cartId,
      country,
      language,
      lines: [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity,
        },
      ],
    });
    return result;
  } catch (e) {
    return 'Error updating item quantity';
  }
}
