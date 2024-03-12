import { shopifyAdminApi } from '../api-handler/apiHandler';
import { automaticBasicDiscountsQuery } from '../queries-and-mutations/discounts';
import { removeEdgesAndNodes } from '../utils/utils';

export async function getAutomaticBasicDiscounts() {
  const res = await shopifyAdminApi({
    query: automaticBasicDiscountsQuery,
  });

  if (!res.body.data.discountNodes) {
    return undefined;
  }

  return removeEdgesAndNodes(res.body.data.discountNodes);
}
