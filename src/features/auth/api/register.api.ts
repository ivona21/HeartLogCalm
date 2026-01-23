import { apiClient } from '@/lib/api-client.ts';
import { RegisterInput } from '@/features/auth/forms/RegisterForm/schema.ts';
import { ApiResponse } from '@/shared/types/api-types.ts';

export async function registerApi(data: RegisterInput): Promise<ApiResponse> {
  const response = await apiClient.post<ApiResponse>('/api/auth/register', data);
  return response;
}
