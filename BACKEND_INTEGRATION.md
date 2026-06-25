# Backend Integration Guide

## Overview

HeartLog frontend connects to an external HeartLog backend API. The backend owns identity-provider integration and refresh-token cookies. The frontend must not call Supabase directly.

## Configuration

Create a `.env` file based on `.env.example` and set:

```bash
VITE_API_URL=https://your-backend-api.com
```

## Authentication Model

- The frontend stores only `accessToken`, `expiresAt`, and `email`.
- The refresh token is stored by the backend as an HttpOnly cookie named `heartlog_refresh_token`.
- The frontend must not read, store, send, or expect `refreshToken`.
- The frontend uses `GET /api/auth/me` to load the local HeartLog user.
- Authenticated user-owned requests must not send `userId`; the backend resolves ownership from the access token.

## Required Auth Endpoints

### POST /api/auth/register

Register a new user. This request must use `credentials: include` because the backend sets the refresh cookie.

Request:

```json
{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
```

Success response:

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "accessToken": "access-token",
    "expiresAt": "2026-06-20T10:00:00Z",
    "email": "user@example.com"
  }
}
```

### POST /api/auth/login

Authenticate a user. This request must use `credentials: include` because the backend sets the refresh cookie.

Request:

```json
{
  "email": "user@example.com",
  "password": "StrongPass123!"
}
```

Success response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "access-token",
    "expiresAt": "2026-06-20T10:00:00Z",
    "email": "user@example.com"
  }
}
```

### POST /api/auth/refresh

Refresh the access token. This request must use `credentials: include`.

- No request body.
- No `Authorization` header.
- Browser sends `heartlog_refresh_token` automatically.
- Backend may rotate the refresh cookie.

Success response:

```json
{
  "success": true,
  "message": "Session refreshed successfully",
  "data": {
    "accessToken": "new-access-token",
    "expiresAt": "2026-06-20T11:00:00Z",
    "email": "user@example.com"
  }
}
```

### POST /api/auth/logout

Logout and clear the refresh cookie. This request must use `credentials: include`.

Success response:

```json
{
  "success": true,
  "message": "Logout successful"
}
```

The frontend clears local auth state after calling this endpoint. It must not manually delete the refresh cookie.

### GET /api/auth/me

Load the current local HeartLog user.

Headers:

```http
Authorization: Bearer ACCESS_TOKEN
```

Success response:

```json
{
  "success": true,
  "message": "Current user retrieved successfully",
  "data": {
    "id": "local-heartlog-user-id",
    "username": null,
    "email": "user@example.com"
  }
}
```

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
