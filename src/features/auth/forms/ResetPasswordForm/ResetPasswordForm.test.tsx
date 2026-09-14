import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { server } from '@/test/msw/server';
import { ResetPasswordForm } from './ResetPasswordForm';

describe('ResetPasswordForm', () => {
  it('updates the password and shows completion after a successful reset', async () => {
    const user = userEvent.setup();
    const submittedRequests: unknown[] = [];

    server.use(
      http.post('http://localhost/api/auth/reset-password', async ({ request }) => {
        submittedRequests.push(await request.json());

        return HttpResponse.json({ success: true, message: 'Password updated.' });
      }),
    );

    renderWithProviders(<ResetPasswordForm />);

    await user.type(screen.getByLabelText(/new password/i), 'Aa1!aaaa');
    await user.type(screen.getByLabelText(/confirm password/i), 'Aa1!aaaa');
    await user.click(screen.getByRole('button', { name: /update password/i }));

    expect(await screen.findByText('Password successfully changed')).toBeInTheDocument();
    expect(submittedRequests).toEqual([{ password: 'Aa1!aaaa' }]);
  });
});
