import { z } from 'zod';

export const currentFeelingSchema = z.object({
  feeling: z.string().min(3).max(1000),
});

export type CurrentFeelingValues = z.infer<typeof currentFeelingSchema>;
