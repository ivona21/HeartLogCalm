import { Loader2Icon, MailIcon, RotateCcwIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';

interface LoginUnconfirmedAccountSectionProps {
  resendEmail: string;
  isResendPending: boolean;
  resendError: string | null;
  resendMessage: string | null;
  onResendEmailChange: (value: string) => void;
  onResendConfirmation: () => void;
}

export function LoginUnconfirmedAccountSection({
  resendEmail,
  isResendPending,
  resendError,
  resendMessage,
  onResendEmailChange,
  onResendConfirmation,
}: LoginUnconfirmedAccountSectionProps) {
  return (
    <div className="space-y-3">
      <Alert className="border-primary/30 bg-primary/10">
        <MailIcon className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          Your email address hasn&apos;t been confirmed yet. Check your inbox, or use the email
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
            onChange={(event) => onResendEmailChange(event.target.value)}
            placeholder="Your email"
            disabled={isResendPending}
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
          disabled={isResendPending}
          onClick={onResendConfirmation}
          data-testid="button-resend-confirmation"
        >
          {isResendPending ? (
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
  );
}
