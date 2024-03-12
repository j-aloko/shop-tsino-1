import Cors from 'cors';

import corsMiddleware from '../../../../../lib/middleware/corsMiddleware';
import { getShopInfo } from '../../../../../services/shopify/api-queries/shop';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const response = await getShopInfo();
    return res.status(200).json(response);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
