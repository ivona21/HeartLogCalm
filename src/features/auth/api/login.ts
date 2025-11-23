import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/authStore";
import type { AuthResponse, User } from "@/types";
import type { LoginInput } from "@/types/schema";

export async function login(data: LoginInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/api/Users/login", data);
  
  if (response.token && response.email && response.username) {
    const user: User = {
      email: response.email,
      username: response.username,
    };
    useAuthStore.getState().setAuth(user, response.token);
  }
  
  return response;
}
