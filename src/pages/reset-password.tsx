import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ResetPasswordRecovery } from '@/features/auth/components/ResetPasswordRecovery.tsx';
import { useAuthStore } from '@/features/auth/stores/authStore.ts';
import {
  isResetPasswordStatus,
  type ResetPasswordStatus,
} from '@/features/auth/utils/reset-password.ts';

function clearBrowserCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const cookieName = cookie.split('=')[0]?.trim();

    if (!cookieName) {
      return;
    }

    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

function clearResetPasswordSessionState() {
  useAuthStore.getState().clearAuth();

  window.localStorage.removeItem('auth-storage');
  window.sessionStorage.clear();
  clearBrowserCookies();
}

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get('status');
  const status: ResetPasswordStatus | 'missing' = isResetPasswordStatus(statusParam)
    ? statusParam
    : 'missing';

  useEffect(() => {
    clearResetPasswordSessionState();
  }, []);

  return (
    <AuthLayout>
      <ResetPasswordRecovery status={status} />
    </AuthLayout>
  );
}
