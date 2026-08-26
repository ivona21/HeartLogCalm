import { z } from 'zod';
import { passwordSchema } from '@/features/auth/forms/password-policy.ts';

export const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
