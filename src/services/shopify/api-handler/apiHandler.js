const shopifyStore = process.env.SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_API_VERSION;

const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const storefrontEndpoint = `${shopifyStore}/api/${apiVersion}/graphql.json`;

const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const adminEndPoint = `${shopifyStore}/admin/api/${apiVersion}/graphql.json`;

const apiTimeoutDuration = 500000; // 5 minutes

const findError = (error) => {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true;
  }

  const prototype = Object.getPrototypeOf(error);

  return prototype === null ? false : findError(prototype);
};

const isObject = (object) => {
  return typeof object === 'object' && object !== null && !Array.isArray(object);
};

const isShopifyError = (error) => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

async function shopifyApi({ cache = 'force-cache', headers, query, tags, variables, endpoint, token, tokenHeader }) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), apiTimeoutDuration);

    const result = await fetch(endpoint, {
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      headers: {
        'Content-Type': 'application/json',
        [tokenHeader]: token,
        ...headers,
      },
      method: 'POST',
      signal: controller.signal, // Add signal here
      ...(tags && { next: { tags } }),
    });

    clearTimeout(id);

    const body = await result.json();

    if (body.errors) {
      throw body.errors;
    }

    return {
      body,
      status: result.status,
    };
  } catch (e) {
    if (e.name === 'AbortError') {
      throw new Error('Request timed out');
    } else if (isShopifyError(e)) {
      throw new Error(
        JSON.stringify({
          cause: e.cause?.toString() || 'unknown',
          message: JSON.stringify(e.message, null, 2),
          query,
          status: e.status || 500,
        })
      );
    }

    if (Array.isArray(e)) {
      throw new Error(
        JSON.stringify(
          {
            errors: e,
            query,
          },
          null,
          2
        )
      );
    }

    throw new Error(
      JSON.stringify({
        error: e,
        query,
      })
    );
  }
}

export function shopifyStorefrontApi(options) {
  return shopifyApi({
    ...options,
    endpoint: storefrontEndpoint,
    token: storefrontAccessToken,
    tokenHeader: 'X-Shopify-Storefront-Access-Token',
  });
}

export function shopifyAdminApi(options) {
  return shopifyApi({
    ...options,
    endpoint: adminEndPoint,
    token: adminToken,
    tokenHeader: 'X-Shopify-Access-Token',
  });
}
