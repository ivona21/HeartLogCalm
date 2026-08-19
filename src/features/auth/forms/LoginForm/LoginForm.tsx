import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button.tsx';
import { Form } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { PasswordInput } from '@/components/ui/password-input.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { AlertCircleIcon, Loader2Icon, MailIcon, RotateCcwIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { LoginInput, loginSchema } from '@/features/auth/forms/LoginForm/schema.ts';
import { Logo } from '@/components/Logo.tsx';
import { AppLink } from '@/components/ui/app-link.tsx';
import { CheckYourInboxSection } from '@/features/auth/components/CheckYourInboxSection.tsx';
import {
  isValidationFailedError,
  isInvalidCredentialsLoginError,
  isUnconfirmedAccountLoginError,
} from '@/features/auth/utils/auth-errors.ts';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import { FormInputField } from '@/components/form/FormInputField.tsx';
import { applyApiValidationErrors } from '@/shared/forms/apply-api-validation-errors.ts';
import { getApiValidationErrors, normalizeApiError } from '@/shared/api/api-errors.ts';

export function LoginForm() {
  const { login, isLoggingIn, loginError, resetLoginError } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'forgot-password'>('login');
  const [restartLinkMessage, setRestartLinkMessage] = useState<string | null>(null);
  const [restartLinkError, setRestartLinkError] = useState<string | null>(null);
  const [resendEmail, setResendEmail] = useState('');
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null);
  const previousUnconfirmedRef = useRef(false);
  const isForgotPasswordMode = authMode === 'forgot-password';
  const loginTextButtonClassName =
    'text-sm text-accent-foreground hover:text-primary transition-colors duration-150';
  const linkStyleClassName =
    'text-link hover:text-link-hover active:text-link-active underline-offset-4 hover:underline transition-colors duration-150';

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

  const switchToForgotPasswordMode = () => {
    setAuthMode('forgot-password');
    setRestartLinkMessage(null);
    setRestartLinkError(null);
    setConfirmationEmail(null);
    resetLoginError();
    form.clearErrors(['email', 'password']);
    form.resetField('password');
  };

  const returnToLoginMode = () => {
    setAuthMode('login');
    setRestartLinkMessage(null);
    setRestartLinkError(null);
    setConfirmationEmail(null);
    resetLoginError();
    form.clearErrors(['email', 'password']);
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
    setConfirmationEmail(null);
    setResendMessage(null);
    setResendError(null);
    form.clearErrors('password');
    setAuthMode('login');
    login(data);
  };

  if (showConfirmationSection) {
    return (
      <Form {...form}>
        <div className="space-y-5">
          <div className="flex justify-center mb-6">
            <Logo variant="complexFull" className="h-40" />
          </div>

          <CheckYourInboxSection
            email={confirmationEmailValue}
            onResend={async () => resendConfirmationApi(confirmationEmailValue)}
            className="text-center"
            showFooter={false}
          />

          <div className="mt-16 space-y-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <AppLink to="/register" className="font-medium" data-testid="link-register">
                  Sign up
                </AppLink>
              </p>
            </div>
          </div>
        </div>
      </Form>
    );
  }

  if (isUnconfirmedAccountError) {
    return (
      <Form {...form}>
        <div className="space-y-5">
          <div className="flex justify-center mb-6">
            <Logo variant="complexFull" className="h-40" />
          </div>

          <div className="space-y-3">
            <Alert className="border-primary/30 bg-primary/10">
              <MailIcon className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                Your email address hasn’t been confirmed yet. Check your inbox, or use the email
                address below to get a new confirmation link.
              </AlertDescription>
            </Alert>

            <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-4">
              <div className="space-y-2">
                <label htmlFor="resend-email" className="text-sm font-medium text-foreground">
                  Confirmation email
                </label>
                <Input
                  id="resend-email"
                  type="email"
                  value={resendEmail}
                  onChange={(event) => {
                    setResendEmail(event.target.value);
                    setResendError(null);
                    setResendMessage(null);
                  }}
                  placeholder="Your email"
                  disabled={resendMutation.isPending}
                  className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-resend-email"
                />
              </div>

              {resendError && (
                <p className="text-sm text-destructive" data-testid="text-resend-error">
                  {resendError}
                </p>
              )}

              {resendMessage && (
                <p className="text-sm text-primary" data-testid="text-resend-success">
                  {resendMessage}
                </p>
              )}

              <Button
                type="button"
                variant="default"
                className="w-full font-medium"
                disabled={resendMutation.isPending}
                onClick={handleResendConfirmation}
                data-testid="button-resend-confirmation"
              >
                {resendMutation.isPending ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Sending confirmation email...
                  </>
                ) : (
                  <>
                    <RotateCcwIcon className="h-4 w-4" />
                    Resend confirmation email
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-16 space-y-6 text-center">
            <div>
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <AppLink to="/register" className="font-medium" data-testid="link-register">
                  Sign up
                </AppLink>
              </p>
            </div>
          </div>
        </div>
      </Form>
    );
  }

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

        <FormInputField
          control={form.control}
          name="email"
          label="Email"
          renderInput={(field) => (
            <Input
              {...field}
              type="email"
              placeholder="Your email"
              disabled={isLoggingIn}
              onKeyDown={(event) => {
                if (isForgotPasswordMode && event.key === 'Enter') {
                  event.preventDefault();
                  handleSendRestartLink();
                }
              }}
              className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
              data-testid="input-email"
            />
          )}
        />

        {isForgotPasswordMode ? (
          <div className="space-y-3 pt-2">
            {restartLinkError && (
              <p className="pl-0.5 text-xs font-medium text-destructive">{restartLinkError}</p>
            )}

            {restartLinkMessage && (
              <p className="pl-0.5 text-xs font-medium text-primary">{restartLinkMessage}</p>
            )}

            <Button
              type="button"
              variant="default"
              className="w-full font-medium"
              onClick={handleSendRestartLink}
              data-testid="button-send-restart-link"
            >
              Send restart link
            </Button>
          </div>
        ) : (
          <>
            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              renderInput={(field) => (
                <PasswordInput
                  {...field}
                  placeholder="Your password"
                  disabled={isLoggingIn}
                  className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-password"
                />
              )}
            />
            {showLoginPasswordError && (
              <div className="mb-4 flex justify-end text-right" style={{ marginTop: '-20px' }}>
                <button
                  type="button"
                  className={loginTextButtonClassName}
                  onClick={switchToForgotPasswordMode}
                  data-testid="link-forgot-password"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {loginError && !isInvalidCredentialsError && (
              <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                <AlertCircleIcon className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  {loginErrorMessage || 'Login failed. Please check your credentials.'}
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-6">
              <Button
                type="submit"
                className="w-full hover:to-primary text-primary-foreground font-medium transition-all duration-200"
                disabled={isLoggingIn}
                data-testid="button-submit"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </div>
          </>
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
