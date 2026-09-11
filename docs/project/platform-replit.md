# HeartLog Project Overview

This document summarizes the current frontend shape of HeartLog. It is safe for public project documentation and avoids environment-specific secrets or private deployment details.

## Overview

HeartLog is an emotional wellness tracking frontend built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. It connects to an external backend API through an OpenAPI-generated client.

## Current State

Current frontend capabilities:

- User registration with email confirmation.
- Login and logout.
- HttpOnly refresh-cookie session flow coordinated with short-lived access tokens.
- Password reset and authenticated password change flows.
- Protected dashboard route.
- Public emotion wheel route.
- Guest emotion selection persistence for the active browser session.
- Pending auth handoff for guest emotion selections with a limited TTL.
- Configurable home route through `DEFAULT_HOME_ROUTE` in `src/config/defaults.ts`.

## Tech Stack

- React 18 with TypeScript.
- Vite.
- React Router DOM.
- TanStack Query.
- React Hook Form and Zod.
- Tailwind CSS.
- shadcn/ui.
- Lucide React.
- Orval-generated API client from OpenAPI.

## Project Structure

```text
heartlog/
├── src/
│   ├── components/
│   ├── config/
│   ├── features/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   └── shared/
├── docs/
├── public/
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

## Backend Integration

The frontend uses `VITE_API_URL` to call the backend:

```env
VITE_API_URL=https://your-backend-api.com
```

The backend contract is documented in `../integrations/backend-api.md` and represented by `../integrations/backend-api.openapi.json`.

## Authentication Model

- Login and registration responses include an access token and expiration.
- The refresh token is set and rotated by the backend as an HttpOnly cookie.
- The frontend stores only `accessToken`, `expiresAt`, and `email` in local auth state.
- Refresh, logout, password reset, and other cookie-dependent auth requests include credentials.
- The frontend loads user profile state through `GET /api/auth/me`.
- The frontend does not decode tokens to determine user identity.

## Routing

The root route (`/`) renders the feature configured by `DEFAULT_HOME_ROUTE` in `src/config/defaults.ts`.

| Path | Auth required | Description |
|------|---------------|-------------|
| `/` | No | Configured home feature |
| `/emotion-wheel` | No | Public emotion wheel |
| `/login` | No | Login page |
| `/register` | No | Registration page |
| `/email-confirmation` | No | Confirmation status page |
| `/reset-password` | No | Password reset page |
| `/dashboard` | Yes | User dashboard |
| `/change-password` | Yes | Password change page |

## Running Locally

```bash
npm install
npm run dev
```

The dev server runs on port `5000`.

## Development Guidelines

- Keep frontend API behavior aligned with the OpenAPI snapshot.
- Keep auth behavior aligned with `src/features/auth/docs/http-only-refresh.md`.
- Keep password recovery behavior aligned with `src/features/auth/docs/password-reset-flow.md`.
- Keep email confirmation behavior aligned with `src/features/auth/docs/email-confirmation-flow.md`.
- Keep UI decisions aligned with `../design/design-guidelines.md`.

