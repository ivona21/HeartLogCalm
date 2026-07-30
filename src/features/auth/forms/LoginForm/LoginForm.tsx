import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { PasswordInput } from '@/components/ui/PasswordInput.tsx';
import { useAuth } from '../../hooks/useAuth.ts';
import { AlertCircleIcon, Loader2Icon, MailIcon, RotateCcwIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/Alert.tsx';
import { LoginInput, loginSchema } from '@/features/auth/forms/LoginForm/schema.ts';
import { ApiError } from '@/shared/types/api-types.ts';
import { Logo } from '@/components/Logo.tsx';
import { isUnconfirmedAccountLoginError } from '@/features/auth/utils/auth-errors.ts';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';

export function LoginForm() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [resendEmail, setResendEmail] = useState('');
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);
  const previousUnconfirmedRef = useRef(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginErrorMessage = (loginError as ApiError | null | undefined)?.message ?? '';
  const isUnconfirmedAccountError = isUnconfirmedAccountLoginError(loginErrorMessage);

  const resendMutation = useMutation({
    mutationFn: async (email: string) => resendConfirmationApi(email),
    onSuccess: (_data, email) => {
      setResendError(null);
      setResendMessage(`We sent another confirmation email to ${email}.`);
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      setResendMessage(null);
      setResendError(apiError.message || 'Unable to resend the confirmation email.');
    },
  });

  useEffect(() => {
    if (isUnconfirmedAccountError && !previousUnconfirmedRef.current) {
      setResendEmail(form.getValues('email'));
      setResendMessage(null);
      setResendError(null);
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

  const onSubmit = (data: LoginInput) => {
    setResendMessage(null);
    setResendError(null);
    login(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
          <p className="text-sm text-muted-foreground">Continue where you left off</p>
        </div>

        <div className="flex justify-center mb-8">
          <Logo variant="complexFull" className="h-40" />
        </div>

        {loginError && !isUnconfirmedAccountError && (
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              {loginErrorMessage || 'Login failed. Please check your credentials.'}
            </AlertDescription>
          </Alert>
        )}

        {isUnconfirmedAccountError && (
          <div className="space-y-4">
            <Alert className="border-primary/30 bg-primary/10">
              <MailIcon className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                Your email address has not been confirmed yet. Enter the address below to send a new
                confirmation link.
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
                variant="secondary"
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
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Your email"
                  disabled={isLoggingIn}
                  className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-email"
                />
              </FormControl>
              <FormMessage className="text-destructive text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="Your password"
                  disabled={isLoggingIn}
                  className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                  data-testid="input-password"
                />
              </FormControl>
              <FormMessage className="text-destructive text-sm" />
              <div className="text-right mt-2">
                <button
                  type="button"
                  className="text-sm text-accent-foreground hover:text-primary transition-colors duration-150"
                  data-testid="link-forgot-password"
                >
                  Forgot password?
                </button>
              </div>
            </FormItem>
          )}
        />

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
      </form>
    </Form>
  );
}
