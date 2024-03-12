import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { shopifyStorefrontApi } from '../api-handler/apiHandler';
import { pageQuery, pagesQuery } from '../queries-and-mutations/pages';
import { removeEdgesAndNodes } from '../utils/utils';

const defaultLanguage = shopInfoSlice.getInitialState().selectedLanguage.isoCode;

// Storefront query handler
export async function getPage({ handle, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: pageQuery,
    variables: { handle, language },
  });

  return res.body.data.pageByHandle;
}

// Storefront query handler
export async function getPages() {
  const res = await shopifyStorefrontApi({
    query: pagesQuery,
  });

  return removeEdgesAndNodes(res.body.data.pages);
}
