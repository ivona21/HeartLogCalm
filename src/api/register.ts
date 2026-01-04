import { apiClient } from "@/lib/api-client.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import type { AuthResponse, User } from "@/types";
import {RegisterInput} from "@/features/auth/forms/RegisterForm/schema.ts";

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
