import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { ApiErrorCode } from '@/shared/api/heartlog.generated';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { renderWithProviders, waitFor } from '@/test/render';
import { server } from '@/test/msw/server';
import { AuthBootstrap } from './AuthBootstrap';

const staleSession = {
  accessToken: 'stored-access-token',
  expiresAt: '2099-01-01T00:00:00.000Z',
  email: 'stored@example.com',
};

function seedStoredSession() {
  useAuthStore.setState({
    user: null,
    session: staleSession,
    authStatus: 'idle',
  });
}

describe('AuthBootstrap', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      session: null,
      authStatus: 'anonymous',
    });
  });

  it('restores a valid existing session with the current user from the API', async () => {
    const seenAuthorizationHeaders: string[] = [];

    seedStoredSession();
    server.use(
      http.get('http://localhost/api/auth/me', ({ request }) => {
        seenAuthorizationHeaders.push(request.headers.get('authorization') ?? '');

        return HttpResponse.json({
          success: true,
          data: {
            id: 'user-a',
            username: 'User A',
            email: 'user-a@example.com',
          },
        });
      }),
    );

    renderWithProviders(<AuthBootstrap />);

    await waitFor(() => {
      expect(useAuthStore.getState()).toMatchObject({
        user: {
          id: 'user-a',
          username: 'User A',
          email: 'user-a@example.com',
        },
        authStatus: 'authenticated',
      });
    });
    expect(seenAuthorizationHeaders).toEqual(['Bearer stored-access-token']);
  });

  it('clears stale frontend auth state when the existing session is unauthorized', async () => {
    seedStoredSession();
    server.use(
      http.get('http://localhost/api/auth/me', () =>
        HttpResponse.json(
          {
            code: ApiErrorCode.unauthorized,
            message: 'Unauthorized.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        ),
      ),
      http.post('http://localhost/api/auth/refresh', () =>
        HttpResponse.json(
          {
            code: ApiErrorCode.unauthorized,
            message: 'Unauthorized.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        ),
      ),
    );

    renderWithProviders(<AuthBootstrap />);

    await waitFor(() => {
      expect(useAuthStore.getState()).toMatchObject({
        user: null,
        session: null,
        authStatus: 'anonymous',
      });
    });
  });
});
