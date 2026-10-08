function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set as a build-time environment variable.`);
  }
  return value;
}

export const APP_URL = requireEnv('REACT_APP_APP_URL');
export const LOGIN_URL = `${APP_URL}login`;
export const API_BASE_URL = requireEnv('REACT_APP_API_BASE_URL');

/*
 * Base URL for static media (everything under /images and /downloads).
 * In production this is the CloudFront distribution in front of the S3 bucket,
 * e.g. REACT_APP_ASSET_BASE_URL="https://dxxxx.cloudfront.net".
 * Left empty it falls back to PUBLIC_URL, so `npm start` serves the files from
 * the local public/ folder with no CDN needed. The trailing slash is trimmed so
 * callers always pass a leading-slash path.
 */
export const ASSET_BASE_URL = (
  process.env.REACT_APP_ASSET_BASE_URL ||
  process.env.PUBLIC_URL ||
  ''
).replace(/\/+$/, '');

/** Resolve a public asset path (e.g. '/images/home/hero/intro.webp') to its full URL. */
export const asset = (path = '') =>
  `${ASSET_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
