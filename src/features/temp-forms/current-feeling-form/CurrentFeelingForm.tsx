import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/form/Form.tsx';
import { useForm } from 'react-hook-form';
import {
  currentFeelingSchema,
  CurrentFeelingValues,
  defaultCurrentFeelingValues,
} from '@/features/temp-forms/current-feeling-form/current-feeling.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button.tsx';

export default function CurrentFeelingForm() {
  const formMethods = useForm<CurrentFeelingValues>({
    resolver: zodResolver(currentFeelingSchema),
    mode: 'onChange',
    defaultValues: defaultCurrentFeelingValues,
  });

  const onSubmit = (values: CurrentFeelingValues) => {
    console.log(values);
    formMethods.reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="grid gap-1">
        <FormField name="feeling" label="Feeling" type="text" />
        <Button type="submit" className="self-start" disabled={!formMethods.formState.isValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
