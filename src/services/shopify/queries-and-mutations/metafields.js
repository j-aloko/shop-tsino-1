export const createMetafieldDefinitionMutation = `
      mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
        metafieldDefinitionCreate(definition: $definition) {
          createdDefinition {
            id
            name
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `;

export const createMetafieldVisibilityMutation = `
      mutation createMetafieldStorefrontVisibility(
        $input: MetafieldStorefrontVisibilityInput!
      ) {
        metafieldStorefrontVisibilityCreate(input: $input) {
          metafieldStorefrontVisibility {
            id
            key
            ownerType
            namespace
            updatedAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;
