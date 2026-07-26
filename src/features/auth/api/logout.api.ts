import { authLogout } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';

export async function logoutApi(): Promise<void> {
  assertApiSuccess(await authLogout());
}
