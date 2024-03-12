export function isTokenExpired(expiresAt) {
  const currentDate = new Date();
  const tokenExpiryDate = new Date(expiresAt);
  return currentDate > tokenExpiryDate;
}

export async function isLoggedIn(req) {
  const { parseCookies } = await import('./cookies');
  const cookies = await parseCookies(req);

  if (cookies?.customerAccessToken) {
    const customerAccessToken = JSON.parse(cookies.customerAccessToken);
    const { expiresAt } = customerAccessToken;

    return !isTokenExpired(expiresAt);
  }

  return false;
}
