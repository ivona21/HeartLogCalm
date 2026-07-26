import { apiClient } from '@/lib/api-client.ts';
import { authGetCurrentUser } from '@/shared/api/heartlog.generated.ts';
import { mapUserDto, toUser } from '@/shared/api/heartlog-normalizers.ts';
import type { User } from '@/features/auth/types/user.ts';
import type { UserMeResponseDto, UserMeResponseDtoApiResponse } from '@/shared/api/heartlog.generated.ts';

export async function getCurrentUserApi(accessToken?: string): Promise<User> {
  if (accessToken) {
    const response = await apiClient.getWithAccessToken<UserMeResponseDtoApiResponse | UserMeResponseDto>(
      '/api/auth/me',
      accessToken,
    );

    if ('success' in response || 'message' in response) {
      return toUser(response);
    }

    return mapUserDto(response);
  }

  return toUser(await authGetCurrentUser());
}
