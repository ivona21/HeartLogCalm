const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const ENABLED = import.meta.env.VITE_ENABLE_BACKEND_WARMUP === 'true';

const ACTIVITY_WINDOW_MS = 10 * 60 * 1000;
const WARMUP_COOLDOWN_MS = 10 * 60 * 1000;
const ACTIVITY_THROTTLE_MS = 1000;
const REQUEST_TIMEOUT_MS = 90 * 1000;

let started = false;

/** Temporary Render Free cold-start workaround; disable/remove when hosting is always-on. */
export function startBackendWarmup(): void {
  if (!ENABLED || started || typeof window === 'undefined') return;
  started = true;

  let lastActivityAt = Date.now();
  let lastActivityUpdateAt = 0;
  let lastWarmupAttemptAt = 0;
  let requestInFlight = false;

  const warmup = () => {
    if (document.visibilityState !== 'visible' || requestInFlight) return;
    const now = Date.now();
    if (now - lastWarmupAttemptAt < WARMUP_COOLDOWN_MS) return;
    if (now - lastActivityAt > ACTIVITY_WINDOW_MS) return;

    lastWarmupAttemptAt = now;
    requestInFlight = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    void fetch(`${API_URL}/health`, { signal: controller.signal })
      .catch(() => undefined)
      .finally(() => {
        window.clearTimeout(timeout);
        requestInFlight = false;
      });
  };

  const onActivity = () => {
    const now = Date.now();
    if (now - lastActivityUpdateAt < ACTIVITY_THROTTLE_MS) return;
    const wasInactive = now - lastActivityAt > ACTIVITY_WINDOW_MS;
    lastActivityAt = now;
    lastActivityUpdateAt = now;
    if (wasInactive) warmup();
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      lastActivityAt = Date.now();
      warmup();
    }
  };

  window.addEventListener('pointerdown', onActivity, { passive: true });
  window.addEventListener('keydown', onActivity);
  document.addEventListener('visibilitychange', onVisibilityChange);

  warmup();

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      onVisibilityChange();
    }
  });
}
