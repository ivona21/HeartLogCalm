import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { server } from '@/test/msw/server';
import EmailConfirmationPage from './email-confirmation';

describe('EmailConfirmationPage', () => {
  it('lets a user request a new confirmation email when the confirmation link expired', async () => {
    const user = userEvent.setup();
    const submittedRequests: unknown[] = [];

    server.use(
      http.post('http://localhost/api/auth/resend-confirmation', async ({ request }) => {
        submittedRequests.push(await request.json());

        return HttpResponse.json({ success: true, message: 'Confirmation email sent.' });
      }),
    );

    renderWithProviders(<EmailConfirmationPage />, {
      route: '/email-confirmation?status=expired',
    });

    await user.type(screen.getByLabelText(/email address/i), 'expired@example.com');
    await user.click(screen.getByRole('button', { name: /resend confirmation email/i }));

    expect(await screen.findByRole('heading', { name: /check your inbox/i })).toBeInTheDocument();
    expect(screen.getByText(/expired@example.com/i)).toBeInTheDocument();
    expect(submittedRequests).toEqual([{ email: 'expired@example.com' }]);
  });
});
