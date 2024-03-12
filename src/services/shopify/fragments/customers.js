import { imageFragment, productVariantFragment } from './products';

const emailMarkettingConsentFragment = `
  fragment markettingConsent on CustomerEmailMarketingConsentState {
    consentUpdatedAt
    marketingOptInLevel
    marketingState
  }
`;

const customerSubscriptionFragment = `
  fragment customerSubscription on Customer {
    id
    email
    emailMarketingConsent {
      ...markettingConsent
    }
    state
  }
  ${emailMarkettingConsentFragment}
`;

const orderLineItemsFragment = `
  fragment orderLineItem on OrderLineItem {
    title
    variant {
      ...productVariant
    }
    originalTotalPrice {
      amount
      currencyCode
    }
    discountAllocations {
      allocatedAmount {
        amount
        currencyCode
      }
    }
    discountedTotalPrice {
      amount
      currencyCode
    }
    quantity
  }
  ${productVariantFragment}
`;

const orderFragment = `
  fragment order on Order {
    id
    name
    orderNumber
    processedAt
    shippingAddress {
      address1
      address2
      city
      country
      zip
    }
    email
    phone
    cancelReason
    canceledAt
    currentSubtotalPrice {
      amount
      currencyCode
    }
    totalShippingPrice {
      amount
      currencyCode
    }
    currentTotalTax {
      amount
      currencyCode
    }
    currentTotalPrice {
      amount
      currencyCode
    }
    financialStatus
    fulfillmentStatus
    lineItems(first: 250) {
      edges {
        node {
          ...orderLineItem
        }
      }
    }
  }
  ${orderLineItemsFragment}
  ${imageFragment}
`;

const customerFragment = `
  fragment customer on Customer {
    id
    email
    firstName
    lastName
    displayName
    orders(first: 250) {
      edges {
        node {
          ...order
        }
      }
    }
  }
  ${orderFragment}
`;

export { emailMarkettingConsentFragment, customerSubscriptionFragment, orderFragment, customerFragment };
