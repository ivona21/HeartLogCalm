import { apiClient } from '@/lib/api-client.ts';
import type { ApiResponse } from '@/shared/types/api-types.ts';

export async function logoutApi(): Promise<ApiResponse> {
  return apiClient.post<ApiResponse>('/api/auth/logout');
}
