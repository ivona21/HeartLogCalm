# Auth: Password Reset Flow

Goal: update the frontend for backend-managed password recovery.

## Decision

- Forgot password stays inline in the login form.
- The recovery email opens the backend callback, not the frontend directly.
- Recovery callback route handled by backend: `/api/auth/reset-password/confirm`
- Frontend reset page route: `/reset-password`

## Backend Callback

1. User clicks the recovery link in email.
2. Browser navigates to `/api/auth/reset-password/confirm?token_hash=...&type=recovery`.
3. Backend validates the Supabase recovery token.
4. Backend redirects to the frontend with one of these statuses:
   - `ready`
   - `expired`
   - `invalid`

## Page Behavior

`/reset-password` must support:

- `ready`: show new password form with password and confirm password fields.
- `expired`: show a recovery-link fallback and allow requesting a new email.
- `invalid`: show a recovery-link fallback and allow requesting a new email.
- missing status: show the same fallback as expired/invalid.

## Reset Form

1. User enters a new password twice.
2. Validate password strength using the shared auth password policy.
3. Validate `confirmPassword` matches `password`.
4. Submit only `{ password }` to `POST /api/auth/reset-password`.
5. Include credentials so the HttpOnly recovery cookie is sent.
6. Do not send Supabase tokens from the frontend.

## Success

1. Show confirmation that the password was updated.
2. Redirect to `/login` with history replace.
3. Do not assume the user is authenticated after the reset.

## Fallback

- If the recovery link is expired, invalid, or missing, show an inline email form to request a fresh reset email.
- The fallback should use the same generic success message as forgot-password:
  - `If an account exists, a reset link has been sent.`

## Frontend Changes Required

- Keep forgot-password inline in the login page.
- Add the public `/reset-password` route.
- Add the ready-state reset form.
- Add the email resend fallback for broken links.
- Keep `/change-password` separate for logged-in users.

## Acceptance Criteria

- Visiting `/reset-password?status=ready` shows the new-password form.
- Visiting `/reset-password?status=expired` or `invalid` shows the resend fallback.
- Successful reset redirects to `/login`.
- The frontend never handles Supabase recovery tokens directly.
