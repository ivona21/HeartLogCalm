import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearAuthenticatedEntryDraft,
  hasAuthenticatedEntryDraft,
  readAuthenticatedEntryDraft,
  saveAuthenticatedEntryDraft,
} from './authenticatedEntryDraftStorage';

describe('authenticated entry draft storage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('persists authenticated drafts in sessionStorage for the current user', () => {
    saveAuthenticatedEntryDraft('user-a', {
      emotionIds: ['joy', 'joy.content'],
      comment: 'A private reflection',
    });

    expect(readAuthenticatedEntryDraft('user-a')).toEqual({
      emotionIds: ['joy', 'joy.content'],
      comment: 'A private reflection',
    });
    expect(hasAuthenticatedEntryDraft('user-a')).toBe(true);
    expect(localStorage.length).toBe(0);
  });

  it('does not restore a draft saved for one user when another user is active', () => {
    saveAuthenticatedEntryDraft('user-a', {
      emotionIds: ['anger'],
      comment: 'Only User A should see this',
    });

    expect(readAuthenticatedEntryDraft('user-b')).toBeNull();
    expect(hasAuthenticatedEntryDraft('user-b')).toBe(false);
  });

  it('clears only the requested user draft', () => {
    saveAuthenticatedEntryDraft('user-a', { emotionIds: ['joy'], comment: 'A' });
    saveAuthenticatedEntryDraft('user-b', { emotionIds: ['sadness'], comment: 'B' });

    clearAuthenticatedEntryDraft('user-a');

    expect(readAuthenticatedEntryDraft('user-a')).toBeNull();
    expect(readAuthenticatedEntryDraft('user-b')).toEqual({
      emotionIds: ['sadness'],
      comment: 'B',
    });
  });

  it('removes an existing draft when the saved draft becomes empty', () => {
    saveAuthenticatedEntryDraft('user-a', { emotionIds: ['joy'], comment: 'A' });

    saveAuthenticatedEntryDraft('user-a', { emotionIds: [], comment: '   ' });

    expect(readAuthenticatedEntryDraft('user-a')).toBeNull();
    expect(hasAuthenticatedEntryDraft('user-a')).toBe(false);
  });
});
