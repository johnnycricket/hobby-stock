import {
  ProjectTemplate,
  ProjectTemplateInput,
  ProjectTemplateItemInput,
} from "@/types/ProjectTemplate";
import { Item } from "@/types/Item";
import { ProjectStatus } from "@/types/ProjectStatus";
import { useMemo, useState, useEffect } from "react";
import {
  FieldErrors,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProjectTemplateService } from "@/services/project-template-service";
import { Trash2, Plus } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";

type FormData = {
  name: string;
  description?: string;
  defaultStatus: ProjectStatus;
};

type ProjectTemplateFormProps = {
  template?: ProjectTemplate;
  items: Item[];
};

export const ProjectTemplateForm = ({
  template,
  items,
}: ProjectTemplateFormProps) => {
  const navigate = useNavigate();
  const isEditing = useMemo(() => template !== undefined, [template]);
  const [error, setError] = useState<string | null>(null);
  const [templateItems, setTemplateItems] = useState<
    Array<{ itemId: string; quantityUsed: number }>
  >(
    template?.items?.map((ti) => ({
      itemId: ti.itemId,
      quantityUsed: Number(ti.quantityUsed),
    })) || []
  );

  const methods = useForm<FormData>({
    defaultValues: {
      name: template?.name || "",
      description: template?.description || "",
      defaultStatus: template?.defaultStatus || ProjectStatus.PLANNING,
    },
    mode: "onTouched",
  });

  // Reset form when template data changes (for edit mode)
  useEffect(() => {
    if (template) {
      methods.reset({
        name: template.name || "",
        description: template.description || "",
        defaultStatus: template.defaultStatus || ProjectStatus.PLANNING,
      });
      setTemplateItems(
        template.items?.map((ti) => ({
          itemId: ti.itemId,
          quantityUsed: Number(ti.quantityUsed),
        })) || []
      );
    }
  }, [template, methods]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const templateData: ProjectTemplateInput = {
      name: data.name,
      description: data.description,
      defaultStatus: data.defaultStatus,
      items: templateItems.map((ti) => ({
        itemId: ti.itemId,
        quantityUsed: ti.quantityUsed,
      })),
    };

    try {
      if (isEditing && template) {
        const response = await ProjectTemplateService.updateTemplate(
          template.id,
          templateData
        );
        if (response.errors) {
          setError(response.errors[0].message);
          return;
        }
        if (response.data.updateProjectTemplate.success) {
          navigate("/templates", {
            state: {
              message:
                response.data.updateProjectTemplate.message ||
                "Template updated successfully",
            },
          });
        } else {
          setError(
            response.data.updateProjectTemplate.message ||
              "Failed to update template"
          );
        }
      } else {
        const response = await ProjectTemplateService.createTemplate(
          templateData
        );
        if (response.errors) {
          setError(response.errors[0].message);
          return;
        }
        if (response.data.createProjectTemplate.success) {
          navigate("/templates", {
            state: {
              message:
                response.data.createProjectTemplate.message ||
                "Template created successfully",
            },
          });
        } else {
          setError(
            response.data.createProjectTemplate.message ||
              "Failed to create template"
          );
        }
      }
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  const onError: SubmitErrorHandler<FormData> = (
    errors: FieldErrors<FormData>
  ) => {
    console.error("Form validation errors:", errors);
  };

  const handleAddItem = () => {
    setTemplateItems([
      ...templateItems,
      { itemId: "", quantityUsed: 1 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setTemplateItems(templateItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: "itemId" | "quantityUsed",
    value: string | number
  ) => {
    const updated = [...templateItems];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setTemplateItems(updated);
  };

  // Get items that are already added to the template
  const addedItemIds = new Set(templateItems.map((ti) => ti.itemId));
  const availableItems = items.filter(
    (item) => !addedItemIds.has(item.id.toString())
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...methods.register("name", { required: "Name is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
          {methods.formState.errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...methods.register("description")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="defaultStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Default Status <span className="text-red-500">*</span>
          </label>
          <select
            id="defaultStatus"
            {...methods.register("defaultStatus", {
              required: "Default status is required",
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value={ProjectStatus.PLANNING}>Planning</option>
            <option value={ProjectStatus.ACTIVE}>Active</option>
            <option value={ProjectStatus.ON_HOLD}>On Hold</option>
            <option value={ProjectStatus.COMPLETED}>Completed</option>
          </select>
          {methods.formState.errors.defaultStatus && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.defaultStatus.message}
            </p>
          )}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Template Items
            </h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>

          {templateItems.length > 0 && (
            <div className="space-y-3 mb-4">
              {templateItems.map((templateItem, index) => {
                const selectedItem = items.find(
                  (i) => i.id.toString() === templateItem.itemId
                );
                return (
                  <div
                    key={index}
                    className="flex gap-2 items-start p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <select
                        value={templateItem.itemId}
                        onChange={(e) =>
                          handleItemChange(index, "itemId", e.target.value)
                        }
                        className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      >
                        <option value="">Select an item...</option>
                        {items.map((item) => (
                          <option key={item.id} value={item.id.toString()}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={templateItem.quantityUsed}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantityUsed",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        placeholder="Quantity"
                        className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {templateItems.length === 0 && (
            <p className="text-sm text-gray-500 mb-4">
              No items added yet. Click "Add Item" to add items to this
              template.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Template" : "Create Template"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};



