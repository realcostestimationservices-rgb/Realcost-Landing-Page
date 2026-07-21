/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly } from 'workbox-strategies';

clientsClaim();

// Precache all build assets (CRA injects the manifest here at build time)
precacheAndRoute(self.__WB_MANIFEST);

// version.json is how the app learns a new build exists — it must never be
// answered from a cache, or the check would compare the old build to itself.
// Registered before the routes below so it wins the match.
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('/version.json'),
  new NetworkOnly()
);

// Skip waiting when signalled (allows immediate activation on update)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// SPA navigation fallback — all same-origin navigations serve index.html
const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/;
registerRoute(
  ({ request, url, sameOrigin }) =>
    request.mode === 'navigate' &&
    sameOrigin &&
    !url.pathname.startsWith('/_') &&
    !fileExtensionRegexp.test(url.pathname),
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Images: cache-first, 30-day expiry (CRA content-hashes filenames)
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    url.pathname.startsWith('/images/'),
  new CacheFirst({
    cacheName: 'rc-images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 80, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

// Google Fonts stylesheet — stale-while-revalidate, 1-year expiry
registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
    cacheName: 'rc-fonts',
    plugins: [
      new ExpirationPlugin({ maxEntries: 8, maxAgeSeconds: 365 * 24 * 60 * 60 }),
    ],
  })
);

// Pricing API — network-first so prices are always fresh; falls back to cache
registerRoute(
  ({ url }) => url.origin === process.env.REACT_APP_API_BASE_URL,
  new NetworkFirst({
    cacheName: 'rc-api',
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 }),
    ],
  })
);
