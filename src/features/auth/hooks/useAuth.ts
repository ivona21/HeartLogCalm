import { useMutation } from '@tanstack/react-query';
import { loginApi as loginApi } from '@/features/auth/api/login.api.ts';
import { registerApi as registerApi } from '@/features/auth/api/register.api.ts';
import { logoutApi } from '@/features/auth/api/logout.api.ts';
import { getCurrentUserApi } from '@/features/auth/api/get-current-user.api.ts';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGOUT_EVENT } from '@/lib/api-client.ts';
import { toast } from '@/shared/hooks/use-toast.ts';
import type { LoginInput } from '@/features/auth/forms/LoginForm/schema.ts';
import type { RegisterInput } from '@/features/auth/forms/RegisterForm/schema.ts';

async function completeAuth(session: Awaited<ReturnType<typeof loginApi>>) {
  const { setAuth, setSession, clearAuth } = useAuthStore.getState();

  setSession(session);

  try {
    const user = await getCurrentUserApi(session.accessToken);
    setAuth(user, session);
  } catch (error) {
    clearAuth();
    throw error;
  }

  return session;
}

export function useAuth() {
  const navigate = useNavigate();
  const { authStatus, clearAuth, session, user } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginInput) => {
      return completeAuth(await loginApi(data));
    },
    onSuccess: () => {
      navigate('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterInput) => {
      await registerApi(data);
    },
  });

  const logout = () => {
    logoutApi()
      .catch((error) => {
        console.error('Logout failed:', error);
      })
      .finally(() => {
        clearAuth();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT));
        }

        const logoutToast = toast({
          variant: 'info',
          description: 'You can still explore your feelings — log in to remember them.',
        });

        window.setTimeout(() => {
          logoutToast.dismiss();
        }, 4500);

        navigate('/');
      });
  };

  return {
    user,
    isLoading: authStatus === 'checking' || (authStatus === 'idle' && !!session),
    isAuthenticated: authStatus === 'authenticated',
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}
