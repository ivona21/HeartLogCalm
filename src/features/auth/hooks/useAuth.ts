import { useMutation } from '@tanstack/react-query';
import { loginApi as loginApi } from '@/features/auth/api/login.api.ts';
import { registerApi as registerApi } from '@/features/auth/api/register.api.ts';
import { useAuthStore } from '@/features/auth/stores/authStore';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();
  const { user, clearAuth, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate('/dashboard');
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
    navigate('/login');
  };

  return {
    user,
    isLoading: false,
    isAuthenticated: isAuthenticated(),
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}
