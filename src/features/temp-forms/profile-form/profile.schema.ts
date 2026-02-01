import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  email: z.string().min(3).max(100).email(),
  age: z.coerce.number().min(7).max(130),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const defaultProfileFormValues: ProfileFormValues = {
  name: '',
  lastName: '',
  email: '',
  age: 0,
};
