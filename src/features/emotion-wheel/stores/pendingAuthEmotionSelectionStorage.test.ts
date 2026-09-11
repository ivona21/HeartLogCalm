import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';

type MemoryStorage = Storage & {
  snapshot: () => Record<string, string>;
};

function createMemoryStorage(): MemoryStorage {
  const values = new Map<string, string>();

  return {
    get length() {
      return values.size;
    },
    clear: () => values.clear(),
    getItem: (key: string) => values.get(key) ?? null,
    key: (index: number) => Array.from(values.keys())[index] ?? null,
    removeItem: (key: string) => values.delete(key),
    setItem: (key: string, value: string) => values.set(key, value),
    snapshot: () => Object.fromEntries(values),
  };
}

const localStorage = createMemoryStorage();
const sessionStorage = createMemoryStorage();

Object.defineProperty(globalThis, 'window', {
  value: {
    localStorage,
    sessionStorage,
  },
  configurable: true,
});

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorage,
  configurable: true,
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: sessionStorage,
  configurable: true,
});

const pendingStorage = await import('./pendingAuthEmotionSelectionStorage.ts');
const guestStore = await import('./guestEmotionSelectionStore.ts');

const {
  PENDING_AUTH_EMOTION_SELECTION_KEY,
  PENDING_AUTH_EMOTION_SELECTION_TTL_MS,
  clearLegacyGuestEmotionSelectionStorage,
  clearPendingAuthEmotionSelection,
  consumePendingAuthEmotionSelection,
  readPendingAuthEmotionSelection,
  savePendingAuthEmotionSelection,
} = pendingStorage;
const { useGuestEmotionSelectionStore } = guestStore;

describe('guest emotion selection storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    useGuestEmotionSelectionStore.setState({ selectionOrder: [], updatedAt: null });
  });

  it('keeps normal guest wheel state in sessionStorage across same-tab refreshes', () => {
    useGuestEmotionSelectionStore.getState().setGuestSelection(['joy.content', 'sad.lonely']);

    assert.ok(sessionStorage.getItem('guest-emotion-selection'));
    assert.equal(localStorage.getItem('guest-emotion-selection'), null);
  });

  it('does not keep normal guest wheel state when a new browser session starts', () => {
    useGuestEmotionSelectionStore.getState().setGuestSelection(['joy.content']);
    sessionStorage.clear();

    assert.equal(sessionStorage.getItem('guest-emotion-selection'), null);
    assert.equal(localStorage.getItem('guest-emotion-selection'), null);
  });
});

describe('pending auth emotion selection storage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('restores guest selections after Login and consumes them once', () => {
    savePendingAuthEmotionSelection(['joy.content', 'sad.lonely']);

    assert.deepEqual(consumePendingAuthEmotionSelection()?.emotionIds, [
      'joy.content',
      'sad.lonely',
    ]);
    assert.equal(consumePendingAuthEmotionSelection(), null);
    assert.equal(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY), null);
  });

  it('restores guest selections after Register, email confirmation, and later authentication', () => {
    savePendingAuthEmotionSelection(['anger.frustrated']);

    assert.deepEqual(readPendingAuthEmotionSelection()?.emotionIds, ['anger.frustrated']);
    assert.deepEqual(consumePendingAuthEmotionSelection()?.emotionIds, ['anger.frustrated']);
  });

  it('deletes and ignores pending state older than 4 hours', () => {
    const createdAt = Date.now() - PENDING_AUTH_EMOTION_SELECTION_TTL_MS - 1;

    localStorage.setItem(
      PENDING_AUTH_EMOTION_SELECTION_KEY,
      JSON.stringify({ emotionIds: ['fear.anxious'], createdAt }),
    );

    assert.equal(readPendingAuthEmotionSelection(), null);
    assert.equal(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY), null);
  });

  it('safely deletes invalid pending localStorage JSON', () => {
    localStorage.setItem(PENDING_AUTH_EMOTION_SELECTION_KEY, '{not-json');

    assert.equal(readPendingAuthEmotionSelection(), null);
    assert.equal(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY), null);
  });

  it('clears pending guest state on logout cleanup', () => {
    savePendingAuthEmotionSelection(['joy.content']);

    clearPendingAuthEmotionSelection();

    assert.equal(localStorage.getItem(PENDING_AUTH_EMOTION_SELECTION_KEY), null);
  });

  it('clears legacy indefinitely persisted guest selections', () => {
    localStorage.setItem('pending-emotion-selection', 'old-selection');

    clearLegacyGuestEmotionSelectionStorage();

    assert.equal(localStorage.getItem('pending-emotion-selection'), null);
  });
});
