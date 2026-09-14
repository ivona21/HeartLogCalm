import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('shows a validation message when a user submits without a password', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />, { route: '/login' });

    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });
});
