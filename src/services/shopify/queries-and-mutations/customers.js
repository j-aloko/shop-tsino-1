import { customerFragment, customerSubscriptionFragment, emailMarkettingConsentFragment } from '../fragments/customers';

// Admin mutation
export const customerSubscribeEmailMarketingMutation = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          ...customerSubscription
        }
        userErrors {
          field
          message
        }
      }
    }
    ${customerSubscriptionFragment}
`;

// Admin mutation
export const customerCreateMutation = `
    mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
`;

// Storefront mutation
export const customerActivateMutation = `
    mutation createCustomerAccount($input: CustomerCreateInput!, $language: LanguageCode!) @inContext(language: $language) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
    `;

// Storefront mutation
export const customerLoginMutation = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
    `;

// Storefront mutation
export const retrieveCustomerInfoByTokenQuery = `
    query FetchCustomerInfo($customerAccessToken: String!, $language: LanguageCode!) @inContext(language: $language) {
      customer(customerAccessToken: $customerAccessToken) {
        ...customer
      }
    }
    ${customerFragment}
    `;

// Admin mutation
export const retrieveCustomerInfoByEmailQuery = `
  query GetCustomerByEmail($email: String!) {
    customers(first: 1, query: $email) {
      edges {
        node {
          id
          email
          firstName
          lastName
          emailMarketingConsent {
            ...markettingConsent
          }
          state
        }
      }
    }
  }
  ${emailMarkettingConsentFragment}
`;

// Storefront mutation
export const activateCustomerAccountMutation = `
    mutation activateCustomerAccount($id: ID!, $input: CustomerActivateInput!) {
      customerActivate(id: $id, input: $input) {
        customer {
          ...customer
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
    ${customerFragment}
    `;

// Storefront mutation
export const recoverCustomerAccountMutation = `
    mutation recoverCustomerAccount($email: String!, $language: LanguageCode!) @inContext(language: $language) {
      customerRecover(email: $email) {
        customerUserErrors {
          code
          field
          message
        }
      }
    }
    `;

// Storefront mutation
export const resetCustomerAccountMutation = `
    mutation resetCustomerAccount($id: ID!, $input: CustomerResetInput!) {
      customerReset(id: $id, input: $input) {
        customer {
          ...customer
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
    ${customerFragment}
`;

// Admin mutation
export const adminUpdateCustomerMutation = `
    mutation customerUpdate($input: CustomerInput!) {
      customerUpdate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          state
        }
        userErrors {
          field
          message
        }
      }
    }
    `;

// Admin mutation
export const adminUpdateCustomerEmailMarketingConsentMutation = `
    mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
      customerEmailMarketingConsentUpdate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          state
        }
        userErrors {
          field
          message
        }
      }
    }
    `;
