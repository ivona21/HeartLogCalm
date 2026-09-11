# HeartLog Setup And Usage Guide

This guide covers local setup, core user flows, and the current frontend/backend contract for HeartLog.

## What's Included

HeartLog is a React frontend for emotional wellness tracking. Current implemented areas include:

- Registration, login, logout, and authenticated user bootstrap.
- Email confirmation and resend flows.
- Password reset and change-password flows.
- Protected dashboard route.
- Public emotion wheel route.
- OpenAPI-driven backend client generation.
- Responsive, calm UI built with Tailwind CSS and shadcn/ui.

## Getting Started

### Prerequisites

- Node.js 20+
- A backend that implements the contract in `../integrations/backend-api.md`

### Configuration

1. Create an environment file:

   ```bash
   cp .env.example .env
   ```

2. Set your backend URL:

   ```env
   VITE_API_URL=https://your-backend-api.com
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

The app runs on `http://localhost:5000` by default.

## User Flows

### Registration

1. User opens `/register`.
2. User submits email, username, and password.
3. Backend creates the account and sends an email confirmation link.
4. Frontend shows a check-your-inbox state.
5. User is not authenticated until the account is confirmed and they log in.

### Email Confirmation

1. User clicks the confirmation link in email.
2. Browser opens the backend callback.
3. Backend validates the token and redirects to `/email-confirmation?status=...`.
4. Frontend renders success, expired, or invalid confirmation UI.

### Login

1. User opens `/login`.
2. User submits email and password.
3. Backend returns an access token in the response body and manages the refresh token through an HttpOnly cookie.
4. Frontend stores only the local session fields it needs: `accessToken`, `expiresAt`, and `email`.
5. Frontend loads the current user with `GET /api/auth/me`.

### Password Recovery

1. User requests a password reset from the login page.
2. Backend sends a recovery email.
3. The recovery email opens the backend callback.
4. Backend validates the recovery token, sets a short-lived HttpOnly recovery cookie, and redirects to `/reset-password?status=...`.
5. Frontend submits only the new password to `POST /api/auth/reset-password` with credentials included.

### Session Refresh

1. Frontend restores local `accessToken`, `expiresAt`, and `email`.
2. Frontend calls `GET /api/auth/me`.
3. If the access token is expired or rejected, frontend calls `POST /api/auth/refresh` with `credentials: include`.
4. On refresh success, frontend retries the original request once.
5. On refresh failure, frontend clears local auth state and returns the user to login.

## Security Model

- Refresh tokens are managed by the backend in an HttpOnly cookie.
- The frontend must not read, store, send, or expect a `refreshToken`.
- The frontend stores only `accessToken`, `expiresAt`, and `email` in local auth state.
- Credentialed auth endpoints must use `credentials: include`.
- Authenticated user-owned requests should not send `userId`; backend ownership is resolved from the access token.
- Password reset and email confirmation tokens are handled by backend callbacks, not by frontend JavaScript.

## Backend Integration

The frontend consumes a checked-in OpenAPI snapshot and generates a typed API client with Orval.

- Contract guide: `../integrations/backend-api.md`
- OpenAPI snapshot: `../integrations/backend-api.openapi.json`
- Generated client: `../../src/shared/api/heartlog.generated.ts`
- API transport: `../../src/lib/api-client.ts`

When the backend contract changes:

1. Export the updated OpenAPI JSON to `docs/integrations/backend-api.openapi.json`.
2. Run `npm run api:generate`.
3. Commit the updated snapshot and generated client together.

## Routes

| Path | Auth required | Description |
|------|---------------|-------------|
| `/` | No | Home route, resolved from `DEFAULT_HOME_ROUTE` |
| `/emotion-wheel` | No | Public emotion wheel |
| `/login` | No | Login and forgot-password entry point |
| `/register` | No | Registration page |
| `/email-confirmation` | No | Email confirmation status page |
| `/reset-password` | No | Password reset status and reset form |
| `/dashboard` | Yes | User dashboard |
| `/change-password` | Yes | Authenticated password change |

## Development Notes

- Keep API calls centralized through the generated client and app API transport.
- Keep pages focused on route-level composition.
- Put feature-specific UI, hooks, stores, and types inside the owning feature folder.
- Use `../design/design-guidelines.md` for UI decisions.
- Use `architecture.md` and `ui-file-naming.md` for project conventions.

