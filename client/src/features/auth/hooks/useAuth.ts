import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../api/login";
import { register as registerApi } from "../api/register";
import { getCurrentUser, logout as logoutApi } from "../api/getCurrentUser";
import type { LoginInput, RegisterInput } from "@shared/schema";
import { useLocation } from "wouter";

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getCurrentUser,
    retry: false,
    enabled: !!localStorage.getItem("auth_token"),
    throwOnError: (error: any) => {
      // Clear stale token on 401 unauthorized
      if (error?.message?.toLowerCase().includes("unauthorized") || 
          error?.status === 401) {
        localStorage.removeItem("auth_token");
        queryClient.setQueryData(["auth", "user"], null);
        return false; // Don't throw, just fail gracefully
      }
      return true;
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      setLocation("/dashboard");
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user);
      setLocation("/dashboard");
    },
  });

  const logout = () => {
    logoutApi();
    queryClient.setQueryData(["auth", "user"], null);
    setLocation("/login");
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}
