import Cors from 'cors';

import corsMiddleware from '../../../../../../lib/middleware/corsMiddleware';
import { addCartItem, getCartItems, removeItem, updateItemQuantity } from '../../../../../../services/shopify/actions/cart';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  const { method } = req;

  switch (method) {
    case 'POST': {
      const { action, payload } = req.body;
      let result;

      try {
        if (action === 'add') {
          const { selectedVariantId, quantity } = payload;
          if (!selectedVariantId) {
            res.status(404).json({ error: 'Missing selectedVariantId in payload' });
            return;
          }
          if (!quantity) {
            res.status(404).json({ error: 'Missing quantity in payload' });
            return;
          }
          result = await addCartItem(req, res, selectedVariantId, quantity);
        } else if (action === 'remove') {
          const { lineId } = payload;
          if (!lineId) {
            res.status(404).json({ error: 'Missing lineId in payload' });
            return;
          }
          result = await removeItem(req, res, lineId);
        } else if (action === 'update') {
          const { lineId, variantId, quantity } = payload;
          if (!lineId || !variantId || !quantity) {
            res.status(404).json({ error: 'Missing lineId, variantId, or quantity in payload' });
            return;
          }
          result = await updateItemQuantity(req, res, payload);
        } else if (action === 'get') {
          result = await getCartItems(req);
        } else {
          res.status(400).json({ error: 'Invalid action' });
          return;
        }

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
