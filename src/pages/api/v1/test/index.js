import { getShopDescription } from '../../../../services/shopify/api-queries/shop';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await getShopDescription({ language: 'EN' });

    return res.status(200).json(response);
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
