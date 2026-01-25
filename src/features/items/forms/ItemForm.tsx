import { useCreateItem } from '@/features/items/hooks/useCreateItem.ts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ItemFormValues, itemSchema } from '@/features/items/forms/item.schema.ts';
import { Input } from '@/components/ui/Input.tsx';
import { Button } from '@/components/ui/Button.tsx';

export default function ItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
  });

  const onSubmit: SubmitHandler<ItemFormValues> = (data) => {
    createItem(data.name);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" {...register('name')} placeholder="Item name" />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      <Button type="submit" disabled={isPending}>
        Save Item
      </Button>
    </form>
  );
}
