import Cors from 'cors';

import corsMiddleware from '../../../../lib/middleware/corsMiddleware';
import { getProducts } from '../../../../services/shopify/api-queries/products';
import { defaultFilter } from '../../../../services/shopify/constants/constants';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { first } = body;
  const requiredFields = [];
  if (!first) requiredFields.push('first');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    const { filter = defaultFilter, reverse = null, sortKey = null, first, after = null, language } = req.body;

    const response = await getProducts({ after, filter, first, language, reverse, sortKey });
    return res.status(200).json(response);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
