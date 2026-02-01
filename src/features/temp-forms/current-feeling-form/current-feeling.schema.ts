import { z } from 'zod';

export const currentFeelingSchema = z.object({
  feeling: z.string().min(3, 'Ooops, too short').max(1000, 'skrati to malo'),
});

export type CurrentFeelingValues = z.infer<typeof currentFeelingSchema>;

export const defaultCurrentFeelingValues = {
  feeling: '',
};
