import { Item } from "@/types/Item";
import { useEffect, useState } from "react";
import { ItemService } from "@/services/item-service";

export function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await ItemService.findAllPaginated(page, size);
        if (response.errors) {
          setError(response.errors[0].message);
          setLoading(false);
          return;
        }
        setItems(response.items);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchItems();
  }, [page, size]);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
        <p className="mt-2 text-gray-600">
          View and manage your inventory of hobby items.
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory
          </h2>
        </div>
      )}
    </div>
  );
}
