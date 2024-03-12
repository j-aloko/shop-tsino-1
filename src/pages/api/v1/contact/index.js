import Cors from 'cors';

import corsMiddleware from '../../../../lib/middleware/corsMiddleware';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { email, name, message } = body;
  const requiredFields = [];
  if (!name) requiredFields.push('name');
  if (!email) requiredFields.push('email');
  if (!message) requiredFields.push('message');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    // const { email, name, message } = req.body;

    // TODO: Implement a third-party email service,
    // to facilitate the transmission of contact form data to the relevant merchant's email address.

    return res.status(200).json('success');
  }
  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
