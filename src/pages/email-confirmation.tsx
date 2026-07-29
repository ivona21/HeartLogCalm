import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2Icon, AlertCircleIcon, Loader2Icon, MailIcon, RotateCcwIcon } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { Label } from '@/components/ui/Label.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import type { ApiError } from '@/shared/types/api-types.ts';

type ConfirmationStatus = 'success' | 'expired' | 'invalid';

function isConfirmationStatus(value: string | null): value is ConfirmationStatus {
  return value === 'success' || value === 'expired' || value === 'invalid';
}

function getStatusCopy(status: ConfirmationStatus) {
  switch (status) {
    case 'success':
      return {
        title: 'Email confirmed',
        description:
          'Your email address is confirmed. You can now log in and continue to your account.',
        variant: 'success' as const,
      };
    case 'expired':
      return {
        title: 'Confirmation link expired',
        description:
          'That confirmation link is no longer valid. Enter your email address below and we will send a new one.',
        variant: 'warning' as const,
      };
    case 'invalid':
    default:
      return {
        title: 'Invalid confirmation link',
        description:
          'We could not verify that confirmation link. You can try again from login or register.',
        variant: 'error' as const,
      };
  }
}

export default function EmailConfirmationPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status: ConfirmationStatus = isConfirmationStatus(statusParam) ? statusParam : 'invalid';
  const [email, setEmail] = useState('');
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const copy = useMemo(() => getStatusCopy(status), [status]);

  const resendMutation = useMutation({
    mutationFn: async (targetEmail: string) => resendConfirmationApi(targetEmail),
    onSuccess: (_data, targetEmail) => {
      setResendError(null);
      setResendMessage(`We sent a new confirmation email to ${targetEmail}.`);
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      setResendMessage(null);
      setResendError(apiError.message || 'Unable to resend the confirmation email.');
    },
  });

  const handleResend = () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setResendError('Enter the email address you want to confirm.');
      setResendMessage(null);
      return;
    }

    setResendError(null);
    setResendMessage(null);
    resendMutation.mutate(trimmedEmail);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Email confirmation</h1>
          <p className="text-sm text-muted-foreground">
            Use the status below to finish setting up your account.
          </p>
        </div>

        <Alert
          variant={copy.variant === 'error' ? 'destructive' : 'default'}
          className={
            copy.variant === 'success'
              ? 'border-primary/30 bg-primary/10'
              : copy.variant === 'warning'
              ? 'border-border bg-muted/30'
              : 'bg-destructive/10 border-destructive/30'
          }
        >
          {copy.variant === 'success' ? (
            <CheckCircle2Icon className="h-4 w-4 text-primary" />
          ) : copy.variant === 'warning' ? (
            <MailIcon className="h-4 w-4 text-foreground" />
          ) : (
            <AlertCircleIcon className="h-4 w-4 text-destructive" />
          )}
          <AlertTitle className={copy.variant === 'error' ? 'text-destructive' : 'text-foreground'}>
            {copy.title}
          </AlertTitle>
          <AlertDescription className={copy.variant === 'error' ? 'text-destructive' : 'text-muted-foreground'}>
            {copy.description}
          </AlertDescription>
        </Alert>

        {status === 'expired' && (
          <div className="space-y-4 rounded-lg border border-border bg-muted/20 p-4">
            <div className="space-y-2">
              <Label htmlFor="confirmation-email">Email address</Label>
              <Input
                id="confirmation-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setResendError(null);
                  setResendMessage(null);
                }}
                placeholder="Your email"
                disabled={resendMutation.isPending}
                className="bg-background border-border focus-visible:ring-primary transition-all duration-200"
                data-testid="input-confirmation-email"
              />
            </div>

            {resendError && (
              <p className="text-sm text-destructive" data-testid="text-confirmation-error">
                {resendError}
              </p>
            )}

            {resendMessage && (
              <p className="text-sm text-primary" data-testid="text-confirmation-success">
                {resendMessage}
              </p>
            )}

            <Button
              type="button"
              className="w-full font-medium"
              disabled={resendMutation.isPending}
              onClick={handleResend}
              data-testid="button-confirmation-resend"
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
        )}

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full font-medium">
            <AppLink to="/login">Go to login</AppLink>
          </Button>
          <Button asChild variant="secondary" className="w-full font-medium">
            <AppLink to="/register">Back to register</AppLink>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
