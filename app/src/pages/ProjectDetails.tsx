import { ProjectService } from "@/services/project-service";
import { Project } from "@/types/Project";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { ConfirmModal } from "@/components/ConfirmModal";

export function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProject = async (projectId: string) => {
    try {
      setLoading(true);
      const response = await ProjectService.findById(projectId);
      if (response.errors) {
        setError(response.errors[0].message);
        setLoading(false);
        return;
      }
      setProject(response.data.project);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
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
    } catch (error: any) {
      setError(error.message);
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
            <p className="mt-1 text-lg text-gray-900">{project.status}</p>
          </div>

          {project.startDate && (
            <div>
              <h2 className="text-sm font-medium text-gray-500">Start Date</h2>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(project.startDate).toLocaleDateString()}
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
            <p className="mt-1 text-lg text-gray-900">
              {project.items?.length ?? 0} items
            </p>
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

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Project"
        message={`Are you sure you want to delete "${project?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
