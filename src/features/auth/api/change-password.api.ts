import { apiClient } from '@/lib/api-client.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';
import type { ApiResponse, ChangePasswordRequestDto } from '@/shared/api/heartlog.generated.ts';
import type { ChangePasswordInput } from '@/features/auth/forms/ChangePasswordForm/schema.ts';

export async function changePasswordApi(data: ChangePasswordInput): Promise<void> {
  const request: ChangePasswordRequestDto = {
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  };

  assertApiSuccess(
    await apiClient.request<ApiResponse>(
      '/api/auth/change-password',
      {
        method: 'POST',
        body: JSON.stringify(request),
      },
      {
        preserveAuthOnUnauthorized: true,
      },
    ),
  );
}
