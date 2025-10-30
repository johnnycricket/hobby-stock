import { Item, ItemInput } from "@/types/Item";
import { useMemo, useState, useEffect } from "react";
import {
  FieldErrors,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ItemService } from "@/services/item-service";
import { Category } from "@/types/Category";

type FormData = {
  name: string;
  description?: string;
  categoryId: string;
  quantity: string;
  minQuantity?: string;
  unitPrice?: string;
  location: string;
  notes?: string;
};

type InventoryFormProps = {
  item: Item | ItemInput;
  categories: Category[];
};

export const InventoryForm = ({ item, categories }: InventoryFormProps) => {
  const navigate = useNavigate();
  const isEditing = useMemo(() => item && Item.is(item), [item]);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<FormData>({
    defaultValues: {
      name: item?.name || "",
      description: item?.description || "",
      categoryId: item?.categoryId?.toString() || "",
      quantity: item?.quantity?.toString() || "",
      minQuantity: item?.minQuantity?.toString() || "",
      unitPrice: item?.unitPrice?.toString() || "",
      location: item?.location || "",
      notes: item?.notes || "",
    },
    mode: "onTouched",
  });

  // Reset form when item data changes (for edit mode)
  useEffect(() => {
    if (item && Item.is(item)) {
      methods.reset({
        name: item.name || "",
        description: item.description || "",
        categoryId: item.categoryId?.toString() || "",
        quantity: item.quantity?.toString() || "",
        minQuantity: item.minQuantity?.toString() || "",
        unitPrice: item.unitPrice?.toString() || "",
        location: item.location || "",
        notes: item.notes || "",
      });
    }
  }, [item, methods]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log("Raw form data:", data);

    const itemData: ItemInput = {
      name: data.name,
      description: data.description,
      categoryId: parseInt(data.categoryId),
      quantity: parseInt(data.quantity),
      minQuantity: data.minQuantity ? parseInt(data.minQuantity) : undefined,
      unitPrice: data.unitPrice ? parseFloat(data.unitPrice) : undefined,
      location: data.location,
      notes: data.notes,
    };

    console.log("Converted data:", itemData);

    if (isEditing && item && "id" in item) {
      const response = await ItemService.updateItem(
        (item as Item).id,
        itemData
      );
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      if (response.data.updateItem.success) {
        navigate("/inventory", {
          state: {
            message:
              response.data.updateItem.message || "Item updated successfully",
          },
        });
      } else {
        setError(response.data.updateItem.message || "Failed to update item");
      }
    } else {
      const response = await ItemService.createItem(itemData);
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
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
    }
  };

  const onFormError: SubmitErrorHandler<FormData> = (
    e: FieldErrors<FormData>
  ) => {
    console.log("Form errors:", e);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onFormError)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Item Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Super Cool Project"
            {...methods.register("name", { required: "Name is required" })}
          />
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Item Description
          </label>
          <input
            type="text"
            id="description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="This is a super cool project"
            {...methods.register("description", { required: true })}
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
            {...methods.register("categoryId", {
              required: "Category is required",
            })}
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
            Item Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="1"
            {...methods.register("quantity", {
              required: "Quantity is required",
            })}
          />
          <label
            htmlFor="minQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Minimum Quantity Wanted
          </label>
          <input
            type="number"
            id="minQuantity"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="1"
            {...methods.register("minQuantity", { required: true })}
          />
          <label
            htmlFor="unitPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Unit Price
          </label>
          <input
            type="number"
            id="unitPrice"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="100"
            {...methods.register("unitPrice", { required: true })}
          />
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Item Location
          </label>
          <input
            type="text"
            id="location"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="100"
            {...methods.register("location", {
              required: "Location is required",
            })}
          />
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Item Notes
          </label>
          <textarea
            id="notes"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="This is a super cool project"
            {...methods.register("notes", { required: true })}
          />
          {Object.keys(methods.formState.errors).length > 0 && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">Please fix the following errors:</p>
              <ul className="list-disc list-inside mt-2">
                {Object.entries(methods.formState.errors).map(
                  ([field, error]) => (
                    <li key={field}>
                      {field}: {error?.message || "This field is required"}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <input
            type="submit"
            value={isEditing ? "Update Item" : "Add Item"}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </FormProvider>
  );
};
