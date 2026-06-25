# Auth Migration Plan

This plan migrates the frontend from the current single-token auth flow to the new backend session contract while keeping app behavior the same.

Frontend scope rules:

- The frontend talks only to the HeartLog backend.
- The frontend does not import or configure Supabase.
- The frontend treats returned auth tokens as backend-issued session data.
- Registration no longer collects or sends `username`.
- The local HeartLog user is loaded from `GET /api/auth/me`.

## Step 1: Align Auth Types And Store Shape

Goal: prepare frontend state for the new session response without changing user-facing behavior.

Changes:

- Replace the current stored `token` with a persisted `session`.
- Store `accessToken`, `expiresAt`, and `email`.
- Keep `user` and `authStatus` behavior unchanged.
- Add helpers for reading the current access token and clearing the whole session.
- Update DTOs so login/register responses use:

```ts
{
  accessToken: string;
  expiresAt: string;
  email: string;
}
```

Test this step:

- App still builds with `npm run check`.
- Logging out still clears auth state.
- Existing unauthenticated pages still render.
- No API behavior has changed yet except internal auth state naming.

## Step 2: Update Login And Register Flow

Goal: make login/register consume the new backend response shape.

Changes:

- Update login to call `POST /api/auth/login`.
- Store returned session data.
- Call `GET /api/auth/me` after login.
- Store the returned local HeartLog user.
- Navigate to `/` after the user is loaded.
- Update register to call `POST /api/auth/register`.
- Remove `username` from the register form schema and UI.
- Do not auto-login after register, because register now returns a session.
- After register, follow the same session store + `/me` load flow as login.
- Move auth-store mutation out of `login.api.ts`; API functions should return data only.

Test this step:

- Register form shows only email and password.
- Register succeeds and lands on `/`.
- Login succeeds and lands on `/`.
- Header switches to logged-in state after login/register.
- Dashboard route is accessible after login/register.
- Bad credentials still show the backend error.

## Step 3: Update Startup Session Bootstrap

Goal: preserve the current persisted-login behavior using the new session shape.

Changes:

- On app startup, check for a stored session.
- If no session exists, mark auth as anonymous.
- If a session exists, call `GET /api/auth/me` with `accessToken`.
- If `/me` returns `200`, store the returned local user and mark authenticated.
- If `/me` returns `401`, clear local auth state and mark anonymous.

Test this step:

- Refreshing the page after login keeps the user authenticated.
- Refreshing `/dashboard` after login keeps the user on the dashboard.
- Clearing local storage makes the app anonymous again.
- A stale or invalid token causes local logout and shows the login flow.

## Step 4: Add Backend-Mediated Refresh And Retry

Goal: handle expired access tokens while keeping Supabase and refresh tokens hidden from the frontend.

Backend refresh contract:

```http
POST /api/auth/refresh
credentials: include
```

No `Authorization` header or request body is required. The browser sends the `heartlog_refresh_token` HttpOnly cookie automatically.

Success response:

```json
{
  "success": true,
  "message": "Session refreshed successfully",
  "data": {
    "accessToken": "...",
    "expiresAt": "2026-06-20T10:00:00Z",
    "email": "user@example.com"
  }
}
```

Error responses:

- `401 Unauthorized`: refresh cookie is missing/invalid/expired, or the refreshed identity cannot be resolved to a local HeartLog user.

Changes:

- Before API requests, check whether `expiresAt` is expired or near expiry.
- Refresh through `POST /api/auth/refresh` if needed.
- If an API request returns `401`, call `POST /api/auth/refresh`.
- If refresh succeeds, replace the stored `accessToken`, `expiresAt`, and `email`.
- Retry the original API request once with the new access token.
- If refresh returns `401`, clear local auth state and emit the existing unauthorized event.
- Do not use `/api/auth/me` for refresh.
- Keep the current session-expired toast behavior.

Test this step:

- With an expired access token and valid refresh cookie, the next API call refreshes and succeeds.
- With an expired access token and invalid refresh cookie, auth is cleared.
- Multiple simultaneous API calls do not trigger multiple refresh requests.
- Emotion-entry save still works after automatic refresh.

## Step 5: Verify Auth-Aware App Behavior

Goal: confirm the migration did not change product behavior.

Checks:

- `/emotion-wheel` remains public.
- First unauthenticated emotion selection still opens the auth prompt.
- Authenticated users can save emotion entries.
- Save `401` still opens the auth prompt.
- `/dashboard` remains protected.
- Logout clears auth state, returns to `/`, closes wheel modals, and clears wheel selection.
- API requests do not send `userId` for user-owned resources.
