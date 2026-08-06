# Auth: Email Confirmation Flow

Goal: update the frontend for backend-managed email confirmation.

## Decision

- Registration no longer logs the user in.
- Backend handles the email link and redirects the browser back to the frontend.
- Confirmation page route: `/email-confirmation`.
- Redirect status values:
  - `success`
  - `expired`
  - `invalid`

## Resend Strategy

- Do not put the email in the confirmation redirect URL.
- If the user needs a resend, they re-enter their email in the frontend.
- The resend action can live on:
  - the confirmation page
  - the login page when backend returns an unconfirmed-account error
  - the registration success state

This keeps the callback URL clean and avoids exposing the email in browser history, logs, analytics, and referrers.

## User Flows

### Registration

1. User submits email and password.
2. Backend creates the account.
3. Frontend shows a persistent "check your inbox" success state.
4. User is not logged in.

### Login

1. User submits email and password.
2. If the account is not confirmed, backend returns a targeted error.
3. Frontend shows a specific "confirm your email" message.
4. Frontend offers a resend action that uses a re-entered email.

### Confirmation Callback

1. User clicks the email link.
2. Backend validates the token.
3. Backend redirects to `/email-confirmation?status=...`.
4. Frontend renders a status page only.

## Page Behavior

`/email-confirmation` must support:

- `success`: confirmation completed, show success copy and a login action.
- `expired`: token expired, show resend action with an email input.
- `invalid`: token is invalid, show a dead-end error state with navigation back to login.

## Frontend Changes Required

- Remove auto-login from registration.
- Add a registration success state.
- Add a new email-confirmation route.
- Add targeted login error handling for unconfirmed accounts.
- Add resend confirmation action with manual email entry.
- Keep auth bootstrap and session persistence unchanged for confirmed users.

## Implementation Order

1. Update auth contract handling in the frontend.
2. Remove registration auto-login.
3. Add the `/email-confirmation` route and status UI.
4. Add unconfirmed-account login error handling.
5. Add resend confirmation actions.
6. Add or update tests for the new states.

## Acceptance Criteria

- Registering shows a clear inbox-check message.
- Registering does not authenticate the user.
- Clicking the confirmation email lands on `/email-confirmation`.
- `success`, `expired`, and `invalid` each render distinct UI.
- Login before confirmation shows a targeted error.
- Resend is available through an email input.
