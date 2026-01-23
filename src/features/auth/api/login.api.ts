import { apiClient } from '@/lib/api-client.ts';
import { useAuthStore } from '@/features/auth/stores/authStore.ts';
import { LoginInput } from '@/features/auth/forms/LoginForm/schema.ts';
import { LoginResponseDto } from '@/features/auth/types/login.dto.ts';
import { User } from '@/features/auth/types/user.ts';
import { ApiResponse } from '@/shared/types/api-types.ts';

export async function loginApi(data: LoginInput): Promise<ApiResponse<LoginResponseDto>> {
  const response = await apiClient.post<ApiResponse<LoginResponseDto>>('/api/auth/login', data);

  if (response.success && response.data) {
    const { email, token, username } = response.data;
    const user: User = {
      email: email,
      username: username || email.split('@')[0], // Fallback if username is missing
    };
    useAuthStore.getState().setAuth(user, token); //todo - change this! this doesn't belong here
  }

  return response;
}
