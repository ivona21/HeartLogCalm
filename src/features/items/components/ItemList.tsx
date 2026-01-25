import { useItems } from '@/features/items/hooks/useItems.ts';

export default function ItemList() {
  const { data: items, isLoading, isError } = useItems();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      {items?.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
