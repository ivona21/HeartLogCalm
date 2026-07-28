# Auth: Email Confirmation - Working Todo

Temporary implementation tracker for the email confirmation flow.
Remove this file after the feature is complete.

## Status

- [ ] Not started
- [x] Done

## Plan

### 1. Contract and data flow

- [ ] Confirm backend auth error shape for unconfirmed accounts
- [ ] Confirm resend confirmation request payload and response
- [ ] Update local auth assumptions if needed

### 2. Registration flow

- [ ] Remove auto-login after successful registration
- [ ] Show persistent post-registration inbox message
- [ ] Keep user on auth side after register success
- [ ] Add resend entry point from registration success state

### 3. Login flow

- [ ] Detect unconfirmed-account login error
- [ ] Show targeted message explaining email is not confirmed
- [ ] Add resend confirmation action with manual email entry
- [ ] Keep normal login behavior for confirmed users

### 4. Confirmation route

- [ ] Add `/email-confirmation` route
- [ ] Render `success` state
- [ ] Render `expired` state
- [ ] Render `invalid` state
- [ ] Add clear actions for each state

### 5. Resend confirmation

- [ ] Wire resend to `POST /api/auth/resend-confirmation`
- [ ] Reuse email entered by the user
- [ ] Handle validation and backend errors
- [ ] Add loading and success/error UI states

### 6. Routing and UX polish

- [ ] Decide whether confirmation page links to login, register, or both
- [ ] Keep auth bootstrap unchanged for confirmed sessions
- [ ] Verify no authenticated redirect happens after register
- [ ] Make sure public routes still work as before

### 7. Tests

- [ ] Register success shows inbox message
- [ ] Register does not authenticate user
- [ ] Login before confirmation shows targeted error
- [ ] `/email-confirmation` status UI renders correctly
- [ ] Resend flow works with manual email entry

### 8. Cleanup

- [ ] Remove temporary working doc
- [ ] Remove any dead code or debug logging
- [ ] Run final verification pass

## Notes

- Keep this list updated as work lands.
- Mark items done immediately after the related change is complete.
- If the backend contract changes, update the contract tasks first.
