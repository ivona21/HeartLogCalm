import { apiClient } from '@/lib/api-client.ts';
import { RegisterInput } from '@/features/auth/forms/RegisterForm/schema.ts';
import { ApiResponse } from '@/shared/types/api-types.ts';
import type { AuthSession } from '@/features/auth/types/auth-session.ts';

export async function registerApi(data: RegisterInput): Promise<ApiResponse<AuthSession>> {
  return apiClient.post<ApiResponse<AuthSession>>('/api/auth/register', data);
}
