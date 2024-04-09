import { CUSTOMER_ACCOUNT_STATES, STOREFRONT_ERRORS } from '../../../constant/shopify';
import { isTokenExpired } from '../../../utils/auth';
import { parseCookies, setCookie } from '../../../utils/cookies';
import { getCart, updateCartBuyerIdentity } from '../api-queries/cart';
import {
  activateCustomerAccount,
  adminUpdateCustomer,
  adminUpdateCustomerEmailMarketingConsent,
  loginCustomer,
  resendEmailActivationUrl,
  resetCustomerAccount,
  retrieveCustomerInfoByEmail,
  retrieveCustomerInfoByToken,
  sendRecoverCustomerAccountRequest,
  signUpCustomer,
} from '../api-queries/customers';

export const handleSignUp = async (req, res) => {
  const { email, firstName, lastName, acceptsMarketing, language } = req.body;

  // First, retrieve the user's info using the email
  const userInfo = await retrieveCustomerInfoByEmail({ email });

  // If the user does not exist, continue the normal flow of signup
  if (!userInfo || userInfo.length === 0) {
    const response = await signUpCustomer({ input: { acceptsMarketing, email, firstName, lastName }, language });
    return res.status(200).json(response);
  }

  // If the user exists and user is disabled, invited or declined and there is no first name and last name, update the user's information and resend an email activation url
  if (
    userInfo[0].firstName === null &&
    userInfo[0].lastName === null &&
    (userInfo[0].state === CUSTOMER_ACCOUNT_STATES.disabled || userInfo[0].state === CUSTOMER_ACCOUNT_STATES.invited || userInfo[0].state === CUSTOMER_ACCOUNT_STATES.declined)
  ) {
    const customerUpdateResponse = await adminUpdateCustomer({ input: { firstName, id: userInfo[0].id, lastName } });
    if (customerUpdateResponse.userErrors?.length > 0) {
      return res.status(200).json(customerUpdateResponse);
    }

    if (acceptsMarketing) {
      // update email marketting consent
      const emailConsentUpdateResponse = await adminUpdateCustomerEmailMarketingConsent({ input: { acceptsMarketing, customerId: userInfo[0].id } });
      if (emailConsentUpdateResponse.userErrors?.length > 0) {
        return res.status(200).json(emailConsentUpdateResponse);
      }
    }

    // Resend customer activation url by attempting to re-create an existing user
    const resendEmailActivationUrlResponse = await resendEmailActivationUrl({ input: { acceptsMarketing, email, firstName, lastName }, language });
    return res.status(200).json(resendEmailActivationUrlResponse);
  }

  // If the user exists and there is a first name, and last name but user is disabled, invited or declined, update first and last name and resend activation email
  if (
    userInfo[0].firstName &&
    userInfo[0].lastName &&
    (userInfo[0].state === CUSTOMER_ACCOUNT_STATES.disabled || userInfo[0].state === CUSTOMER_ACCOUNT_STATES.invited || userInfo[0].state === CUSTOMER_ACCOUNT_STATES.declined)
  ) {
    const customerUpdateResponse = await adminUpdateCustomer({ input: { firstName, id: userInfo[0].id, lastName } });
    if (customerUpdateResponse.userErrors?.length > 0) {
      return res.status(200).json(customerUpdateResponse);
    }

    if (acceptsMarketing) {
      // update email marketting consent
      const emailConsentUpdateResponse = await adminUpdateCustomerEmailMarketingConsent({ input: { acceptsMarketing, customerId: userInfo[0].id } });
      if (emailConsentUpdateResponse.userErrors?.length > 0) {
        return res.status(200).json(emailConsentUpdateResponse);
      }
    }

    // Resend customer activation url by attempting to re-create an existing user
    const resendEmailActivationUrlResponse = await resendEmailActivationUrl({ input: { acceptsMarketing, email, firstName, lastName }, language });
    return res.status(200).json(resendEmailActivationUrlResponse);
  }

  // If the user exists and there is a first name, and last name and user is enabled, return an error message
  if (userInfo[0].firstName && userInfo[0].lastName && userInfo[0].state === CUSTOMER_ACCOUNT_STATES.enabled) {
    return res.status(400).json({ message: "The user's email is already taken." });
  }
  return res.status(400).json({ message: 'An unexpected error occurred.' });
};

export const handleResendActivationEmail = async (req, res) => {
  const { email, firstName, lastName, acceptsMarketing, language } = req.body;
  const response = await resendEmailActivationUrl({ input: { acceptsMarketing, email, firstName, lastName }, language });
  return res.status(200).json(response);
};

