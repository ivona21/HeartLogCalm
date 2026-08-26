import { useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ResetPasswordRecovery } from '@/features/auth/components/ResetPasswordRecovery.tsx';
import {
  isResetPasswordStatus,
  type ResetPasswordStatus,
} from '@/features/auth/utils/reset-password.ts';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status: ResetPasswordStatus | 'missing' = isResetPasswordStatus(statusParam)
    ? statusParam
    : 'missing';

  return (
    <AuthLayout>
      <ResetPasswordRecovery status={status} />
    </AuthLayout>
  );
}
