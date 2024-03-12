export const DEFAULT_PASSWORD = 'FlipHub1234!';

export const CUSTOMER_ACCOUNT_STATES = {
  declined: 'DECLINED',
  disabled: 'DISABLED',
  enabled: 'ENABLED',
  invited: 'INVITED',
};

export const STOREFRONT_ERRORS = {
  customerDisabled: 'CUSTOMER_DISABLED',
  tokenExpired: 'TOKEN_EXPIRED',
  unidentifiedCustomer: 'UNIDENTIFIED_CUSTOMER',
};

export const EMAIL_MARKETING_CONSENT = {
  marketingOptInLevel: {
    confirmedOptIn: 'CONFIRMED_OPT_IN',
    singleOptIn: 'SINGLE_OPT_IN',
    unknown: 'UNKNOWN',
  },
  marketingState: {
    invalid: 'INVALID',
    notSubscribed: 'NOT_SUBSCRIBED',
    pending: 'PENDING',
    redacted: 'REDACTED',
    subscribed: 'SUBSCRIBED',
    unsubscribed: 'UNSUBSCRIBED',
  },
};

export const orderFinancialStatusDisplayMap = {
  AUTHORIZED: 'Authorized by',
  PAID: 'Paid by',
  PARTIALLY_PAID: 'Partially paid by',
  PARTIALLY_REFUNDED: 'Partially refunded to',
  PENDING: 'Payment pending from',
  REFUNDED: 'Refunded to',
  VOIDED: 'Payment voided by',
};

export const DISCOUNT_STATUS = {
  active: 'ACTIVE',
  expired: 'EXPIRED',
  scheduled: 'SCHEDULED',
};