export const handleActivateAccount = async (req, res) => {
  const { activationToken, id, password } = req.body;
  const activateAccountResponse = await activateCustomerAccount({ id, input: { activationToken, password } });

  return res.status(200).json(activateAccountResponse);
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const { language } = req.query;

  const userInfo = await retrieveCustomerInfoByEmail({ email });

  // If the user exists with a first and last name but the user is disabled resend an activation email. Else, continue with the normal flow of login
  if (userInfo && userInfo.length > 0 && userInfo[0].firstName && userInfo[0].lastName && userInfo[0].state === CUSTOMER_ACCOUNT_STATES.disabled) {
    const resendEmailActivationUrlResponse = await resendEmailActivationUrl({ input: { email, firstName: userInfo[0].firstName, lastName: userInfo[0].lastName }, language });
    return res.status(200).json(resendEmailActivationUrlResponse);
  }

  const loginResponse = await loginCustomer({ input: { email, password } });
  if (loginResponse.customerUserErrors.length > 0) {
    return res.status(200).json(loginResponse);
  }
  if (loginResponse.customerAccessToken && loginResponse.customerUserErrors.length === 0) {
    await setCookie(res, 'customerAccessToken', loginResponse.customerAccessToken, 60 * 60 * 24 * 7);
    const customerResponse = await retrieveCustomerInfoByToken({ customerAccessToken: loginResponse.customerAccessToken.accessToken, language });

    // Update buyerIdentity of the cart if available, after successful login
    const cookies = await parseCookies(req);

    const { cartId } = cookies;
    let cart;

    if (cartId) {
      cart = await getCart({ cartId, language });
    }

    const buyerIdentity = {
      customer: {
        displayName: customerResponse.displayName,
        email: customerResponse.email,
        firstName: customerResponse.firstName,
        lastName: customerResponse.lastName,
      },
      customerAccessToken: loginResponse.customerAccessToken.accessToken,
      email: customerResponse.email,
    };

    if (cart && buyerIdentity && (cart.buyerIdentity.customer === null || cart.buyerIdentity.customer === undefined)) {
      const updatedCartResponse = await updateCartBuyerIdentity({ buyerIdentity, cartId: cart.id, language });
      if (!updatedCartResponse?.userErrors?.length) {
        cart = updatedCartResponse || cart;
      }
    }

    return res.status(200).json(customerResponse);
  }
  return res.status(500).json({ message: 'Login request failed' });
};

export const handleLogout = async (req, res) => {
  const cookies = await parseCookies(req);
  const { customerAccessToken } = cookies;

  if (customerAccessToken) {
    await setCookie(res, 'customerAccessToken', '', 0);
    return res.status(200).json({ message: 'Logout successful' });
  }
  return res.status(404).json({ message: 'No valid customerAccessToken found' });
};

export const handleRequestPasswordResetLink = async (req, res) => {
  const { email, language } = req.body;
  const requestPasswordResetLinkResponse = await sendRecoverCustomerAccountRequest({ email, language });

  if (requestPasswordResetLinkResponse.customerUserErrors.length > 0) {
    return res.status(200).json(requestPasswordResetLinkResponse);
  }

  const message = `We have sent an email to ${email}, please click the link included to reset your password.`;
  return res.status(200).json({ message });
};

export const handleResetPassword = async (req, res) => {
  const { id, password, resetToken } = req.body;
  const resetPasswordResponse = await resetCustomerAccount({ id, input: { password, resetToken } });

  return res.status(200).json(resetPasswordResponse);
};

export const handleCustomerInfo = async (req, res) => {
  const { language } = req.query;

  const cookies = await parseCookies(req);

  if (cookies?.customerAccessToken) {
    const customerAccessToken = JSON.parse(cookies.customerAccessToken);
    const { accessToken, expiresAt } = customerAccessToken;

    if (!isTokenExpired(expiresAt)) {
      const customerResponse = await retrieveCustomerInfoByToken({ customerAccessToken: accessToken, language });
      return res.status(200).json(customerResponse);
    }

    return res.status(401).json({ message: STOREFRONT_ERRORS.tokenExpired });
  }

  // If there is no customerAccessToken in the cookies, it means the user has not logged in before.
  // In this case, we return a 200 status with null data, indicating that no user is currently logged in.
  // We choose to return a 200 status instead of a 404 to prevent API errors from showing up in the console,
  // since login is not required in the ecommerce app.
  return res.status(200).json(null);
};
