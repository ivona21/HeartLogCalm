import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { ApiErrorCode } from '@/shared/api/heartlog.generated';
import { server } from '@/test/msw/server';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('shows a validation message when a user submits without a password', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />, { route: '/login' });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('shows an invalid-login error when the API rejects the submitted credentials', async () => {
    const user = userEvent.setup();
    const submittedCredentials: unknown[] = [];

    server.use(
      http.post('http://localhost/api/auth/login', async ({ request }) => {
        submittedCredentials.push(await request.json());

        return HttpResponse.json(
          {
            code: ApiErrorCode.invalidCredentials,
            message: 'Invalid email or password.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        );
      }),
    );

    renderWithProviders(<LoginForm />, { route: '/login' });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'wrong-password');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Invalid email or password.')).toBeInTheDocument();
    expect(submittedCredentials).toEqual([
      {
        email: 'user@example.com',
        password: 'wrong-password',
      },
    ]);
  });

  it('shows the confirmation-resend state when login fails because the account is unconfirmed', async () => {
    const user = userEvent.setup();

    server.use(
      http.post('http://localhost/api/auth/login', () => {
        return HttpResponse.json(
          {
            code: ApiErrorCode.emailNotConfirmed,
            message: 'Email address is not confirmed.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        );
      }),
    );

    renderWithProviders(<LoginForm />, { route: '/login' });

    await user.type(screen.getByLabelText(/email/i), 'unconfirmed@example.com');
    await user.type(screen.getByLabelText(/password/i), 'valid-password');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(
      await screen.findByText(/your email address hasn't been confirmed yet/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmation email/i)).toHaveValue('unconfirmed@example.com');
  });

  it('sends a password reset email from forgot-password mode and shows the check-inbox state', async () => {
    const user = userEvent.setup();
    const submittedRequests: unknown[] = [];

    server.use(
      http.post('http://localhost/api/auth/forgot-password', async ({ request }) => {
        submittedRequests.push(await request.json());

        return HttpResponse.json({ success: true, message: 'Reset email sent.' });
      }),
    );

    renderWithProviders(<LoginForm />, { route: '/login' });

    await user.click(screen.getByRole('button', { name: /forgot password/i }));
    await user.type(screen.getByLabelText(/email/i), 'recover@example.com');
    await user.click(screen.getByRole('button', { name: /send reset link/i }));

    expect(await screen.findByRole('heading', { name: /check your inbox/i })).toBeInTheDocument();
    expect(screen.getByText(/recover@example.com/i)).toBeInTheDocument();
    expect(submittedRequests).toEqual([{ email: 'recover@example.com' }]);
  });
});
