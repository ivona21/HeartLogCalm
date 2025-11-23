import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/authStore";
import type { AuthResponse } from "@/types";
import type { LoginInput } from "@/types/schema";

export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/api/Users/login", data);
  
  if (response.token && response.user) {
    useAuthStore.getState().setAuth(response.user, response.token);
  }
  
  return response;
}
