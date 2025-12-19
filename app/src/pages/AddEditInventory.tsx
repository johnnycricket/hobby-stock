import { InventoryForm } from "@/components/inventory/InventoryForm";
import { CategoryService } from "@/services/category-service";
import { ItemService } from "@/services/item-service";
import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AddEditInventory() {
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchCategories = async () => {
    setLoading(true);
    const response = await CategoryService.findAll();
    if (response.errors) {
      setError(response.errors[0].message);
      return;
    }
    setCategories(response.data.categories);
    setLoading(false);
  };

  const fetchItem = async (id: string) => {
    const response = await ItemService.findById(id);
    if (response.errors) {
      setError(response.errors[0].message);
      return;
    }
    setItem(response.data.item);
  };

  useEffect(() => {
    fetchCategories();

    if (id) {
      fetchItem(id);
    }
  }, [id]);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? "Edit Inventory Item" : "Add Inventory Item"}
        </h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        {!loading && !error && (
          <InventoryForm
            item={
              item || {
                name: "",
                description: "",
                categoryId: 0,
                quantity: 0,
                location: "",
                notes: "",
              }
            }
            categories={categories}
          />
        )}
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
      </div>
    </div>
  );
}
