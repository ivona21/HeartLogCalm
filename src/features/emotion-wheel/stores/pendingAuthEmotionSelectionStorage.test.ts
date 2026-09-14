import { beforeEach, describe, expect, it } from 'vitest';
import {
  PENDING_AUTH_EMOTION_SELECTION_KEY,
  PENDING_AUTH_EMOTION_SELECTION_TTL_MS,
  consumePendingAuthEmotionSelection,
  readPendingAuthEmotionSelection,
  savePendingAuthEmotionSelection,
} from './pendingAuthEmotionSelectionStorage';

describe('pending auth emotion selection storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('stores pending auth handoff selections in localStorage only', () => {
    savePendingAuthEmotionSelection(['joy', 'sadness']);

    expect(readPendingAuthEmotionSelection()).toMatchObject({
      emotionIds: ['joy', 'sadness'],
    });
    expect(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY)).not.toBeNull();
    expect(sessionStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY)).toBeNull();
  });

  it('consumes valid pending auth state once and removes it after restoration', () => {
    savePendingAuthEmotionSelection(['anger']);

    expect(consumePendingAuthEmotionSelection()).toMatchObject({
      emotionIds: ['anger'],
    });
    expect(readPendingAuthEmotionSelection()).toBeNull();
    expect(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY)).toBeNull();
  });

  it('does not restore expired pending auth state and deletes it', () => {
    const createdAt = 1_000;

    localStorage.setItem(
      PENDING_AUTH_EMOTION_SELECTION_KEY,
      JSON.stringify({ emotionIds: ['fear'], createdAt }),
    );

    expect(
      readPendingAuthEmotionSelection(createdAt + PENDING_AUTH_EMOTION_SELECTION_TTL_MS + 1),
    ).toBeNull();
    expect(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY)).toBeNull();
  });

  it('ignores malformed pending auth state and clears it', () => {
    localStorage.setItem(PENDING_AUTH_EMOTION_SELECTION_KEY, 'not json');

    expect(readPendingAuthEmotionSelection()).toBeNull();
    expect(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY)).toBeNull();
  });
});
