import Cors from 'cors';

import corsMiddleware from '../../../../../../lib/middleware/corsMiddleware';
import { addMetafieldToProduct, fetchProductMetafields } from '../../../../../../services/shopify/api-queries/products';
import { removeEdgesAndNodes } from '../../../../../../services/shopify/utils/utils';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { name, email, reviewTitle, rating, review } = body;
  const requiredFields = [];
  if (!name) requiredFields.push('name');
  if (!email) requiredFields.push('email');
  if (!reviewTitle) requiredFields.push('reviewTitle');
  if (!rating) requiredFields.push('rating');
  if (!review) requiredFields.push('review');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body.review);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    const {
      body: { productId, review },
    } = req;

    let data = {};

    const productReviewmetafield = await fetchProductMetafields({
      key: 'reviews',
      namespace: 'product_reviews',
      productId,
    });
    let currentReviews = [];
    if (productReviewmetafield) {
      const parsedValue = JSON.parse(productReviewmetafield.value);
      if (Array.isArray(parsedValue)) {
        currentReviews = parsedValue;
      } else if (typeof parsedValue === 'object') {
        currentReviews = [parsedValue];
      }
    }

    // Check if the review is being updated
    if (review.isUpdated) {
      const reviewIndex = currentReviews.findIndex((_review) => _review.email === review.email);
      if (reviewIndex !== -1) {
        currentReviews.splice(reviewIndex, 1, review);
      }
    } else {
      currentReviews.push(review);
    }

    data = await addMetafieldToProduct({
      key: 'reviews',
      metafieldId: productReviewmetafield?.id,
      namespace: 'product_reviews',
      productId,
      type: 'json',
      value: currentReviews,
    });
    if (data.userErrors?.length > 0) {
      return res.status(400).json({ message: data.userErrors[0].message });
    }

    const averageRatingMetafield = await fetchProductMetafields({
      key: 'rating',
      namespace: 'average_rating',
      productId,
    });
    const newAverageRating = currentReviews.reduce((sum, _review) => sum + _review.rating, 0) / currentReviews.length;
    data = await addMetafieldToProduct({
      key: 'rating',
      metafieldId: averageRatingMetafield?.id,
      namespace: 'average_rating',
      productId,
      type: 'single_line_text_field',
      value: newAverageRating,
    });
    if (data.userErrors?.length > 0) {
      return res.status(400).json({ message: data.userErrors[0].message });
    }
    return res.status(200).json({ product: { id: data.product.id, metafields: removeEdgesAndNodes(data.product.metafields) } });
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
