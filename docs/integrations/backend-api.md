# Backend Integration Guide

## Overview

HeartLog frontend consumes a checked-in OpenAPI snapshot and generates the API client with Orval.

## Source Of Truth

- OpenAPI snapshot: `docs/integrations/backend-api.openapi.json`
- Orval config: `orval.config.ts`
- Generated client: `src/shared/api/heartlog.generated.ts`
- Orval mutator: `src/shared/api/heartlog-mutator.ts`
- Auth-aware transport: `src/lib/api-client.ts`

Only the OpenAPI snapshot should be edited when the backend contract changes. The generated client stays untouched.

## Workflow

1. Export the updated backend OpenAPI JSON into `docs/integrations/backend-api.openapi.json`.
2. Run `npm run api:generate`.
3. Commit the spec snapshot and generated client together.

## Authentication Model

- The frontend stores only `accessToken`, `expiresAt`, and `email`.
- The refresh token stays in an HttpOnly cookie named `heartlog_refresh_token`.
- The frontend must not read, store, send, or expect `refreshToken`.
- The frontend uses `GET /api/auth/me` to load the local HeartLog user.
- Authenticated user-owned requests must not send `userId`; the backend resolves ownership from the access token.

## Required Auth Endpoints

The current auth flow is still the same:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

See the OpenAPI snapshot for the exact schemas and examples.

## Startup And Retry Behavior

On app startup:

1. Restore local `accessToken` and `expiresAt`.
2. Call `GET /api/auth/me`.
3. If `/me` returns `200`, user is authenticated.
4. If `/me` returns `401`, call `POST /api/auth/refresh` with `credentials: include`.
5. If refresh succeeds, retry `/me` with the new access token.
6. If refresh fails, clear local auth state.

For protected API calls:

1. Send `Authorization: Bearer ACCESS_TOKEN`.
2. If the request returns `401` and local auth state exists, call `POST /api/auth/refresh`.
3. If refresh succeeds, retry the original request once.
4. If refresh fails, clear local auth state and show login.

## CORS Requirements

Cookie auth endpoints require credentialed requests. Backend CORS must use:

```http
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: https://exact-frontend-origin.example
```

Do not use `Access-Control-Allow-Origin: *` for credentialed cookie requests.

## Expected Errors

- Missing, invalid, or expired access token on protected endpoint: `401 Unauthorized`.
- Missing, invalid, or expired refresh cookie on `/api/auth/refresh`: `401 Unauthorized`.
- Bad login credentials: `401 Unauthorized`.
- Valid identity-provider token but no linked HeartLog user: `401 Unauthorized`.
- Validation failures: `400 Bad Request` with optional `errors`.
