import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2Icon, Loader2Icon, RotateCcwIcon } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Alert, AlertDescription } from '@/components/ui/Alert.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Input } from '@/components/ui/Input.tsx';
import { Label } from '@/components/ui/Label.tsx';
import { AppLink } from '@/components/ui/AppLink.tsx';
import { resendConfirmationApi } from '@/features/auth/api/resend-confirmation.api.ts';
import type { ApiError } from '@/shared/types/api-types.ts';

type ConfirmationStatus = 'success' | 'expired' | 'invalid';

type ConfirmationPageActions = {
  goToLogin: () => void;
  handleResend: () => void;
};

type ConfirmationPageContext = ConfirmationPageActions & {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  resendError: string | null;
  resendMessage: string | null;
  setResendError: Dispatch<SetStateAction<string | null>>;
  setResendMessage: Dispatch<SetStateAction<string | null>>;
  resendMutation: {
    isPending: boolean;
  };
};

type ConfirmationStatusContent = {
  intro: (context: ConfirmationPageContext) => ReactNode;
  panel?: (context: ConfirmationPageContext) => ReactNode;
  footer: (context: ConfirmationPageContext) => ReactNode;
};

const confirmationStatusContent: Record<ConfirmationStatus, ConfirmationStatusContent> = {
  success: {
    intro: () => (
      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">Email confirmed!</h1>
          <div className="flex justify-center">
            <CheckCircle2Icon className="h-24 w-24 text-green-600" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-semibold text-foreground">
            Your account is now active.
            <br />
            <span className="text-base font-normal">
              You can now log in and start tracking your emotions.
            </span>
          </p>
        </div>
      </div>
    ),
    footer: ({ goToLogin }) => (
      <div className="flex flex-col gap-3">
        <Button
          type="button"
          className="w-full hover:to-primary text-primary-foreground font-medium transition-all duration-200"
          onClick={goToLogin}
        >
          Log In
        </Button>
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          You&apos;ll use the same email address and password
          <br />
          you chose during registration.
        </p>
      </div>
    ),
  },
  expired: {
    intro: () => (
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Confirmation link expired</h1>
        <Alert className="border-border bg-muted/30">
          <AlertDescription className="text-muted-foreground">
            That link is no longer valid. Enter your email below and we will send a fresh
            confirmation email.
          </AlertDescription>
        </Alert>
      </div>
    ),
    panel: ({
      email,
      setEmail,
      resendError,
      resendMessage,
      setResendError,
      setResendMessage,
      resendMutation,
      handleResend,
    }) => (
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
    ),
    footer: ({ goToLogin }) => (
      <div className="flex flex-col gap-3">
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <AppLink to="/login" data-testid="link-login" className="font-medium">
              Log in
            </AppLink>
          </p>
        </div>
      </div>
    ),
  },
  invalid: {
    intro: () => (
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Invalid confirmation link</h1>
        <Alert className="bg-destructive/10 border-destructive/30">
          <AlertDescription className="text-destructive">
            We could not verify that confirmation link. Go back to login or register and try again.
          </AlertDescription>
        </Alert>
      </div>
    ),
    footer: () => (
      <div className="flex flex-col gap-3">
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <AppLink to="/login" data-testid="link-login" className="font-medium">
              Log in
            </AppLink>
          </p>
        </div>
      </div>
    ),
  },
};

function isConfirmationStatus(value: string | null): value is ConfirmationStatus {
  return value === 'success' || value === 'expired' || value === 'invalid';
}

export default function EmailConfirmationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status: ConfirmationStatus = isConfirmationStatus(statusParam) ? statusParam : 'invalid';
  const [email, setEmail] = useState('');
  const [resendError, setResendError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const content = confirmationStatusContent[status];

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

  const actions: ConfirmationPageActions = {
    goToLogin: () => navigate('/login'),
    handleResend,
  };
  const context: ConfirmationPageContext = {
    ...actions,
    email,
    setEmail,
    resendError,
    resendMessage,
    setResendError,
    setResendMessage,
    resendMutation: {
      isPending: resendMutation.isPending,
    },
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {content.intro(context)}
        {content.panel?.(context)}
        {content.footer(context)}
      </div>
    </AuthLayout>
  );
}
