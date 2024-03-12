import { DEFAULT_PASSWORD, EMAIL_MARKETING_CONSENT } from '../../../constant/shopify';
import { shopInfoSlice } from '../../redux/slices/shop-info-slice/shopInfoSlice';
import { shopifyAdminApi, shopifyStorefrontApi } from '../api-handler/apiHandler';
import {
  activateCustomerAccountMutation,
  adminUpdateCustomerEmailMarketingConsentMutation,
  adminUpdateCustomerMutation,
  customerActivateMutation,
  customerCreateMutation,
  customerLoginMutation,
  customerSubscribeEmailMarketingMutation,
  recoverCustomerAccountMutation,
  resetCustomerAccountMutation,
  retrieveCustomerInfoByEmailQuery,
  retrieveCustomerInfoByTokenQuery,
} from '../queries-and-mutations/customers';
import { removeEdgesAndNodes, reshapeCustomer } from '../utils/utils';

const defaultLanguage = shopInfoSlice.getInitialState().selectedLanguage.isoCode;

export async function subscribeEmailMarketing({ input }) {
  const res = await shopifyAdminApi({
    query: customerSubscribeEmailMarketingMutation,
    variables: { input },
  });

  if (!res.body.data.customerCreate) {
    return undefined;
  }

  return res.body.data.customerCreate;
}

export async function signUpCustomer({ input, language = defaultLanguage }) {
  // Create a copy of the input object for the admin API call
  const adminInput = { ...input };

  if (adminInput?.acceptsMarketing) {
    adminInput.emailMarketingConsent = {
      consentUpdatedAt: new Date().toISOString(),
      marketingOptInLevel: EMAIL_MARKETING_CONSENT.marketingOptInLevel.singleOptIn,
      marketingState: EMAIL_MARKETING_CONSENT.marketingState.subscribed,
    };
    // acceptsMarketing is depracated in the admin api and will be removed in future releases.
    delete adminInput.acceptsMarketing;
  }

  // Create the customer account using the admin API's customerCreate mutation
  const customerCreateRes = await shopifyAdminApi({
    query: customerCreateMutation,
    variables: {
      input: adminInput,
    },
  });

  if (!customerCreateRes.body.data.customerCreate) {
    return undefined;
  }

  if (customerCreateRes.body.data.customerCreate?.userErrors?.length > 0) {
    return customerCreateRes.body.data.customerCreate;
  }

  // Attempt to Create the customer account using the storefront API's customerCreate mutation
  // A user was already created with the admin api, so this triggers the sending of an activation URL

  input.password = DEFAULT_PASSWORD;

  const customerActivateRes = await shopifyStorefrontApi({
    query: customerActivateMutation,
    variables: {
      input,
      language,
    },
  });

  if (!customerActivateRes.body.data.customerCreate) {
    return undefined;
  }

  return customerActivateRes.body.data.customerCreate;
}

export async function resendEmailActivationUrl({ input, language = defaultLanguage }) {
  input.password = DEFAULT_PASSWORD;

  const customerActivateRes = await shopifyStorefrontApi({
    query: customerActivateMutation,
    variables: {
      input,
      language,
    },
  });

  if (!customerActivateRes.body.data.customerCreate) {
    return undefined;
  }

  return customerActivateRes.body.data.customerCreate;
}

export async function loginCustomer({ input }) {
  const res = await shopifyStorefrontApi({
    query: customerLoginMutation,
    variables: { input },
  });

  if (!res.body.data.customerAccessTokenCreate) {
    return undefined;
  }

  return res.body.data.customerAccessTokenCreate;
}

export async function retrieveCustomerInfoByToken({ customerAccessToken, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: retrieveCustomerInfoByTokenQuery,
    variables: { customerAccessToken, language },
  });

  if (!res.body.data.customer) {
    return undefined;
  }

  return reshapeCustomer(res.body.data.customer);
}

export async function retrieveCustomerInfoByEmail({ email }) {
  const res = await shopifyAdminApi({
    query: retrieveCustomerInfoByEmailQuery,
    variables: { email },
  });

  if (!res.body.data.customers) {
    return undefined;
  }

  return removeEdgesAndNodes(res.body.data.customers);
}

export async function activateCustomerAccount({ id, input }) {
  const res = await shopifyStorefrontApi({
    query: activateCustomerAccountMutation,
    variables: { id, input },
  });

  if (!res.body.data.customerActivate) {
    return undefined;
  }

  return res.body.data.customerActivate;
}

export async function sendRecoverCustomerAccountRequest({ email, language = defaultLanguage }) {
  const res = await shopifyStorefrontApi({
    query: recoverCustomerAccountMutation,
    variables: { email, language },
  });

  if (!res.body.data.customerRecover) {
    return undefined;
  }

  return res.body.data.customerRecover;
}

export async function resetCustomerAccount({ id, input }) {
  const res = await shopifyStorefrontApi({
    query: resetCustomerAccountMutation,
    variables: { id, input },
  });

  if (!res.body.data.customerReset) {
    return undefined;
  }

  return res.body.data.customerReset;
}

export async function adminUpdateCustomer({ input }) {
  const res = await shopifyAdminApi({
    query: adminUpdateCustomerMutation,
    variables: { input },
  });

  if (!res.body.data.customerUpdate) {
    return undefined;
  }

  return res.body.data.customerUpdate;
}

export async function adminUpdateCustomerEmailMarketingConsent({ input }) {
  if (input?.acceptsMarketing) {
    input.emailMarketingConsent = {
      consentUpdatedAt: new Date().toISOString(),
      marketingOptInLevel: EMAIL_MARKETING_CONSENT.marketingOptInLevel.singleOptIn,
      marketingState: EMAIL_MARKETING_CONSENT.marketingState.subscribed,
    };
    // acceptsMarketing is depracated in the admin api and will be removed in future releases.
    delete input.acceptsMarketing;
  }

  const res = await shopifyAdminApi({
    query: adminUpdateCustomerEmailMarketingConsentMutation,
    variables: { input },
  });

  if (!res.body.data.customerEmailMarketingConsentUpdate) {
    return undefined;
  }

  return res.body.data.customerEmailMarketingConsentUpdate;
}
