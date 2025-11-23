import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/authStore";
import type { AuthResponse } from "@/types";
import type { RegisterInput } from "@/types/schema";

export async function register(data: RegisterInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/api/Users/register", data);
  
  if (response.token && response.user) {
    useAuthStore.getState().setAuth(response.user, response.token);
  }
  
  return response;
}
