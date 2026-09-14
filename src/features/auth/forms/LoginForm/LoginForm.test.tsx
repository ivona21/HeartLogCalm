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
});
