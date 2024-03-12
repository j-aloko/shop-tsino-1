import Cors from 'cors';

import corsMiddleware from '../../../../../../lib/middleware/corsMiddleware';
import { getAutomaticBasicDiscounts } from '../../../../../../services/shopify/api-queries/discounts';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const response = await getAutomaticBasicDiscounts();
    return res.status(200).json(response);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
