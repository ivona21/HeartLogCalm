import { Form, FormControl, FormField, FormLabel, FormMessage } from '@/components/form/Form.tsx';
import { useForm } from 'react-hook-form';
import {
  currentFeelingSchema,
  CurrentFeelingValues,
} from '@/features/temp-forms/current-feeling-form/current-feeling.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function CurrentFeelingForm() {
  const formMethods = useForm<CurrentFeelingValues>({
    resolver: zodResolver(currentFeelingSchema),
    defaultValues: {
      feeling: '',
    },
  });

  const onSubmit = (values: CurrentFeelingValues) => {
    console.log(values);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="grid gap-4 mt-4">
        <FormField
          name="feeling"
          render={(field) => {
            return (
              <>
                <FormLabel>Feeling</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
