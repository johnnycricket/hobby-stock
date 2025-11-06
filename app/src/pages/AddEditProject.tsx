import { ProjectForm } from "@/components/project/ProjectForm";
import { ProjectService } from "@/services/project-service";
import { ItemService } from "@/services/item-service";
import { Project } from "@/types/Project";
import { Item } from "@/types/Item";
import { ProjectItem } from "@/types/ProjectItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AddEditProject() {
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [projectItems, setProjectItems] = useState<ProjectItem[]>([]);

  const { id } = useParams<{ id: string }>();

  const fetchItems = async () => {
    try {
      const response = await ItemService.findAll();
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      setItems(response.data.items);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchProject = async (projectId: string) => {
    try {
      const response = await ProjectService.findById(projectId);
      if (response.errors) {
        setError(response.errors[0].message);
        return;
      }
      const fetchedProject = response.data.project;
      setProject(fetchedProject);
      setProjectItems(fetchedProject.items || []);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchItems();

      if (id) {
        await fetchProject(id);
      }
      setLoading(false);
    };

    loadData();
  }, [id]);

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? "Edit Project" : "Add Project"}
        </h1>
      </div>
      <div className="card">
        {!loading && !error && (
          <ProjectForm
            project={project || undefined}
            items={items}
            projectItems={projectItems}
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
