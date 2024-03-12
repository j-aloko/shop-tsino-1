import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { shopifyStorefrontApi, shopifyAdminApi } from '../api-handler/apiHandler';
import { getAvailableCountriesQuery, shopDescriptionQuery, shopInfoQuery, shopPoliciesQuery } from '../queries-and-mutations/shop';

const defaultLanguage = shopInfoSlice.getInitialState().selectedLanguage.isoCode;

// Admin query handler
export async function getShopInfo() {
  const res = await shopifyAdminApi({
    query: shopInfoQuery,
  });

  if (!res.body.data.shop) {
    return undefined;
  }

  return res.body.data.shop;
}

// Storefront query handler
export async function getShopPolicies({ handle, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: shopPoliciesQuery,
    variables: { language },
  });

  if (!res.body.data.shop) {
    return undefined;
  }

  const data = res.body.data.shop;

  const policy = Object.values(data).find((item) => item.handle === handle);

  return policy;
}

// Storefront query handler
export async function getShopDescription({ language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: shopDescriptionQuery,
    variables: { language },
  });

  if (!res.body.data.shop) {
    return undefined;
  }

  const data = res.body.data.shop;

  return data;
}

// Storefront query handler
export async function getAvailableCountries() {
  const res = await shopifyStorefrontApi({
    query: getAvailableCountriesQuery,
  });

  if (!res.body.data.localization) {
    return undefined;
  }

  return res.body.data.localization;
}
