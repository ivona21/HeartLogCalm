import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';
import { Form } from '@/components/ui/form.tsx';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import type { LoginInput } from './schema';
import { LoginCredentialsSection, type CredentialsState } from './LoginCredentialsSection';

function CredentialsFixture({
  state,
  onForgotPasswordClick,
  onSendRestartLink,
}: {
  state: CredentialsState;
  onForgotPasswordClick?: () => void;
  onSendRestartLink?: () => void;
}) {
  const form = useForm<LoginInput>({ defaultValues: { email: '', password: '' } });

  return (
    <Form {...form}>
      <form>
        <LoginCredentialsSection
          control={form.control}
          state={state}
          onForgotPasswordClick={onForgotPasswordClick ?? vi.fn()}
          onSendRestartLink={onSendRestartLink ?? vi.fn()}
        />
      </form>
    </Form>
  );
}

const loginState: CredentialsState = {
  isLoggingIn: false,
  isForgotPasswordMode: false,
  isSendingRestartLink: false,
  loginErrorMessage: '',
  showLoginErrorAlert: false,
  restartLinkError: null,
};

const forgotPasswordState: CredentialsState = {
  ...loginState,
  isForgotPasswordMode: true,
};

describe('LoginCredentialsSection', () => {
  it('renders login fields and reports the forgot-password action', async () => {
    const user = userEvent.setup();
    const onForgotPasswordClick = vi.fn();

    renderWithProviders(
      <CredentialsFixture state={loginState} onForgotPasswordClick={onForgotPasswordClick} />,
    );

    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    await user.click(screen.getByTestId('link-forgot-password'));

    expect(onForgotPasswordClick).toHaveBeenCalledOnce();
  });

  it('shows login errors and disables credentials while logging in', () => {
    renderWithProviders(
      <CredentialsFixture
        state={{
          ...loginState,
          isLoggingIn: true,
          showLoginErrorAlert: true,
          loginErrorMessage: 'Invalid email or password.',
        }}
      />,
    );

    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeDisabled();
    expect(screen.getByTestId('input-password')).toBeDisabled();
    expect(screen.getByTestId('button-submit')).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  it('sends a restart link on Enter in forgot-password mode', async () => {
    const user = userEvent.setup();
    const onSendRestartLink = vi.fn();

    renderWithProviders(
      <CredentialsFixture state={forgotPasswordState} onSendRestartLink={onSendRestartLink} />,
    );

    expect(screen.getByText(/confirm your email/i)).toBeInTheDocument();
    expect(screen.queryByTestId('input-password')).not.toBeInTheDocument();
    await user.type(screen.getByTestId('input-email'), 'person@example.com');
    await user.keyboard('{Enter}');

    expect(onSendRestartLink).toHaveBeenCalledOnce();
  });

  it('shows restart-link errors and loading state in forgot-password mode', () => {
    renderWithProviders(
      <CredentialsFixture
        state={{
          ...forgotPasswordState,
          isSendingRestartLink: true,
          restartLinkError: 'Enter a valid email address.',
        }}
      />,
    );

    expect(screen.getByText('Enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByTestId('button-send-restart-link')).toBeDisabled();
    expect(screen.getByText('Sending reset link...')).toBeInTheDocument();
  });
});
