import Cors from 'cors';

import { EMAIL_MARKETING_CONSENT } from '../../../../constant/shopify';
import corsMiddleware from '../../../../lib/middleware/corsMiddleware';
import { adminUpdateCustomerEmailMarketingConsent, retrieveCustomerInfoByEmail, subscribeEmailMarketing } from '../../../../services/shopify/api-queries/customers';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body) {
  const { email } = body;
  const requiredFields = [];
  if (!email) requiredFields.push('email');
  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const requiredFields = validateFields(req.body);
    if (requiredFields.length > 0) {
      return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
    }

    const { email } = req.body;

    // First, retrieve the user's info using the email
    const userInfo = await retrieveCustomerInfoByEmail({ email });

    // If the user does not exist, continue the normal flow of signup
    if (!userInfo || userInfo.length === 0) {
      const response = await subscribeEmailMarketing({
        input: {
          email,
          emailMarketingConsent: {
            consentUpdatedAt: new Date().toISOString(),
            marketingOptInLevel: EMAIL_MARKETING_CONSENT.marketingOptInLevel.singleOptIn,
            marketingState: EMAIL_MARKETING_CONSENT.marketingState.subscribed,
          },
        },
      });
      return res.status(200).json(response);
    }

    // If the user exists and the marketingState of the user's emailMarketingConsent is not SUBSCRIBED, update the user's emailMarketingConsent
    if (userInfo[0].emailMarketingConsent.marketingState !== EMAIL_MARKETING_CONSENT.marketingState.subscribed) {
      const updateResponse = await adminUpdateCustomerEmailMarketingConsent({
        input: {
          acceptsMarketing: true,
          customerId: userInfo[0].id,
        },
      });

      if (updateResponse?.userErrors?.length > 0) {
        return res.status(400).json({ message: updateResponse.userErrors[0].message });
      }
      return res.status(200).json(updateResponse);
    }

    // If the user exists and the marketingState of the user's emailMarketingConsent is SUBSCRIBED, return an error message
    if (userInfo[0].emailMarketingConsent.marketingState === EMAIL_MARKETING_CONSENT.marketingState.subscribed) {
      return res.status(400).json({ message: "The user's email is already subscribed." });
    }
  }

  res.setHeader('Allow', 'POST');
  return res.status(405).end('Method Not Allowed');
}
