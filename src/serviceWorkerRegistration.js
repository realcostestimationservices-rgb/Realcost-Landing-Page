const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(window.location.hostname)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    // The new worker calls skipWaiting() below, which swaps the controller out
    // from under a page still running the old bundle's assets. Reload once so
    // the whole tab comes up on the new deployment rather than a mix of both.
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.onstatechange = () => {
          if (installing.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content available — signal SW to skip waiting and activate
              installing.postMessage({ type: 'SKIP_WAITING' });
              if (config && config.onUpdate) config.onUpdate(registration);
            } else {
              if (config && config.onSuccess) config.onSuccess(registration);
            }
          }
        };
      };

      // The browser only re-fetches service-worker.js on navigation, so a tab
      // left open never sees a deployment. Ask explicitly, and again whenever
      // the tab is brought back to the foreground.
      setInterval(() => registration.update(), 5 * 60 * 1000);
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) registration.update();
      });
    })
    .catch((err) => console.error('SW registration failed:', err));
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType && !contentType.includes('javascript'))
      ) {
        navigator.serviceWorker.ready.then((reg) =>
          reg.unregister().then(() => window.location.reload())
        );
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.info('No internet connection — app running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => reg.unregister())
      .catch((err) => console.error(err.message));
  }
}
