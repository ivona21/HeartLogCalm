import { authDeleteCurrentUser } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';

export async function deleteAccountApi(currentPassword: string): Promise<void> {
  assertApiSuccess(await authDeleteCurrentUser({ currentPassword }));
}
