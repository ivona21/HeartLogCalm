import { useCreateItem } from '@/features/items/hooks/useCreateItem.ts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ItemFormValues, itemSchema } from '@/features/items/forms/item.schema.ts';
import { Input } from '@/components/ui/Input.tsx';
import { Button } from '@/components/ui/Button.tsx';
import { Form, FormControl, FormField, FormMessage, FormLabel } from '@/components/form/Form.tsx';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();
  const methods = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<ItemFormValues> = (data) => {
    createItem(data.name);
    methods.reset();
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField name="name">
          <FormLabel>Item name</FormLabel>
          <FormControl>
            <Input type="text" {...methods.register('name')} placeholder="Item name" />
          </FormControl>
          <FormMessage />
        </FormField>
        <Button type="submit" disabled={isPending}>
          Save Item
        </Button>
      </form>
    </Form>
  );
}
