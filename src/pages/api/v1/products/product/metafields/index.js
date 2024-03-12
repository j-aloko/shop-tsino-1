import Cors from 'cors';

import corsMiddleware from '../../../../../../lib/middleware/corsMiddleware';
import { shopifyAdminApi } from '../../../../../../services/shopify/api-handler/apiHandler';
import { createMetafieldDefinitionMutation, createMetafieldVisibilityMutation } from '../../../../../../services/shopify/queries-and-mutations/metafields';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { name, namespace, key, ownerType, type } = body;
  const requiredFields = [];
  if (!name) requiredFields.push('name');
  if (!namespace) requiredFields.push('namespace');
  if (!key) requiredFields.push('key');
  if (!ownerType) requiredFields.push('ownerType');
  if (!type) requiredFields.push('type');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    let response;

    const definition = req.body;
    const { key, namespace, ownerType } = definition;

    const input = { key, namespace, ownerType };

    // create metafield definition
    response = await shopifyAdminApi({
      query: createMetafieldDefinitionMutation,
      variables: { definition },
    });

    // create metafield visibility
    response = await shopifyAdminApi({
      query: createMetafieldVisibilityMutation,
      variables: { input },
    });

    const data = response.body;

    if (data.errors) {
      return res.status(400).json({ error: data.errors });
    }
    return res.status(200).json(data);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
