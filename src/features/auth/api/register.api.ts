import { RegisterInput } from '@/features/auth/forms/RegisterForm/schema.ts';
import { authRegister } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';

export async function registerApi(data: RegisterInput): Promise<void> {
  assertApiSuccess(await authRegister(data));
}
