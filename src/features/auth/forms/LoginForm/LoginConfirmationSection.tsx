import { CheckYourInboxSection } from '@/features/auth/components/CheckYourInboxSection.tsx';

interface LoginConfirmationSectionProps {
  email: string;
  onResend: () => Promise<void>;
}

export function LoginConfirmationSection({ email, onResend }: LoginConfirmationSectionProps) {
  return (
    <CheckYourInboxSection
      email={email}
      onResend={onResend}
      className="text-center"
      showFooter={false}
    />
  );
}
