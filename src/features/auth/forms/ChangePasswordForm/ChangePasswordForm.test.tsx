import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { ApiErrorCode } from '@/shared/api/heartlog.generated';
import { server } from '@/test/msw/server';
import { ChangePasswordForm } from './ChangePasswordForm';

describe('ChangePasswordForm', () => {
  it('shows a current-password error when the API rejects the current password', async () => {
    const user = userEvent.setup();
    const submittedRequests: unknown[] = [];

    server.use(
      http.post('http://localhost/api/auth/change-password', async ({ request }) => {
        submittedRequests.push(await request.json());

        return HttpResponse.json(
          {
            code: ApiErrorCode.invalidCredentials,
            message: 'Current password is incorrect.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        );
      }),
    );

    renderWithProviders(<ChangePasswordForm />);

    await user.type(screen.getByLabelText(/current password/i), 'old-password');
    await user.type(screen.getByLabelText(/^new password$/i), 'Aa1!aaaa');
    await user.type(screen.getByLabelText(/confirm new password/i), 'Aa1!aaaa');
    await user.click(screen.getByRole('button', { name: /change password/i }));

    expect(await screen.findByText('Current password is incorrect.')).toBeInTheDocument();
    expect(submittedRequests).toEqual([
      {
        currentPassword: 'old-password',
        newPassword: 'Aa1!aaaa',
      },
    ]);
  });
});
