import { RegisterInput } from '@/features/auth/forms/RegisterForm/schema.ts';
import { authRegister } from '@/shared/api/heartlog.generated.ts';
import { assertApiSuccess } from '@/shared/api/heartlog-normalizers.ts';
import type { LegalAcceptances } from '@/shared/api/heartlog.generated.ts';

export async function registerApi(
  data: RegisterInput,
  legalAcceptances: LegalAcceptances,
): Promise<void> {
  assertApiSuccess(
    await authRegister({
      email: data.email,
      password: data.password,
      legalAcceptances,
    }),
  );
}
