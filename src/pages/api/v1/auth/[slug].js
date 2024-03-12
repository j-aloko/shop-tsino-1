import Cors from 'cors';

import corsMiddleware from '../../../../lib/middleware/corsMiddleware';
import {
  handleActivateAccount,
  handleCustomerInfo,
  handleLogin,
  handleLogout,
  handleRequestPasswordResetLink,
  handleResendActivationEmail,
  handleResetPassword,
  handleSignUp,
} from '../../../../services/shopify/actions/customers';

const cors = Cors({
  methods: ['POST'],
  origin: process.env.HOST,
});

function validateFields(body, type) {
  const requiredFields = [];
  if (type === 'sign-up' || type === 'resend-email-activation') {
    const { email, firstName, lastName } = body;
    if (!email) requiredFields.push('email');
    if (!firstName) requiredFields.push('firstName');
    if (!lastName) requiredFields.push('lastName');
  } else if (type === 'activate-account') {
    const { id, password, activationToken } = body;
    if (!id) requiredFields.push('id');
    if (!password) requiredFields.push('password');
    if (!activationToken) requiredFields.push('activationToken');
  } else if (type === 'login') {
    const { email, password } = body;
    if (!email) requiredFields.push('email');
    if (!password) requiredFields.push('password');
  } else if (type === 'request-password-reset-link') {
    const { email } = body;
    if (!email) requiredFields.push('email');
  } else if (type === 'reset-password') {
    const { id, password, resetToken } = body;
    if (!id) requiredFields.push('id');
    if (!password) requiredFields.push('password');
    if (!resetToken) requiredFields.push('resetToken');
  }

  return requiredFields;
}

export default async function handler(req, res) {
  await corsMiddleware(req, res, cors);

  const { slug } = req.query;

  const requiredFields = validateFields(req.body, slug);
  if (requiredFields.length > 0) {
    return res.status(404).json({ error: `Required field(s): ${requiredFields.join(', ')}` });
  }

  // Switch-case for handling different actions based on slug
  switch (slug) {
    case 'sign-up':
      return handleSignUp(req, res);
    case 'resend-email-activation':
      return handleResendActivationEmail(req, res);
    case 'activate-account':
      return handleActivateAccount(req, res);
    case 'login':
      return handleLogin(req, res);
    case 'logout':
      return handleLogout(req, res);
    case 'request-password-reset-link':
      return handleRequestPasswordResetLink(req, res);
    case 'reset-password':
      return handleResetPassword(req, res);
    case 'customer-info':
      return handleCustomerInfo(req, res);
    default:
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
  }
}
