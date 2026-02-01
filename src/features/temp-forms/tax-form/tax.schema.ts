import { z } from 'zod';

export const taxSchema = z.object({
  rate: z.coerce
    .number()
    .min(0, 'Tax rate must be at least 0%')
    .max(100, 'Tax rate cannot exceed 100%'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .max(255, 'Description cannot exceed 255 characters'),
});

export type TaxFormValues = z.infer<typeof taxSchema>;

export const defaultTaxValues: TaxFormValues = {
  rate: 0,
  description: '',
};
