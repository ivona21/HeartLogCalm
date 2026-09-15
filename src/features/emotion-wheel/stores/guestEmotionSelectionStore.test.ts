import { beforeEach, describe, expect, it } from 'vitest';
import { useGuestEmotionSelectionStore } from './guestEmotionSelectionStore';

function resetGuestSelectionStore() {
  useGuestEmotionSelectionStore.setState({
    selectionOrder: [],
    updatedAt: null,
  });
}

describe('useGuestEmotionSelectionStore', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    resetGuestSelectionStore();
  });

  it('persists guest emotion selections in sessionStorage and restores them on rehydrate', async () => {
    useGuestEmotionSelectionStore.getState().setGuestSelection(['joy', 'joy.content']);
    const storageKey = sessionStorage.key(0);
    const persistedSelection = storageKey ? sessionStorage.getItem(storageKey) : null;

    expect(storageKey).not.toBeNull();
    expect(persistedSelection).not.toBeNull();

    resetGuestSelectionStore();
    sessionStorage.setItem(storageKey!, persistedSelection!);
    expect(useGuestEmotionSelectionStore.getState().selectionOrder).toEqual([]);

    await useGuestEmotionSelectionStore.persist.rehydrate();

    expect(useGuestEmotionSelectionStore.getState().selectionOrder).toEqual(['joy', 'joy.content']);
  });

  it('does not store normal guest emotion selections in localStorage', () => {
    useGuestEmotionSelectionStore.getState().setGuestSelection(['sadness']);

    expect(sessionStorage.length).toBeGreaterThan(0);
    expect(localStorage.length).toBe(0);
  });
});
