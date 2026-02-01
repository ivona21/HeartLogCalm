import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  defaultTaxValues,
  TaxFormValues,
  taxSchema,
} from '@/features/temp-forms/tax-form/tax.schema.ts';
import { Form, FormField } from '@/components/form/Form.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function TaxForm() {
  const formMethods = useForm<TaxFormValues>({
    resolver: zodResolver(taxSchema),
    defaultValues: defaultTaxValues,
    mode: 'onChange',
  });

  const onSubmit = (values: TaxFormValues) => {
    console.log(values);
    formMethods.reset();
  };

  return (
    <div className="mt-10">
      <hr />
      <Form {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <FormField name="rate" label="Rate" type="number" />
          <FormField name="description" label="Description" type="textarea" />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
