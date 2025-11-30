import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/login";
import { register as registerApi } from "../api/register";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { useLocation } from "wouter";

export function useAuth() {
  const [, setLocation] = useLocation();
  const { user, clearAuth, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      setLocation("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      setLocation("/dashboard");
    },
  });

  const logout = () => {
    clearAuth();
    setLocation("/login");
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
