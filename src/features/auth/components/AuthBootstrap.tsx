import { useEffect } from 'react';
import { getCurrentUserApi } from '@/features/auth/api/get-current-user.api.ts';
import { useAuthStore } from '@/features/auth/stores/authStore.ts';
import { AUTH_UNAUTHORIZED_EVENT } from '@/lib/api-client.ts';
import { toast } from '@/shared/hooks/use-toast.ts';
import type { ApiError } from '@/shared/types/api-types.ts';

export function AuthBootstrap() {
  const { authStatus, setAuthChecking, token } = useAuthStore();

  useEffect(() => {
    const handleUnauthorized = () => {
      toast({
        title: 'Session expired',
        description: 'Log in again to keep saving your emotions.',
      });
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, []);

  useEffect(() => {
    if (!token || authStatus !== 'idle') {
      return;
    }

    let cancelled = false;
    setAuthChecking();

    getCurrentUserApi()
      .then((user) => {
        if (cancelled) {
          return;
        }

        useAuthStore.getState().confirmAuth(user);
      })
      .catch((error: ApiError) => {
        if (cancelled) {
          return;
        }

        if (error.status === 401) {
          return;
        }

        useAuthStore.getState().confirmAuth();
      });

    return () => {
      cancelled = true;
    };
  }, [authStatus, setAuthChecking, token]);

  return null;
}
