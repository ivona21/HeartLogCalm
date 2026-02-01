import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
});

export type ItemFormValues = z.infer<typeof itemSchema>;

export const defaultItemValues: ItemFormValues = {
  name: '',
};
