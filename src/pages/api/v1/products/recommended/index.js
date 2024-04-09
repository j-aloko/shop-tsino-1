import Cors from 'cors';

import corsMiddleware from '../../../../../lib/middleware/corsMiddleware';
import { getProductRecommendations } from '../../../../../services/shopify/api-queries/products';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { productId } = body;
  const requiredFields = [];
  if (!productId) requiredFields.push('productId');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    const { language, country, productId } = req.body;

    const response = await getProductRecommendations({ country, language, productId });
    return res.status(200).json(response);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
