import { useEffect, useRef } from 'react';
import { toast } from '@/shared/hooks/use-toast.ts';

interface UseSaveReminderToastParams {
  canShowReminder: boolean;
  hasSelection: boolean;
  blocked: boolean;
  activityKey: number;
}

const SAVE_TOAST_DELAY_MS = 5000;
const SAVE_TOAST_MESSAGE = "When you're ready, click the heart in the center to save";

export function useSaveReminderToast({
  canShowReminder,
  hasSelection,
  blocked,
  activityKey,
}: UseSaveReminderToastParams) {
  const timeoutRef = useRef<number | null>(null);
  const dismissToastRef = useRef<(() => void) | null>(null);
  const hasShownRef = useRef(false);

  useEffect(() => {
    dismissToastRef.current?.();
    dismissToastRef.current = null;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!canShowReminder || !hasSelection || blocked || hasShownRef.current) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      const activeToast = toast({
        description: SAVE_TOAST_MESSAGE,
      });

      hasShownRef.current = true;
      dismissToastRef.current = activeToast.dismiss;
    }, SAVE_TOAST_DELAY_MS);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [activityKey, blocked, canShowReminder, hasSelection]);
}
