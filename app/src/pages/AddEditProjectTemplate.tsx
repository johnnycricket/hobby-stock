import { ProjectTemplateForm } from "@/components/project/ProjectTemplateForm";
import { ProjectTemplateService } from "@/services/project-template-service";
import { ItemService } from "@/services/item-service";
import { ProjectTemplate } from "@/types/ProjectTemplate";
import { Item } from "@/types/Item";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getErrorMessage } from "@/lib/utils";

export function AddEditProjectTemplate() {
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<ProjectTemplate | null>(null);

  const { id } = useParams<{ id: string }>();

  const fetchItems = async () => {
    try {
      const response = await ItemService.findAll();
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      setItems(response.data.items);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  const fetchTemplate = async (templateId: string) => {
    try {
      const response = await ProjectTemplateService.findById(
        parseInt(templateId)
      );
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      const fetchedTemplate = response.data.projectTemplate;
      setTemplate(fetchedTemplate);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchItems();

      if (id) {
        await fetchTemplate(id);
      }
      setLoading(false);
    };

    loadData();
  }, [id]);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? "Edit Template" : "Add Template"}
        </h1>
      </div>
      <div className="card">
        {!loading && !error && (
          <ProjectTemplateForm
            template={template || undefined}
            items={items}
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



