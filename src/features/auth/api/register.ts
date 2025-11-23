import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/stores/authStore";
import type { AuthResponse, User } from "@/types";
import type { RegisterInput } from "@/types/schema";

export async function register(data: RegisterInput): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>("/api/Users/register", data);
  
  if (response.token && response.email && response.username) {
    const user: User = {
      email: response.email,
      username: response.username,
    };
    useAuthStore.getState().setAuth(user, response.token);
  }
  
  return response;
}
