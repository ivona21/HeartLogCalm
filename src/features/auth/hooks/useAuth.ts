import { useMutation } from '@tanstack/react-query';
import { loginApi as loginApi } from '@/features/auth/api/login.api.ts';
import { registerApi as registerApi } from '@/features/auth/api/register.api.ts';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { AUTH_LOGOUT_EVENT } from '@/lib/api-client.ts';
import { toast } from '@/shared/hooks/use-toast.ts';

export function useAuth() {
  const navigate = useNavigate();
  const { authStatus, clearAuth, token, user } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (_, variables) => {
      loginMutation.mutate({
        email: variables.email,
        password: variables.password,
      });
    },
    onError: (error) => {
      console.log('error: ', error);
    },
  });

  const logout = () => {
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
  };

  return {
    user,
    isLoading: authStatus === 'checking' || (authStatus === 'idle' && !!token),
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
