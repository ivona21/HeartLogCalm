import { MAX_SELECTED_EMOTIONS } from '@/features/emotion-wheel/constants/emotion-hierarchy.ts';

export const PENDING_AUTH_EMOTION_SELECTION_KEY = 'pending-auth-emotion-selection';
const LEGACY_GUEST_EMOTION_SELECTION_KEY = 'pending-emotion-selection';
export const PENDING_AUTH_EMOTION_SELECTION_TTL_MS = 4 * 60 * 60 * 1000;

export type PendingAuthEmotionSelection = {
  emotionIds: string[];
  createdAt: number;
};

function sanitizeEmotionIds(emotionIds: unknown): string[] {
  if (!Array.isArray(emotionIds)) {
    return [];
  }

  return Array.from(new Set(emotionIds.filter((emotionId) => typeof emotionId === 'string')))
    .filter(Boolean)
    .slice(0, MAX_SELECTED_EMOTIONS);
}

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isExpired(createdAt: number, now = Date.now()): boolean {
  return now - createdAt > PENDING_AUTH_EMOTION_SELECTION_TTL_MS;
}

export function clearPendingAuthEmotionSelection(): void {
  getLocalStorage()?.removeItem(PENDING_AUTH_EMOTION_SELECTION_KEY);
}

export function clearLegacyGuestEmotionSelectionStorage(): void {
  getLocalStorage()?.removeItem(LEGACY_GUEST_EMOTION_SELECTION_KEY);
}

export function savePendingAuthEmotionSelection(emotionIds: string[]): void {
  const sanitizedEmotionIds = sanitizeEmotionIds(emotionIds);

  if (sanitizedEmotionIds.length === 0) {
    clearPendingAuthEmotionSelection();
    return;
  }

  const storage = getLocalStorage();

  if (!storage) {
    return;
  }

  storage.setItem(
    PENDING_AUTH_EMOTION_SELECTION_KEY,
    JSON.stringify({
      emotionIds: sanitizedEmotionIds,
      createdAt: Date.now(),
    } satisfies PendingAuthEmotionSelection),
  );
}

export function readPendingAuthEmotionSelection(
  now = Date.now(),
): PendingAuthEmotionSelection | null {
  const storage = getLocalStorage();

  if (!storage) {
    return null;
  }

  const rawValue = storage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<PendingAuthEmotionSelection>;
    const emotionIds = sanitizeEmotionIds(parsedValue.emotionIds);
    const createdAt = parsedValue.createdAt;

    if (typeof createdAt !== 'number' || !Number.isFinite(createdAt) || emotionIds.length === 0) {
      clearPendingAuthEmotionSelection();
      return null;
    }

    if (isExpired(createdAt, now)) {
      clearPendingAuthEmotionSelection();
      return null;
    }

    return { emotionIds, createdAt };
  } catch {
    clearPendingAuthEmotionSelection();
    return null;
  }
}

export function consumePendingAuthEmotionSelection(
  now = Date.now(),
): PendingAuthEmotionSelection | null {
  const pendingSelection = readPendingAuthEmotionSelection(now);

  if (pendingSelection) {
    clearPendingAuthEmotionSelection();
  }

  return pendingSelection;
}
