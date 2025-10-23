import { CategoryService } from "@/services/category-service";
import { ItemService } from "@/services/item-service";
import { Category } from "@/types/Category";
import { ItemInput } from "@/types/Item";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function AddEditInventory() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemInput>();

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<ItemInput> = async (data: ItemInput) => {
    console.log("Raw form data:", data);

    // Validate required fields
    if (!data.categoryId || data.categoryId === "") {
      setError("Please select a category");
      return;
    }

    // Convert string form values to proper types
    const categoryId = parseInt(data.categoryId as any);
    const quantity = parseInt(data.quantity as any);

    if (isNaN(categoryId)) {
      setError("Invalid category selected");
      return;
    }

    if (isNaN(quantity)) {
      setError("Invalid quantity");
      return;
    }

    const itemData: ItemInput = {
      ...data,
      categoryId: categoryId,
      quantity: quantity,
      minQuantity: data.minQuantity
        ? parseInt(data.minQuantity as any)
        : undefined,
      unitPrice: data.unitPrice ? parseFloat(data.unitPrice as any) : undefined,
    };

    console.log("Converted data:", itemData);

    const response = await ItemService.createItem(itemData);
    if (response.errors) {
      setError(response.errors[0].message);
      return;
    }
    console.log(response.data.createItem);
    if (response.data.createItem.success) {
      navigate("/inventory", {
        state: {
          message:
            response.data.createItem.message || "Item created successfully",
        },
      });
    } else {
      setError(response.data.createItem.message || "Failed to create item");
    }
  };
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add Inventory Item</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Item Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Super Cool Project"
              {...register("name", { required: true })}
            />
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Item Description
            </label>
            <input
              type="text"
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="This is a super cool project"
              {...register("description", { required: true })}
            />
            <label
              htmlFor="categoryId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Category
            </label>
            <select
              id="categoryId"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("categoryId", { required: true })}
            >
              <option value="">Select a category</option>
              {categories &&
                categories.length > 0 &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Item Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="1"
              {...register("quantity", { required: true })}
            />
            <label
              htmlFor="minQuantity"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Minimum Quantity
            </label>
            <input
              type="number"
              id="minQuantity"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="1"
              {...register("minQuantity", { required: true })}
            />
            <label
              htmlFor="unitPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Unit Price
            </label>
            <input
              type="number"
              id="unitPrice"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="100"
              {...register("unitPrice", { required: true })}
            />
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Item Location
            </label>
            <input
              type="text"
              id="location"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="100"
              {...register("location", { required: true })}
            />
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Item Notes
            </label>
            <textarea
              id="notes"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="This is a super cool project"
              {...register("notes", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <input type="submit" value="Add Item" />
          </div>
        </form>
      </div>
    </div>
  );
}
