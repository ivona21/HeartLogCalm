import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Form } from '@/components/ui/form.tsx';
import { useAuth } from '@/features/auth';
import { LoginInput, loginSchema } from '@/features/auth/forms/LoginForm/schema.ts';
import { AppLink } from '@/components/ui/app-link.tsx';
import {
  isValidationFailedError,
  isInvalidCredentialsLoginError,
  isUnconfirmedAccountLoginError,
} from '@/features/auth/utils/auth-errors.ts';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import { forgotPasswordApi } from '@/features/auth/api/forgot-password.api.ts';
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { getApiValidationErrors, normalizeApiError } from '@/shared/api/api-errors.ts';
import { CheckYourInboxSection } from '@/features/auth/components/CheckYourInboxSection.tsx';
import { AuthBrandHeader } from '@/features/auth/components/AuthBrandHeader.tsx';
import { BackToLoginLink } from '@/features/auth/components/BackToLoginLink.tsx';
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
  const [restartLinkError, setRestartLinkError] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState('');
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState<string | null>(null);
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

  const clearTransientAuthState = () => {
    setRestartLinkError(null);
    setResendMessage(null);
    setResendError(null);
    setConfirmationEmail(null);
    setForgotPasswordEmail(null);
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
    form.reset({
      email: '',
      password: '',
    });
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

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => forgotPasswordApi(email),
    onSuccess: (_data, email) => {
      setRestartLinkError(null);
      setForgotPasswordEmail(email);
    },
    onError: (error: unknown) => {
      const validationErrors = getApiValidationErrors(error);
      const apiError = normalizeApiError(error);

      setForgotPasswordEmail(null);

      if (applyApiValidationErrors(error, form.setError, { fieldMap: { email: 'email' } })) {
        setRestartLinkError(null);
        return;
      }

      if (validationErrors?.email?.[0]) {
        setRestartLinkError(null);
        form.setError('email', {
          type: 'manual',
          message: validationErrors.email[0],
        });
        return;
      }

      setRestartLinkError(apiError.message || 'Unable to send the reset link.');
    },
  });

  const showLoginPasswordError = isInvalidCredentialsError && !isForgotPasswordMode;
  const confirmationEmailValue = confirmationEmail ?? '';
  const showConfirmationSection = confirmationEmailValue.length > 0;
  const showForgotPasswordInbox = Boolean(forgotPasswordEmail);
  const showInboxSection = showConfirmationSection || showForgotPasswordInbox;
  const showLoginErrorAlert = Boolean(loginError && !isInvalidCredentialsError);
  const credentialsState = {
    isLoggingIn,
    isForgotPasswordMode,
    isSendingRestartLink: forgotPasswordMutation.isPending,
    loginErrorMessage,
    showLoginPasswordError,
    showLoginErrorAlert,
    restartLinkError,
  };

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

  const handleSendRestartLink = async () => {
    const isEmailValid = await form.trigger('email');

    if (!isEmailValid) {
      setRestartLinkError(null);
      return;
    }

    const email = form.getValues('email').trim();

    setRestartLinkError(null);
    setForgotPasswordEmail(null);
    forgotPasswordMutation.mutate(email);
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
        {!showInboxSection && (
          <div className="text-center mb-6">
            {isForgotPasswordMode ? (
              <h2 className="text-2xl font-semibold text-foreground">Forgot password?</h2>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
                <p className="text-sm text-muted-foreground">Continue where you left off</p>
              </>
            )}
          </div>
        )}

        <AuthBrandHeader />

        {showConfirmationSection ? (
          <CheckYourInboxSection mode="email-confirmation" email={confirmationEmailValue} />
        ) : showForgotPasswordInbox && forgotPasswordEmail ? (
          <>
            <CheckYourInboxSection mode="password-reset" email={forgotPasswordEmail} />
            <BackToLoginLink className="text-center" onClick={returnToLoginMode} />
          </>
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
      {!showInboxSection && (
        <div className="mt-16 space-y-6 text-center">
          {isForgotPasswordMode && <BackToLoginLink onClick={returnToLoginMode} />}

          <div>
            <hr className="mb-4 border-border" />
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <AppLink to="/register" className="font-medium" data-testid="link-register">
                Sign up
              </AppLink>
            </p>
          </div>
        </div>
      )}
    </Form>
  );
}
