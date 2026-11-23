const AUTH_SESSION_CHANGE = 'heartlog:auth-session-change';
const AUTH_SESSION_STORAGE_KEY = 'heartlog:auth-session-change';

let authGeneration = 0;
let channel: BroadcastChannel | null = null;

function createSignalId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export function getAuthGeneration(): number {
  return authGeneration;
}

export function invalidateAuthGeneration(): number {
  authGeneration += 1;
  return authGeneration;
}

export function broadcastAuthChange(): void {
  const signal = { type: AUTH_SESSION_CHANGE, id: createSignalId(), timestamp: Date.now() };

  if (typeof window === 'undefined') return;

  try {
    if (typeof BroadcastChannel !== 'undefined') {
      channel ??= new BroadcastChannel(AUTH_SESSION_CHANGE);
      channel.postMessage(signal);
    }
  } catch {
    // The storage fallback below still covers browsers without BroadcastChannel.
  }

  try {
    window.localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(signal));
  } catch {
    // Private browsing/storage restrictions should not prevent local auth changes.
  }
}

export function subscribeToAuthChanges(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const seenSignalIds = new Set<string>();
  const handleSignal = (value: unknown) => {
    if (!value || typeof value !== 'object') return;
    const signal = value as { type?: unknown; id?: unknown };
    if (signal.type !== AUTH_SESSION_CHANGE || typeof signal.id !== 'string') return;
    if (seenSignalIds.has(signal.id)) return;
    seenSignalIds.add(signal.id);
    onChange();
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== AUTH_SESSION_STORAGE_KEY || !event.newValue) return;
    try {
      handleSignal(JSON.parse(event.newValue));
    } catch {
      // Ignore malformed values while leaving auth state untouched.
    }
  };
  const handleMessage = (event: MessageEvent) => handleSignal(event.data);

  window.addEventListener('storage', handleStorage);
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      channel ??= new BroadcastChannel(AUTH_SESSION_CHANGE);
      channel.addEventListener('message', handleMessage);
    }
  } catch {
    // Storage events remain available.
  }

  return () => {
    window.removeEventListener('storage', handleStorage);
    channel?.removeEventListener('message', handleMessage);
  };
}
