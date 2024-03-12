export const automaticBasicDiscountsQuery = `
query {
  discountNodes(first: 3) {
    edges {
      node {
        id
        discount {
          ... on DiscountAutomaticBasic  {
            title
            status
            summary
            shortSummary
          }
        }
      }
    }
  }
}
`;
