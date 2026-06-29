import { apiClient } from '@/lib/api-client.ts';
import type { ApiResponse } from '@/shared/types/api-types.ts';
import type { User } from '@/features/auth/types/user.ts';

function isApiResponse(value: ApiResponse<User> | User): value is ApiResponse<User> {
  return 'success' in value || 'message' in value;
}

export async function getCurrentUserApi(accessToken?: string): Promise<User> {
  const response = accessToken
    ? await apiClient.getWithAccessToken<ApiResponse<User> | User>('/api/auth/me', accessToken)
    : await apiClient.get<ApiResponse<User> | User>('/api/auth/me');

  if (isApiResponse(response)) {
    if (!response.data) {
      throw new Error('Missing user payload');
    }

    return response.data;
  }

  return response;
}
