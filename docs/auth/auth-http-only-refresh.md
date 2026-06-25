# Auth: HttpOnly Refresh Cookie

HeartLog auth uses a backend-managed refresh token stored in an HttpOnly cookie.

Frontend rules:

- Do not store, read, send, or expect a `refreshToken`.
- Store only `accessToken`, `expiresAt`, and `email` in local auth state.
- Use `GET /api/auth/me` to load the local HeartLog user and profile state.
- Do not decode tokens to determine app user identity.
- Do not send `userId` for normal user-owned API requests.
- All backend requests must go through `src/lib/api-client.ts`.

Cookie endpoints:

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

These requests must use `credentials: 'include'`.

Refresh flow:

- `POST /api/auth/refresh` sends no request body and no `Authorization` header.
- The browser sends `heartlog_refresh_token` automatically.
- On success, replace local `accessToken` and `expiresAt`.
- Backend may rotate the refresh cookie.
- On refresh `401`, clear local auth state.

Logout flow:

- Call `POST /api/auth/logout` with `credentials: 'include'`.
- Backend clears the refresh cookie.
- Frontend clears local access token, expiration, user, and auth status.
- Frontend must not manually delete the refresh cookie.
