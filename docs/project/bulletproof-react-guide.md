# Bulletproof React Architecture Guide For HeartLog

HeartLog follows a feature-oriented React structure inspired by Bulletproof React. The goal is to keep route composition, feature behavior, shared UI, and infrastructure clearly separated.

## Core Principles

1. Group by feature when code belongs to a product domain.
2. Keep pages thin and focused on route-level composition.
3. Centralize backend communication through the app API layer.
4. Keep reusable cross-feature code in `src/shared`.
5. Keep app-level wiring and infrastructure in `src/lib`.
6. Export a narrow public API from each feature.

## Folder Responsibilities

```text
src/
├── components/       # App-wide non-feature UI
├── config/           # App configuration constants
├── features/         # Domain features
├── lib/              # App infrastructure and wiring
├── pages/            # Route-level page components
├── routes/           # Router configuration
└── shared/           # Cross-feature reusable code
```

## Pages

Pages should compose layouts and feature components. They may read route state, query parameters, or route params, but should avoid owning business logic or raw API calls.

Good page responsibilities:

- Choose layout.
- Read route params or search params.
- Render feature-level components.
- Handle route-only redirects or status views.

Avoid in pages:

- Raw `fetch` calls.
- Business rules that belong to a feature.
- Duplicated auth or API retry logic.

## Features

Feature folders own domain-specific UI, hooks, stores, types, and helpers.

Common feature structure:

```text
features/
└── auth/
    ├── api/
    ├── components/
    ├── docs/
    ├── forms/
    ├── hooks/
    ├── stores/
    ├── types/
    └── utils/
```

Not every feature needs every folder. Prefer clarity over symmetry.

## API Layer

Backend communication should stay centralized and consistent.

- Use the OpenAPI-generated client where it fits.
- Use `src/lib/api-client.ts` for auth-aware transport behavior.
- Keep token refresh and retry behavior in the transport layer.
- Do not duplicate refresh handling in individual components.
- Do not send `userId` for normal user-owned requests; the backend resolves ownership from the access token.

## Authentication

HeartLog uses a backend-managed refresh token stored in an HttpOnly cookie.

Frontend auth rules:

- Store only `accessToken`, `expiresAt`, and `email` in local auth state.
- Do not store, read, send, or expect a `refreshToken`.
- Use `GET /api/auth/me` to load the app user.
- Use credentialed requests for cookie-dependent auth endpoints.
- Do not decode tokens to determine app user identity.

See `../../src/features/auth/docs/http-only-refresh.md` for the full auth transport rules.

## State Management

- Use TanStack Query for server state.
- Use feature stores only for feature-owned client state.
- Use React component state for local UI state.
- Keep global state small and intentional.

## Shared Code

Use `src/shared` for code that is genuinely reused across features, such as:

- Generated API client code.
- Shared hooks.
- Shared form helpers.
- Shared routing utilities.
- Shared types and utilities.

Feature-specific helpers should stay inside their feature folder until they are reused elsewhere.

## Components

Use `src/components` for app-wide, non-feature-specific components. UI primitives belong in `src/components/ui` and should follow `ui-file-naming.md`.

Feature components should stay inside their feature unless they become broadly reusable.

## Routing

Router configuration belongs in `src/routes`. Route guards and reusable routing helpers belong in `src/shared/routing`.

The home route is controlled by `DEFAULT_HOME_ROUTE` in `src/config/defaults.ts` and rendered through `src/shared/routing/HomeRoute.tsx`.

