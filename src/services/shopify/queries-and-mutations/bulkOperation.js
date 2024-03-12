export const bulkQueryMutation = `
    mutation {
      bulkOperationRunQuery(
      query: """
        {
          products {
            edges {
              node {
                handle
              }
            }
          }
        }
        """
      ) {
        bulkOperation {
          id
          status
        }
        userErrors {
          field
          message
        }
      }
    }
    `;

export const bulkOperationDataMutation = (bulkOperationId) => `
{
  node(id: "${bulkOperationId}") {
    ... on BulkOperation {
      url
      partialDataUrl
    }
  }
}
    `;
