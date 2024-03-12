import { isTokenExpired } from '../../../utils/auth';
import { parseCookies, setCookie } from '../../../utils/cookies';
import { addToCart, createCart, getCart, removeFromCart, updateCart, updateCartBuyerIdentity } from '../api-queries/cart';

async function getBuyerIdentity(cookies) {
  let buyerIdentity = null;
  const { customerAccessToken } = cookies;

  if (customerAccessToken) {
    const parsedCustomerAccessToken = JSON.parse(customerAccessToken);
    const { accessToken, expiresAt } = parsedCustomerAccessToken;

    if (!isTokenExpired(expiresAt)) {
      buyerIdentity = {
        customerAccessToken: accessToken,
      };
    }
  }

  return buyerIdentity;
}

export async function getCartItems(req) {
  const { language } = req.query;

  const cookies = await parseCookies(req);
  const { cartId } = cookies;
  let cart = null;

  const buyerIdentity = await getBuyerIdentity(cookies);

  try {
    if (cartId) {
      cart = await getCart({ cartId, language });
    }

    if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
      const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, language });
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
  const { language } = req.query;

  const cookies = await parseCookies(req);
  let { cartId } = cookies;
  let cart;

  const buyerIdentity = await getBuyerIdentity(cookies);

  if (cartId) {
    cart = await getCart({ cartId, language });
  }

  if (!cartId || !cart) {
    cart = await createCart({ buyerIdentity, language });
    if (!cart?.userErrors?.length) {
      cartId = cart.id;
      await setCookie(res, 'cartId', cartId, 60 * 60 * 24 * 30);
    }
  } else if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
    const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, language });
    if (!updatedCartResponse?.userErrors?.length) {
      cart = updatedCartResponse || cart;
    }
  }

  if (!selectedVariantId) {
    return 'Missing product variant ID';
  }

  try {
    const result = await addToCart({ cartId, language, lines: [{ merchandiseId: selectedVariantId, quantity }] });
    return result;
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export async function removeItem(req, res, lineId) {
  const { language } = req.query;

  const cookies = await parseCookies(req);
  const { cartId } = cookies;
  let cart;

  const buyerIdentity = await getBuyerIdentity(cookies);

  if (cartId) {
    cart = await getCart({ cartId, language });
  }

  if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
    const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, language });
    if (!updatedCartResponse?.userErrors?.length) {
      cart = updatedCartResponse || cart;
    }
  }

  if (!cartId) {
    return 'Missing cart ID';
  }

  try {
    const result = await removeFromCart({ cartId, language, lineIds: [lineId] });
    return result;
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItemQuantity(req, res, payload) {
  const { language } = req.query;

  const cookies = await parseCookies(req);
  const { cartId } = cookies;
  let cart;

  const buyerIdentity = await getBuyerIdentity(cookies);

  if (cartId) {
    cart = await getCart({ cartId, language });
  }

  if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
    const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, language });
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
      await removeFromCart({ cartId, language, lineIds: [lineId] });
      return null;
    }

    const result = await updateCart({
      cartId,
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
