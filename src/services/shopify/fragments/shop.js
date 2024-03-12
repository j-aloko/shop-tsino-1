export const shopBillingAddressFragment = `
  fragment billingAddress on ShopAddress {
    id
    address1
    address2
    city
    company
    phone
  }
`;

export const shopInfoFragment = `
  fragment shopInfo on Shop {
    contactEmail
    billingAddress {
      ...billingAddress
    }
    currencyCode
  }
  ${shopBillingAddressFragment}
`;
