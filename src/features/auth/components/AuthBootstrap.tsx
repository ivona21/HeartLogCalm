import { useEffect } from 'react';
import { getCurrentUserApi } from '@/features/auth/api/get-current-user.api.ts';
import { useAuthStore } from '@/features/auth/stores/authStore.ts';
import { AUTH_UNAUTHORIZED_EVENT } from '@/lib/api-client.ts';
import { toast } from '@/shared/hooks/use-toast.ts';
import type { ApiError } from '@/shared/types/api-types.ts';

export function AuthBootstrap() {
  const { authStatus, clearAuth, setAuthChecking, session } = useAuthStore();

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
    if (authStatus !== 'idle') {
      return;
    }

    if (!session) {
      clearAuth();
      return;
    }

    setAuthChecking();

    getCurrentUserApi()
      .then((user) => {
        useAuthStore.getState().confirmAuth(user);
      })
      .catch((error: ApiError) => {
        if (error.status === 401) {
          useAuthStore.getState().clearAuth();
          return;
        }

        useAuthStore.getState().confirmAuth();
      });
  }, [authStatus, clearAuth, setAuthChecking, session]);

  return null;
}
