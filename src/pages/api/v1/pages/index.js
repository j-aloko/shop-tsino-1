import Cors from 'cors';

import corsMiddleware from '../../../../lib/middleware/corsMiddleware';
import { getPage } from '../../../../services/shopify/api-queries/pages';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(query) {
  const { page } = query;
  const requiredFields = [];
  if (!page) requiredFields.push('page');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.query);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    const { page, language } = req.query;
    const response = await getPage({ handle: page, language });
    return res.status(200).json(response);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
