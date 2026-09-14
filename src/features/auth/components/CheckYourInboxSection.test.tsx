import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { server } from '@/test/msw/server';
import { CheckYourInboxSection } from './CheckYourInboxSection';

describe('CheckYourInboxSection', () => {
  it('resends a password reset email and shows the resend success message', async () => {
    const user = userEvent.setup();
    const submittedRequests: unknown[] = [];

    server.use(
      http.post('http://localhost/api/auth/forgot-password', async ({ request }) => {
        submittedRequests.push(await request.json());

        return HttpResponse.json({ success: true, message: 'Reset email sent.' });
      }),
    );

    renderWithProviders(
      <CheckYourInboxSection mode="password-reset" email="recover@example.com" />,
    );

    await user.click(screen.getByRole('button', { name: /send me an email again/i }));

    expect(
      await screen.findByRole('button', { name: /a new reset link has been sent to your inbox/i }),
    ).toBeInTheDocument();
    expect(submittedRequests).toEqual([{ email: 'recover@example.com' }]);
  });
});
