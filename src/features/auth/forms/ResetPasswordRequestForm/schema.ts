import { z } from 'zod';

export const resetPasswordRequestSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
});

export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>;
