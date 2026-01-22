import { useCreateItem } from '@/features/items/hooks/useCreateItem.ts';
import { useState } from 'react';

export default function ItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();
  const [itemName, setItemName] = useState('');

  const submitForm = (e: any) => {
    e.preventDefault();
    createItem(itemName);
  };

  return (
    <form onSubmit={submitForm}>
      <input type="text" onChange={(e) => setItemName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
