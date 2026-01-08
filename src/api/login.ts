import { apiClient } from "@/lib/api-client.ts";
import { useAuthStore } from "@/stores/authStore.ts";
import type { ApiResponse, LoginResponseDto, User } from "@/types";
import {LoginInput} from "@/features/auth/forms/LoginForm/schema.ts";

export async function login(data: LoginInput): Promise<ApiResponse<LoginResponseDto>> {
  const response = await apiClient.post<ApiResponse<LoginResponseDto>>("/api/auth/login", data);
  
  if (response.success && response.data) {
    const { email, token, username } = response.data;
    const user: User = {
      email: email,
      username: username || email.split('@')[0], // Fallback if username is missing
    };
    useAuthStore.getState().setAuth(user, token);
  }
  
  return response;
}
