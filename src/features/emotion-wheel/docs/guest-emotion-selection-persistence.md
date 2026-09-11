# Guest Emotion Selection Persistence

Goal: let guests keep their current wheel selections while they continue the same browser session, without leaving those emotions visible indefinitely on a shared browser.

## Storage Model

There are two separate storage paths:

- Normal guest wheel state uses `sessionStorage`.
- Pending auth handoff state uses `localStorage` with a 4-hour TTL.

Keeping these separate is intentional. Normal wheel selections are private session state and should disappear when the tab/browser session ends. Pending auth selections are only created when the guest explicitly chooses to log in or register so they can continue saving those selected emotions after authentication.

## Normal Guest State

The wheel mirrors unauthenticated selections into `sessionStorage` through `useGuestEmotionSelectionStore`.

Storage key:

```text
guest-emotion-selection
```

This supports refreshes in the same tab/session. It should not be copied into `localStorage`, and it should not be restored after the browser session is gone.

The session-backed state is used for initial wheel hydration only. After the wheel is active, user interactions are the source of truth. This avoids a loop where a stale stored selection reselects an emotion immediately after the user deselects it.

## Pending Auth Handoff

When a guest with selected emotions clicks `Log in` or `Create account` in the auth prompt, `AuthPromptModal` saves a temporary pending selection with `savePendingAuthEmotionSelection`.

Storage key:

```text
pending-auth-emotion-selection
```

Shape:

```ts
type PendingAuthEmotionSelection = {
  emotionIds: string[];
  createdAt: number;
};
```

This is stored in `localStorage` because registration may require opening an email confirmation link before the user returns to log in.

## Expiration And Consumption

Pending auth selection values expire after 4 hours. `readPendingAuthEmotionSelection` validates the value, checks the TTL, and deletes invalid, malformed, empty, or expired values.

After authentication, `Wheel` calls `consumePendingAuthEmotionSelection`, filters the emotion IDs against the loaded wheel data, restores valid IDs, and immediately removes the pending value from `localStorage`. Pending auth selection is consumed once.

## Cleanup

Logout clears pending auth selection as a defensive privacy measure in `useAuth`, even if the wheel is not mounted. The wheel also clears its local selection state when it receives the logout event.

The old localStorage key is also cleared:

```text
pending-emotion-selection
```

That key was used by the previous implementation and could leave guest wheel selections persisted indefinitely.

## Files

- `src/features/emotion-wheel/stores/guestEmotionSelectionStore.ts`
- `src/features/emotion-wheel/stores/pendingAuthEmotionSelectionStorage.ts`
- `src/features/emotion-wheel/components/AuthPromptModal.tsx`
- `src/features/emotion-wheel/components/Wheel.tsx`
- `src/features/auth/hooks/useAuth.ts`
