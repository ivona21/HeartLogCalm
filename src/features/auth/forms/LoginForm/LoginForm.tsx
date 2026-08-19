import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Form } from '@/components/ui/form.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { LoginInput, loginSchema } from '@/features/auth/forms/LoginForm/schema.ts';
import { Logo } from '@/components/Logo.tsx';
import { AppLink } from '@/components/ui/app-link.tsx';
import {
  isValidationFailedError,
  isInvalidCredentialsLoginError,
  isUnconfirmedAccountLoginError,
} from '@/features/auth/utils/auth-errors.ts';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { getApiValidationErrors, normalizeApiError } from '@/shared/api/api-errors.ts';
import { LoginConfirmationSection } from '@/features/auth/forms/LoginForm/LoginConfirmationSection.tsx';
import { LoginCredentialsSection } from '@/features/auth/forms/LoginForm/LoginCredentialsSection.tsx';
import { LoginUnconfirmedAccountSection } from '@/features/auth/forms/LoginForm/LoginUnconfirmedAccountSection.tsx';

const AUTH_MODE = {
  Login: 'login',
  ForgotPassword: 'forgot-password',
} as const;

type AuthMode = (typeof AUTH_MODE)[keyof typeof AUTH_MODE];

export function LoginForm() {
  const { login, isLoggingIn, loginError, resetLoginError } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>(AUTH_MODE.Login);
  const [restartLinkMessage, setRestartLinkMessage] = useState<string | null>(null);
  const [restartLinkError, setRestartLinkError] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState('');
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const previousUnconfirmedRef = useRef(false);
  const isForgotPasswordMode = authMode === AUTH_MODE.ForgotPassword;

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginErrorMessage = loginError?.message ?? '';
  const isInvalidCredentialsError = isInvalidCredentialsLoginError(loginError);
  const isUnconfirmedAccountError = isUnconfirmedAccountLoginError(loginError);
  const isValidationFailedLoginError = isValidationFailedError(loginError);

  const showLoginPasswordError = isInvalidCredentialsError && !isForgotPasswordMode;
  const confirmationEmailValue = confirmationEmail ?? '';
  const showConfirmationSection = confirmationEmailValue.length > 0;
  const showLoginErrorAlert = Boolean(loginError && !isInvalidCredentialsError);
  const credentialsState = {
    isLoggingIn,
    isForgotPasswordMode,
    loginErrorMessage,
    showLoginPasswordError,
    showLoginErrorAlert,
    restartLinkError,
    restartLinkMessage,
  };

  const clearTransientAuthState = () => {
    setRestartLinkMessage(null);
    setRestartLinkError(null);
    setResendMessage(null);
    setResendError(null);
    setConfirmationEmail(null);
  };

  const clearAuthFieldErrors = () => {
    form.clearErrors(['email', 'password']);
  };

  const setMode = (mode: AuthMode, options?: { resetPassword?: boolean }) => {
    setAuthMode(mode);
    clearTransientAuthState();
    resetLoginError();
    clearAuthFieldErrors();

    if (options?.resetPassword) {
      form.resetField('password');
    }
  };

  const switchToForgotPasswordMode = () => {
    setMode(AUTH_MODE.ForgotPassword, { resetPassword: true });
  };

  const returnToLoginMode = () => {
    setMode(AUTH_MODE.Login);
  };

  const handleSendRestartLink = () => {
    const email = form.getValues('email').trim();

    if (!email) {
      setRestartLinkError('Enter the email address for your restart link.');
      setRestartLinkMessage(null);
      return;
    }

    setRestartLinkError(null);
    setRestartLinkMessage(`Restart link sent to ${email}.`);
  };

  useEffect(() => {
    if (isInvalidCredentialsError) {
      if (isForgotPasswordMode) {
        return;
      }

      form.clearErrors('email');
      form.setError('password', {
        type: 'manual',
        message: loginErrorMessage || 'Invalid email or password.',
      });
      return;
    }

    if (isValidationFailedLoginError) {
      form.clearErrors(['email', 'password']);
      const applied = applyApiValidationErrors(loginError, form.setError, {
        fieldMap: {
          email: 'email',
          password: 'password',
        },
      });

      if (applied) {
        return;
      }
    }

    if (!isForgotPasswordMode) {
      form.clearErrors(['email', 'password']);
    }
  }, [
    form,
    isInvalidCredentialsError,
    isValidationFailedLoginError,
    isForgotPasswordMode,
    loginError,
    loginErrorMessage,
  ]);

  const resendMutation = useMutation({
    mutationFn: async (email: string) => resendConfirmationApi(email),
    onSuccess: (_data, email) => {
      setResendError(null);
      setResendMessage(null);
      setConfirmationEmail(email);
    },
    onError: (error: unknown) => {
      const apiError = normalizeApiError(error);
      const validationErrors = getApiValidationErrors(error);
      setConfirmationEmail(null);
      setResendMessage(null);
      setResendError(
        validationErrors?.email?.[0] ||
          apiError.message ||
          'Unable to resend the confirmation email.',
      );
    },
  });

  useEffect(() => {
    if (isUnconfirmedAccountError && !previousUnconfirmedRef.current) {
      setResendEmail(form.getValues('email'));
      setResendMessage(null);
      setResendError(null);
      setConfirmationEmail(null);
    }

    if (!isUnconfirmedAccountError) {
      setResendMessage(null);
      setResendError(null);
    }

    previousUnconfirmedRef.current = isUnconfirmedAccountError;
  }, [form, isUnconfirmedAccountError]);

  const handleResendConfirmation = () => {
    const trimmedEmail = resendEmail.trim();

    if (!trimmedEmail) {
      setResendError('Enter the email address you want to confirm.');
      setResendMessage(null);
      return;
    }

    setResendError(null);
    setResendMessage(null);
    resendMutation.mutate(trimmedEmail);
  };

  const onLoginSubmit = (data: LoginInput) => {
    clearTransientAuthState();
    form.clearErrors('password');
    setAuthMode(AUTH_MODE.Login);
    login(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-5">
        <div className="flex justify-center mb-6">
          <Logo variant="complexFull" className="h-40" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">Continue where you left off</p>
        </div>

        {showConfirmationSection ? (
          <LoginConfirmationSection
            email={confirmationEmailValue}
            onResend={async () => resendConfirmationApi(confirmationEmailValue)}
          />
        ) : isUnconfirmedAccountError ? (
          <LoginUnconfirmedAccountSection
            resendEmail={resendEmail}
            isResendPending={resendMutation.isPending}
            resendError={resendError}
            resendMessage={resendMessage}
            onResendEmailChange={(value) => {
              setResendEmail(value);
              setResendError(null);
              setResendMessage(null);
            }}
            onResendConfirmation={handleResendConfirmation}
          />
        ) : (
          <LoginCredentialsSection
            control={form.control}
            state={credentialsState}
            onForgotPasswordClick={switchToForgotPasswordMode}
            onSendRestartLink={handleSendRestartLink}
          />
        )}
      </form>
      <div className="mt-16 space-y-6 text-center">
        {isForgotPasswordMode && (
          <div>
            <p className="text-sm text-muted-foreground">
              <AppLink
                to="/login"
                className="font-medium"
                onClick={returnToLoginMode}
                data-testid="link-back-to-login"
              >
                Back to Login
              </AppLink>
            </p>
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <AppLink to="/register" className="font-medium" data-testid="link-register">
              Sign up
            </AppLink>
          </p>
        </div>
      </div>
    </Form>
  );
}
