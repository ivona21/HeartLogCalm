import { apiClient } from '@/lib/api-client.ts';
import { LoginInput } from '@/features/auth/forms/LoginForm/schema.ts';
import { LoginResponseDto } from '@/features/auth/types/login.dto.ts';
import { ApiResponse } from '@/shared/types/api-types.ts';

export async function loginApi(data: LoginInput): Promise<ApiResponse<LoginResponseDto>> {
  return apiClient.post<ApiResponse<LoginResponseDto>>('/api/auth/login', data);
}
