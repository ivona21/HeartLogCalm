import { useCreateItem } from '@/features/items/hooks/useCreateItem.ts';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  defaultItemValues,
  ItemFormValues,
  itemSchema,
} from '@/features/items/forms/item.schema.ts';
import { Button } from '@/components/ui/Button.tsx';
import { Form, FormField } from '@/components/form/Form.tsx';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();
  const methods = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: defaultItemValues,
  });

  const onSubmit: SubmitHandler<ItemFormValues> = (data) => {
    createItem(data.name);
    methods.reset();
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField name="name" label="Item name" type="text" />
        <Button type="submit" disabled={isPending}>
          Save Item
        </Button>
      </form>
    </Form>
  );
}
