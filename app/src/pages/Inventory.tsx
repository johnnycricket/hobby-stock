import { Item } from "@/types/Item";
import { useEffect, useState } from "react";
import { ItemService } from "@/services/item-service";
import { InventoryItemCard } from "@/components/inventory/InventoryItemCard";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/lib/utils";

export function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [total, setTotal] = useState(0);

  const fetchItems = async () => {
    try {
      const response = await ItemService.findAllPaginated(page, size);
      if (response.errors) {
        setError(response.errors[0].message);
        setLoading(false);
        return;
      }
      console.log(JSON.stringify(response, null, 2));
      setItems(response.data.itemsPaginated.content);
      setPage(response.data.itemsPaginated.pageInfo.currentPage);
      setTotal(response.data.itemsPaginated.pageInfo.totalElements);
      setLoading(false);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [page, size]);

  const deleteItem = async (id: string) => {
    const response = await ItemService.deleteItem(id);
    if (response.errors) {
      setError(response.errors[0].message);
    }
    fetchItems();
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <div key={item.id}>
                  <InventoryItemCard
                    item={item}
                    onEdit={(id) => {
                      navigate(`/inventory/${id}`);
                    }}
                    onDelete={(id) => deleteItem(id)}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
