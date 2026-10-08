import { useEffect } from 'react';
import IMAGE_MANIFEST from '../config/imageManifest';
import { asset } from '../config';

/**
 * Warms the browser cache with every image in the manifest so later navigation
 * doesn't pop in — but deliberately WITHOUT competing with the first paint.
 *
 * The warming is held back until the page has finished loading and the browser
 * is idle, and each request is issued at low fetch priority. That way the hero
 * and above-the-fold assets of the landing page download first; the rest of the
 * site is pulled in quietly afterwards.
 */
export default function usePreloadImages() {
  useEffect(() => {
    let idleHandle;
    let cancelled = false;
    const images = [];

    const warm = () => {
      if (cancelled) return;
      IMAGE_MANIFEST.forEach((path) => {
        const img = new Image();
        // Low priority so these never contend with visible content.
        try { img.fetchPriority = 'low'; } catch (e) { /* unsupported — ignore */ }
        img.decoding = 'async';
        img.src = asset(path);
        images.push(img);
      });
    };

    // Wait until the browser is idle (falling back to a short timer), and not
    // before the initial load has settled, so warming starts after first paint.
    const schedule = () => {
      if (cancelled) return;
      if ('requestIdleCallback' in window) {
        idleHandle = window.requestIdleCallback(warm, { timeout: 4000 });
      } else {
        idleHandle = window.setTimeout(warm, 1500);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
      if (idleHandle != null) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
      // Drop references so in-flight fetches can be GC'd if unmounted early.
      images.forEach((img) => { img.src = ''; });
    };
  }, []);
}
