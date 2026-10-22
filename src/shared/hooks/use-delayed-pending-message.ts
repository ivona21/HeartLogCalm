import { useEffect, useState } from 'react';

const DEFAULT_DELAY_MS = 3000;

export function useDelayedPendingMessage(
  isPending: boolean,
  message: string,
  delayMs = DEFAULT_DELAY_MS,
): string | null {
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    if (!isPending) {
      setIsDelayed(false);
      return;
    }

    const timeout = window.setTimeout(() => setIsDelayed(true), delayMs);
    return () => window.clearTimeout(timeout);
  }, [delayMs, isPending]);

  return isDelayed ? message : null;
}
