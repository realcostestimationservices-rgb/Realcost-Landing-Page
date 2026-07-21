import { useEffect } from 'react';
import { APP_VERSION } from '../config/version';

const VERSION_URL = `${process.env.PUBLIC_URL}/version.json`;
const POLL_INTERVAL = 5 * 60 * 1000;

const ATTEMPT_KEY = 'rc_update_attempts';
const MAX_ATTEMPTS = 2;

async function fetchDeployedVersion() {
  try {
    const res = await fetch(`${VERSION_URL}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.version || null;
  } catch {
    return null; // offline or version.json missing — keep running as-is
  }
}

async function purgeCachesAndReload() {
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
  } catch {
    /* purge is best-effort — reload regardless so the user is not stuck */
  }
  sessionStorage.removeItem('rc_plans_v1');
  localStorage.removeItem('rc_plans_v1');
  localStorage.setItem('app_version', APP_VERSION);
  window.location.reload();
}

export default function useAppUpdate() {
  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const deployed = await fetchDeployedVersion();
      if (cancelled || !deployed) return;

      if (deployed === APP_VERSION) {
        // Running the current build — clear the budget for the next deployment.
        sessionStorage.removeItem(ATTEMPT_KEY);
        return;
      }

      const attempts = Number(sessionStorage.getItem(ATTEMPT_KEY) || 0);
      if (attempts >= MAX_ATTEMPTS) {
        console.warn(
          `[update] Server reports ${deployed} but this bundle is ${APP_VERSION} ` +
          `after ${attempts} reloads. index.html is almost certainly being served ` +
          `from a cache with a long max-age — fix the Cache-Control header.`
        );
        return;
      }
      sessionStorage.setItem(ATTEMPT_KEY, String(attempts + 1));
      await purgeCachesAndReload();
    };

    check();

    const timer = setInterval(check, POLL_INTERVAL);
    const onVisible = () => { if (!document.hidden) check(); };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);

    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
    };
  }, []);
}
