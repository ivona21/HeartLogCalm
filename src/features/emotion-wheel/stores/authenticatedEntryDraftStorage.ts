import { MAX_SELECTED_EMOTIONS } from '@/features/emotion-wheel/constants/emotion-hierarchy.ts';

const AUTHENTICATED_ENTRY_DRAFT_KEY_PREFIX = 'heartlog:user';

export type AuthenticatedEntryDraft = {
  emotionIds: string[];
  comment?: string;
};

function sanitizeEmotionIds(emotionIds: unknown): string[] {
  if (!Array.isArray(emotionIds)) {
    return [];
  }

  return Array.from(new Set(emotionIds.filter((emotionId) => typeof emotionId === 'string')))
    .filter(Boolean)
    .slice(0, MAX_SELECTED_EMOTIONS);
}

function sanitizeComment(comment: unknown): string {
  return typeof comment === 'string' ? comment : '';
}

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function getAuthenticatedEntryDraftKey(userId: string): string | null {
  const sanitizedUserId = userId.trim();

  if (!sanitizedUserId) {
    return null;
  }

  return `${AUTHENTICATED_ENTRY_DRAFT_KEY_PREFIX}:${encodeURIComponent(sanitizedUserId)}:entry-draft`;
}

function isDraftEmpty(draft: AuthenticatedEntryDraft): boolean {
  return draft.emotionIds.length === 0 && (draft.comment ?? '').trim() === '';
}

export function clearAuthenticatedEntryDraft(userId: string | null | undefined): void {
  if (!userId) {
    return;
  }

  const storageKey = getAuthenticatedEntryDraftKey(userId);

  if (!storageKey) {
    return;
  }

  getSessionStorage()?.removeItem(storageKey);
}

export function saveAuthenticatedEntryDraft(
  userId: string | null | undefined,
  draft: AuthenticatedEntryDraft,
): void {
  if (!userId) {
    return;
  }

  const storage = getSessionStorage();
  const storageKey = getAuthenticatedEntryDraftKey(userId);

  if (!storage || !storageKey) {
    return;
  }

  const sanitizedDraft: AuthenticatedEntryDraft = {
    emotionIds: sanitizeEmotionIds(draft.emotionIds),
    comment: sanitizeComment(draft.comment),
  };

  if (isDraftEmpty(sanitizedDraft)) {
    storage.removeItem(storageKey);
    return;
  }

  storage.setItem(storageKey, JSON.stringify(sanitizedDraft));
}

export function readAuthenticatedEntryDraft(
  userId: string | null | undefined,
): AuthenticatedEntryDraft | null {
  if (!userId) {
    return null;
  }

  const storage = getSessionStorage();
  const storageKey = getAuthenticatedEntryDraftKey(userId);

  if (!storage || !storageKey) {
    return null;
  }

  const rawValue = storage.getItem(storageKey);

  if (!rawValue) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<AuthenticatedEntryDraft>;
    const draft: AuthenticatedEntryDraft = {
      emotionIds: sanitizeEmotionIds(parsedValue.emotionIds),
      comment: sanitizeComment(parsedValue.comment),
    };

    if (isDraftEmpty(draft)) {
      storage.removeItem(storageKey);
      return null;
    }

    return draft;
  } catch {
    storage.removeItem(storageKey);
    return null;
  }
}
