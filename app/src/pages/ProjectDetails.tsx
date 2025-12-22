import { ProjectService } from "@/services/project-service";
import { ItemService } from "@/services/item-service";
import { Project } from "@/types/Project";
import { Item } from "@/types/Item";
import { ProjectStatus } from "@/types/ProjectStatus";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2, CheckCircle, Calendar } from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { SupplyCheck } from "@/components/project/SupplyCheck";
import { ProjectStatusBadge } from "@/components/project/ProjectStatusBadge";
import { CompleteProjectModal } from "@/components/project/CompleteProjectModal";
import { getErrorMessage } from "@/lib/utils";

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [itemsMap, setItemsMap] = useState<Map<number, Item>>(new Map());

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      const response = await ProjectService.findById(projectId);
      if (response.errors) {
        setError(response.errors[0].message);
        setLoading(false);
        return;
      }
      const projectData = response.data.project;
      setProject(projectData);

      // Fetch item details for all project items
      if (projectData.items && projectData.items.length > 0) {
        const itemIds = projectData.items.map((pi) => pi.itemId);
        const uniqueItemIds = [...new Set(itemIds)];

        // Fetch all items and create a map
        const itemsResponse = await ItemService.findAll();
        if (!itemsResponse.errors && itemsResponse.data?.items) {
          const items = itemsResponse.data.items;
          const map = new Map<number, Item>();
          items.forEach((item: Item) => {
            if (uniqueItemIds.includes(item.id)) {
              map.set(item.id, item);
            }
          });
          setItemsMap(map);
        }
      }

      setLoading(false);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!id) return;

    try {
      const response = await ProjectService.deleteProject(id);
      if (response.errors) {
        setError(response.errors[0].message);
        setShowDeleteModal(false);
        return;
      }
      navigate("/projects");
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      setShowDeleteModal(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    if (id) {
      navigate(`/projects/${id}/edit`);
    }
  };

  const handleCompleteClick = () => {
    setShowCompleteModal(true);
  };

  const handleCompleteConfirm = async (endDate?: string) => {
    if (!id) return;

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await ProjectService.completeProject(id, endDate);
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }
      // Refresh project data
      await fetchProject(id);
    } catch (error: unknown) {
      throw error; // Re-throw to let modal handle it
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center py-8">
          <p className="text-gray-500">Project not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            {project.description && (
              <p className="mt-2 text-gray-600">{project.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            {project.status !== ProjectStatus.COMPLETED && (
              <button
                onClick={handleCompleteClick}
                aria-label="Mark as Complete"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Complete
              </button>
            )}
            <button
              onClick={handleEdit}
              aria-label="Edit"
              className="p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={handleDeleteClick}
              aria-label="Delete"
              className="p-2 rounded hover:bg-gray-100 transition-colors text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Status</h2>
            <div className="mt-1">
              <ProjectStatusBadge status={project.status} size="md" />
            </div>
          </div>

          {project.startDate && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Start Date</h2>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(project.startDate).toLocaleDateString()}
              </p>
            </div>
          )}

          {project.completedAt && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Completed On
              </h2>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(project.completedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          {project.endDate && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">End Date</h2>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-sm font-medium text-gray-500">Items</h2>
            {project.items && project.items.length > 0 ? (
              <div className="mt-2 space-y-2">
                {project.items.map((projectItem) => {
                  const item = itemsMap.get(projectItem.itemId);
                  return (
                    <div
                      key={projectItem.id}
                      className="flex justify-between items-center p-2 bg-gray-50 rounded"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {item?.name || `Item #${projectItem.itemId}`}
                        </p>
                        {item?.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-sm text-gray-700">
                          Qty: {projectItem.quantityUsed}
                        </p>
                        {item?.amountType && (
                          <p className="text-xs text-gray-500">
                            {item.amountType}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="mt-1 text-lg text-gray-900">No items added</p>
            )}
          </div>

          {project.createdAt && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Created</h2>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(project.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          {project.updatedAt && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">
                Last Updated
              </h2>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(project.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Supply Check Section */}
      <div className="mt-6">
        <SupplyCheck
          supplyCheck={project.supplyCheck}
          loading={loading}
          error={error}
        />
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Project"
        message={`Are you sure you want to delete "${project?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <CompleteProjectModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onConfirm={handleCompleteConfirm}
        projectName={project.name}
      />
    </div>
  );
}
