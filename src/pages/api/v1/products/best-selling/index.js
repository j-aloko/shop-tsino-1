import Cors from 'cors';

import corsMiddleware from '../../../../../lib/middleware/corsMiddleware';
import { getBestSellingProduct } from '../../../../../services/shopify/api-queries/products';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { first, sortKey } = body;
  const requiredFields = [];
  if (!first) requiredFields.push('first');
  if (!sortKey) requiredFields.push('sortKey');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    const { reverse = null, sortKey = null, first, after = null, language, country } = req.body;

    const response = await getBestSellingProduct({ after, country, first, language, reverse, sortKey });
    return res.status(200).json(response[0]);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
