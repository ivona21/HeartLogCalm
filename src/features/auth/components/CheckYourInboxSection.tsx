import { useEffect, useState } from 'react';
import { Loader2Icon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import {
  CHECK_YOUR_INBOX_CONTENT,
  type CheckYourInboxMode,
} from '@/features/auth/components/check-your-inbox-section.config.tsx';
import { resendCheckYourInboxEmail } from '@/features/auth/components/check-your-inbox-section.helpers.ts';

interface CheckYourInboxSectionProps {
  mode: CheckYourInboxMode;
  email: string;
}

export function CheckYourInboxSection({ mode, email }: CheckYourInboxSectionProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const content = CHECK_YOUR_INBOX_CONTENT[mode];

  useEffect(() => {
    setIsSending(false);
    setIsSent(false);
    setResendError(null);
  }, [email]);

  const handleResend = async () => {
    if (isSending || isSent) {
      return;
    }

    setResendError(null);
    setIsSending(true);

    try {
      await resendCheckYourInboxEmail(mode, email);
      setIsSent(true);
    } catch (error) {
      const apiError = error as { message?: string } | null;
      setResendError(apiError?.message || content.resendErrorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="flex flex-col items-center space-y-3">
        <MailIcon className="h-10 w-10 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Check your inbox</h3>
        <p className="text-sm text-muted-foreground">{content.description(email)}</p>
      </div>

      <div className="h-3" />

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          No email yet? Wait a minute or check your spam folder.
        </p>

        <Button
          type="button"
          variant="ghost"
          className={`h-auto min-h-0 px-0 py-0 text-sm font-medium underline underline-offset-4 hover:bg-transparent ${
            isSent
              ? 'cursor-default !text-primary !opacity-100 no-underline font-semibold pointer-events-none'
              : 'text-accent-foreground hover:text-primary'
          }`}
          disabled={isSending}
          onClick={isSent ? undefined : handleResend}
          tabIndex={isSent ? -1 : undefined}
        >
          {isSending ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : isSent ? (
            content.resendSuccessMessage
          ) : (
            'Send me an email again.'
          )}
        </Button>

        {resendError && <p className="text-sm text-destructive">{resendError}</p>}
      </div>
    </div>
  );
}
