import { beforeEach, describe, expect, it } from 'vitest';
import { useAuthStore } from '@/features/auth/stores/authStore';
import {
  readAuthenticatedEntryDraft,
  saveAuthenticatedEntryDraft,
} from '@/features/emotion-wheel/stores/authenticatedEntryDraftStorage';
import { renderWithProviders, screen, waitFor } from '@/test/render';
import ResetPasswordPage from './reset-password';

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      session: null,
      authStatus: 'anonymous',
    });
  });

  it('clears frontend auth state and session-scoped drafts when entering reset-password flow', async () => {
    useAuthStore.setState({
      user: { id: 'user-a', email: 'user-a@example.com' },
      session: {
        accessToken: 'access-token',
        expiresAt: '2099-01-01T00:00:00.000Z',
        email: 'user-a@example.com',
      },
      authStatus: 'authenticated',
    });
    localStorage.setItem('auth-storage', 'persisted-auth');
    saveAuthenticatedEntryDraft('user-a', {
      emotionIds: ['joy'],
      comment: 'Private reset-flow draft',
    });

    renderWithProviders(<ResetPasswordPage />, { route: '/reset-password?status=ready' });

    expect(
      await screen.findByRole('heading', { name: /enter your new password/i }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(useAuthStore.getState()).toMatchObject({
        user: null,
        session: null,
        authStatus: 'anonymous',
      });
    });
    expect(localStorage.getItem('auth-storage')).toBeNull();
    expect(readAuthenticatedEntryDraft('user-a')).toBeNull();
    expect(sessionStorage.length).toBe(0);
  });
});
