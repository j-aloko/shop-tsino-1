export async function parseCookies(req) {
  const { parse } = await import('cookie');
  if (!req.headers.cookie) {
    return {};
  }
  return parse(req.headers.cookie);
}

export async function setCookie(res, name, value, maxAge = null) {
  const cookie = await import('cookie');

  const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;

  const options = {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  };

  if (maxAge !== null) {
    options.maxAge = maxAge;
  }

  res.setHeader('Set-Cookie', cookie.serialize(name, cookieValue, options));
}
