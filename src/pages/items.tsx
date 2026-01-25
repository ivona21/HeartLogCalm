import ItemList from '@/features/items/components/ItemList.tsx';
import ItemForm from '@/features/items/forms/ItemForm.tsx';

export default function ItemsPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ItemList />
      <ItemForm />
    </div>
  );
}
