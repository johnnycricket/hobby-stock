import { Project, ProjectInput } from "@/types/Project";
import { ProjectItem } from "@/types/ProjectItem";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProjectService } from "@/services/project-service";
import { ProjectItemService } from "@/services/project-item-service";
import { ProjectTemplateService } from "@/services/project-template-service";
import { ProjectTemplate } from "@/types/ProjectTemplate";
import { Trash2 } from "lucide-react";
import { getErrorMessage } from "@/lib/utils";

type FormData = {
  name: string;
  description?: string;
  status: ProjectStatus;
};

type ProjectFormProps = {
  project?: Project;
  items: Item[];
  projectItems: ProjectItem[];
  onProjectItemsChange?: () => void;
};

export const ProjectForm = ({
  project,
  items,
  projectItems: initialProjectItems,
  onProjectItemsChange,
}: ProjectFormProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = useMemo(() => project !== undefined, [project]);
  const [error, setError] = useState<string | null>(null);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>(
    initialProjectItems || []
  );
  const [selectedItemId, setSelectedItemId] = useState<string>("");
  const [quantityUsed, setQuantityUsed] = useState<string>("1");
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  const methods = useForm<FormData>({
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      status: project?.status || ProjectStatus.PLANNING,
    },
    mode: "onTouched",
  });

  // Load templates for selection
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await ProjectTemplateService.findAll();
        if (!response.errors && response.data?.projectTemplates) {
          setTemplates(response.data.projectTemplates);
        }
      } catch (error) {
        console.error("Failed to load templates:", error);
      }
    };
    if (!isEditing) {
      loadTemplates();
    }
  }, [isEditing]);

  // Handle template selection from URL parameter
  useEffect(() => {
    const templateIdParam = searchParams.get("templateId");
    if (templateIdParam && !isEditing && templates.length > 0) {
      setSelectedTemplateId(templateIdParam);
      handleTemplateSelect(templateIdParam);
    }
  }, [searchParams, isEditing, templates]);

  // Reset form when project data changes (for edit mode)
  useEffect(() => {
    if (project) {
      methods.reset({
        name: project.name || "",
        description: project.description || "",
        status: project.status || ProjectStatus.PLANNING,
      });
    }
  }, [project, methods]);

  // Update projectItems when prop changes (e.g., after refetch)
  useEffect(() => {
    setProjectItems(initialProjectItems || []);
  }, [initialProjectItems]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    const projectData: ProjectInput = {
      name: data.name,
      description: data.description,
      status: data.status,
    };

    try {
      if (isEditing && project) {
        // Update project
        const projectId =
          typeof project.id === "string" ? project.id : project.id.toString();
        const response = await ProjectService.updateProject(
          projectId,
          projectData
        );
        if (response.errors) {
          setError(response.errors[0].message);
          return;
        }
        if (response.data.updateProject.success) {
          const projectId =
            typeof project.id === "string" ? project.id : project.id.toString();
          navigate(`/projects/${projectId}`, {
            state: {
              message:
                response.data.updateProject.message ||
                "Project updated successfully",
            },
          });
        } else {
          setError(
            response.data.updateProject.message || "Failed to update project"
          );
        }
      } else {
        // Create project
        let newProject;
        if (selectedTemplateId) {
          // Create from template
          const response = await ProjectTemplateService.createProjectFromTemplate(
            parseInt(selectedTemplateId),
            projectData
          );
          if (response.errors) {
            setError(response.errors[0].message);
            return;
          }
          if (response.data.createProjectFromTemplate.success) {
            newProject = response.data.createProjectFromTemplate.project;
            navigate(`/projects/${newProject.id}`, {
              state: {
                message:
                  response.data.createProjectFromTemplate.message ||
                  "Project created from template successfully",
              },
            });
          } else {
            setError(
              response.data.createProjectFromTemplate.message ||
                "Failed to create project from template"
            );
          }
        } else {
          // Create regular project
          const response = await ProjectService.createProject(projectData);
          if (response.errors) {
            setError(response.errors[0].message);
            return;
          }
          if (response.data.createProject.success) {
            newProject = response.data.createProject.project;
            // Add project items if any were pre-populated from template selection
            if (projectItems.length > 0 && newProject) {
              for (const projectItem of projectItems) {
                try {
                  await ProjectItemService.addItemToProject(
                    newProject.id.toString(),
                    projectItem.itemId.toString(),
                    projectItem.quantityUsed || 0
                  );
                } catch (error) {
                  console.error("Failed to add item to project:", error);
                }
              }
            }
            navigate(`/projects/${newProject.id}`, {
              state: {
                message:
                  response.data.createProject.message ||
                  "Project created successfully",
              },
            });
          } else {
            setError(
              response.data.createProject.message || "Failed to create project"
            );
          }
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

  const handleAddItem = async () => {
    if (!selectedItemId || !project) {
      setError(
        "Please select an item and ensure you're editing an existing project"
      );
      return;
    }

    const quantity = parseFloat(quantityUsed);
    if (isNaN(quantity) || quantity <= 0) {
      setError("Quantity must be a positive number");
      return;
    }

    try {
      // Ensure IDs are strings (UUIDs from backend)
      // GraphQL schema returns IDs as strings (UUIDs), even if TypeScript types say number
      const projectId = String(project.id);
      const itemId = selectedItemId; // Already a string from select

      // Validate that we have valid IDs
      if (!projectId || !itemId) {
        setError("Project ID and Item ID are required");
        return;
      }

      const response = await ProjectItemService.addItemToProject(
        projectId,
        itemId,
        quantity
      );
      if (response.errors) {
        console.error("GraphQL errors:", response.errors);
        setError(response.errors[0].message);
        return;
      }
      if (!response.data || !response.data.addItemToProject) {
        console.error("Unexpected response structure:", response);
        setError("Unexpected response from server");
        return;
      }
      if (response.data.addItemToProject.success) {
        // Refetch project items from server to get the actual saved data
        if (onProjectItemsChange) {
          onProjectItemsChange();
        } else {
          // Fallback: add to local state if no callback provided
          const newProjectItem: ProjectItem = {
            id: Date.now(), // Temporary ID
            projectId:
              typeof project.id === "string"
                ? parseInt(project.id)
                : project.id,
            itemId: parseInt(selectedItemId),
            quantityUsed: quantity,
            createdAt: new Date().toISOString(),
          };
          setProjectItems([...projectItems, newProjectItem]);
        }
        setSelectedItemId("");
        setQuantityUsed("1");
        setError(null);
      } else {
        setError(
          response.data.addItemToProject.message || "Failed to add item"
        );
      }
    } catch (error: unknown) {
      console.error("Error adding item to project:", error);
      setError(getErrorMessage(error));
    }
  };

  const handleRemoveItem = async (projectItemId: number, itemId: number) => {
    if (!project) return;

    try {
      // Ensure IDs are strings (UUIDs from backend)
      const projectId =
        typeof project.id === "string" ? project.id : String(project.id);
      const itemIdStr = String(itemId);

      const response = await ProjectItemService.removeItemFromProjectByIds(
        projectId,
        itemIdStr
      );
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      if (response.data.removeItemFromProjectByIds.success) {
        // Refetch project items from server to get the actual saved data
        if (onProjectItemsChange) {
          onProjectItemsChange();
        } else {
          // Fallback: update local state if no callback provided
          setProjectItems(
            projectItems.filter((item) => item.id !== projectItemId)
          );
        }
        setError(null);
      } else {
        setError(
          response.data.removeItemFromProjectByIds.message ||
            "Failed to remove item"
        );
      }
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  const handleTemplateSelect = async (templateId: string) => {
    if (!templateId || isEditing) return;

    setLoadingTemplate(true);
    try {
      const response = await ProjectTemplateService.findById(
        parseInt(templateId)
      );
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }

      const selectedTemplate = response.data.projectTemplate;
      if (selectedTemplate) {
        // Pre-populate form with template data
        methods.reset({
          name: selectedTemplate.name,
          description: selectedTemplate.description || "",
          status: selectedTemplate.defaultStatus,
        });

        // Pre-populate project items from template
        if (selectedTemplate.items && selectedTemplate.items.length > 0) {
          const templateProjectItems: ProjectItem[] =
            selectedTemplate.items.map((ti) => ({
              id: 0, // Temporary ID, will be set when project is created
              projectId: 0, // Will be set when project is created
              itemId: parseInt(ti.itemId),
              quantityUsed: Number(ti.quantityUsed),
              createdAt: new Date().toISOString(),
            }));
          setProjectItems(templateProjectItems);
        }
      }
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoadingTemplate(false);
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplateId(templateId);
    if (templateId) {
      handleTemplateSelect(templateId);
    } else {
      // Clear template data
      methods.reset({
        name: "",
        description: "",
        status: ProjectStatus.PLANNING,
      });
      setProjectItems([]);
    }
  };

  // Get items that are already added to the project
  const addedItemIds = new Set(projectItems.map((pi) => pi.itemId.toString()));
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

        {!isEditing && (
          <div>
            <label
              htmlFor="template"
              className="block text-sm font-medium text-gray-700"
            >
              Create from Template (Optional)
            </label>
            <select
              id="template"
              value={selectedTemplateId}
              onChange={handleTemplateChange}
              disabled={loadingTemplate}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">None - Create blank project</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id.toString()}>
                  {template.name}
                  {template.items && template.items.length > 0
                    ? ` (${template.items.length} items)`
                    : ""}
                </option>
              ))}
            </select>
            {loadingTemplate && (
              <p className="mt-1 text-sm text-gray-500">Loading template...</p>
            )}
            {selectedTemplateId && !loadingTemplate && (
              <p className="mt-1 text-sm text-green-600">
                Template selected. Form fields and items have been
                pre-populated. You can modify them before saving.
              </p>
            )}
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
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            {...methods.register("status", { required: "Status is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value={ProjectStatus.PLANNING}>Planning</option>
            <option value={ProjectStatus.ACTIVE}>Active</option>
            <option value={ProjectStatus.ON_HOLD}>On Hold</option>
            <option value={ProjectStatus.COMPLETED}>Completed</option>
          </select>
          {methods.formState.errors.status && (
            <p className="mt-1 text-sm text-red-600">
              {methods.formState.errors.status.message}
            </p>
          )}
        </div>

        {isEditing && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Project Items
            </h3>

            {projectItems.length > 0 && (
              <div className="space-y-2 mb-4">
                {projectItems.map((projectItem) => {
                  const item = items.find((i) => i.id === projectItem.itemId);
                  return (
                    <div
                      key={projectItem.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <div>
                        <span className="font-medium">
                          {item?.name || `Item ${projectItem.itemId}`}
                        </span>
                        <span className="text-gray-500 ml-2">
                          (Qty: {projectItem.quantityUsed})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(projectItem.id, projectItem.itemId)
                        }
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

            <div className="flex gap-2">
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="">Select an item...</option>
                {availableItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={quantityUsed}
                onChange={(e) => setQuantityUsed(e.target.value)}
                placeholder="Qty"
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={handleAddItem}
                disabled={!selectedItemId}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            {availableItems.length === 0 && projectItems.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                All available items have been added to this project.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
