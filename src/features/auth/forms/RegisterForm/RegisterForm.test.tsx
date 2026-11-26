import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { ApiErrorCode } from '@/shared/api/heartlog.generated';
import { server } from '@/test/msw/server';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
  it('shows the check-inbox state after successful registration', async () => {
    const user = userEvent.setup();
    const submittedRequests: unknown[] = [];

    server.use(
      http.post(/\/api\/auth\/register$/, async ({ request }) => {
        submittedRequests.push(await request.json());

        return HttpResponse.json({
          success: true,
          message: 'Registration successful.',
          data: { email: 'new-user@example.com' },
        });
      }),
    );

    renderWithProviders(<RegisterForm />, { route: '/register' });

    await user.type(screen.getByLabelText(/^email$/i), 'new-user@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'Aa1!aaaa');
    await user.type(screen.getByLabelText(/confirm password/i), 'Aa1!aaaa');
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    await user.click(
      screen.getByRole('checkbox', {
        name: /agree to the terms of service/i,
      }),
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /acknowledge the privacy policy/i,
      }),
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /I consent to HeartLog storing/i,
      }),
    );
    await user.click(screen.getByRole('button', { name: /agree and create account/i }));

    expect(await screen.findByRole('heading', { name: /check your inbox/i })).toBeInTheDocument();
    expect(screen.getByText(/new-user@example.com/i)).toBeInTheDocument();
    expect(submittedRequests).toEqual([
      {
        email: 'new-user@example.com',
        password: 'Aa1!aaaa',
        legalAcceptances: expect.objectContaining({
          release: 'legal-draft-1',
          terms: expect.objectContaining({ accepted: true }),
          privacy: expect.objectContaining({ accepted: true }),
          savedEntries: expect.objectContaining({
            id: 'saved-entries-sensitive-data',
            accepted: true,
          }),
        }),
      },
    ]);
  });

  it('shows an email field error when the API reports that the account already exists', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(/\/api\/auth\/register$/, () => {
        return HttpResponse.json(
          {
            code: ApiErrorCode.emailAlreadyExists,
            message: 'An account with this email already exists.',
            errors: null,
            traceId: null,
          },
          { status: 409 },
        );
      }),
    );

    renderWithProviders(<RegisterForm />, { route: '/register' });

    await user.type(screen.getByLabelText(/^email$/i), 'existing@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'Aa1!aaaa');
    await user.type(screen.getByLabelText(/confirm password/i), 'Aa1!aaaa');
    await user.click(screen.getByRole('button', { name: /sign up/i }));
    await user.click(
      screen.getByRole('checkbox', {
        name: /agree to the terms of service/i,
      }),
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /acknowledge the privacy policy/i,
      }),
    );
    await user.click(
      screen.getByRole('checkbox', {
        name: /I consent to HeartLog storing/i,
      }),
    );
    await user.click(screen.getByRole('button', { name: /agree and create account/i }));

    expect(
      await screen.findByText('An account with this email already exists.'),
    ).toBeInTheDocument();
  });
});
