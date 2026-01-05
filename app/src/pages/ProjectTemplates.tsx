import { useState, useEffect, useCallback } from "react";
import { ProjectTemplateService } from "@/services/project-template-service";
import { ProjectTemplateCard } from "@/components/project/ProjectTemplateCard";
import { ProjectTemplate } from "@/types/ProjectTemplate";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/lib/utils";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Plus } from "lucide-react";

export function ProjectTemplates() {
  const [templates, setTemplates] = useState<ProjectTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ProjectTemplateService.findAll();
      if (response.errors) {
        setError(response.errors[0].message);
        setLoading(false);
        return;
      }

      const templatesData = response.data?.projectTemplates ?? [];
      setTemplates(Array.isArray(templatesData) ? templatesData : []);
      setError(null);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();

    // Check for success message from navigation state
    const state = window.history.state;
    if (state?.message) {
      // You could show a toast notification here
      console.log(state.message);
    }
  }, [fetchTemplates]);

  const handleEdit = (id: number) => {
    navigate(`/templates/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    setTemplateToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (templateToDelete === null) return;

    try {
      const response = await ProjectTemplateService.deleteTemplate(
        templateToDelete
      );
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      if (response.data.deleteProjectTemplate.success) {
        setTemplates(
          templates.filter((t) => t.id !== templateToDelete)
        );
        setDeleteModalOpen(false);
        setTemplateToDelete(null);
      } else {
        setError(
          response.data.deleteProjectTemplate.message ||
            "Failed to delete template"
        );
      }
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  const handleUse = (id: number) => {
    navigate(`/projects/new?templateId=${id}`);
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Project Templates</h1>
        <button
          onClick={() => navigate("/templates/new")}
          className="flex items-center gap-2 btn btn-primary"
        >
          <Plus className="w-5 h-5" />
          New Template
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {templates.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No templates found.</p>
              <button
                onClick={() => navigate("/templates/new")}
                className="btn btn-primary"
              >
                Create Your First Template
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <ProjectTemplateCard
                  key={template.id}
                  template={template}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onUse={handleUse}
                />
              ))}
            </div>
          )}
        </>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTemplateToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Template"
        message="Are you sure you want to delete this template? This action cannot be undone."
      />
    </div>
  );
}



