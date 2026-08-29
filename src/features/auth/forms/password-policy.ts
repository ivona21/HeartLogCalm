import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(
    8,
    'Please use some more secure password. Try using 8 or more characters with a mix of letters, numbers and symbols',
  )
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');
