import { useState, useEffect, useCallback } from "react";

import { ProjectService } from "@/services/project-service";
import { ItemService } from "@/services/item-service";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Project } from "@/types/Project";
import { Item } from "@/types/Item";
import { ProjectStatus } from "@/types/ProjectStatus";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/lib/utils";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [total, setTotal] = useState(0);
  const [itemsMap, setItemsMap] = useState<Map<number, Item>>(new Map());
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "ALL">(
    "ALL"
  );
  const [showCompleted, setShowCompleted] = useState(true);

  const navigate = useNavigate();

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      let response;
      if (statusFilter === "ALL") {
        if (showCompleted) {
          response = await ProjectService.findAllPaginated(page, size);
        } else {
          // Filter out completed projects
          response = await ProjectService.findAllPaginated(page, size);
          // Filter completed projects on frontend
          if (!response.errors && response.data?.projectsPaginated) {
            response.data.projectsPaginated.content =
              response.data.projectsPaginated.content.filter(
                (p: Project) => p.status !== ProjectStatus.COMPLETED
              );
          }
        }
      } else {
        response = await ProjectService.findByStatusPaginated(
          statusFilter,
          page,
          size
        );
      }
      if (response.errors) {
        setError(response.errors[0].message);
        setLoading(false);
        return;
      }
      const projectsData = response.data.projectsPaginated.content;
      setProjects(projectsData);
      setPage(response.data.projectsPaginated.pageInfo.currentPage);
      setTotal(response.data.projectsPaginated.pageInfo.totalElements);

      // Fetch all items to display item names in project cards
      try {
        const itemsResponse = await ItemService.findAll();
        if (!itemsResponse.errors && itemsResponse.data?.items) {
          const items = itemsResponse.data.items;
          const map = new Map<number, Item>();
          items.forEach((item: Item) => {
            map.set(item.id, item);
          });
          setItemsMap(map);
        }
      } catch (itemsError) {
        // If items fetch fails, continue without item names
        console.warn("Failed to fetch items for project cards:", itemsError);
      }

      setLoading(false);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
      setLoading(false);
    }
  }, [page, size, statusFilter, showCompleted]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const deleteProject = async (id: string) => {
    const response = await ProjectService.deleteProject(id);
    if (response.errors) {
      setError(response.errors[0].message);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-2 text-gray-600">View and manage your projects.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="status-filter"
                className="text-sm font-medium text-gray-700"
              >
                Filter by Status:
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as ProjectStatus | "ALL");
                  setPage(0); // Reset to first page when filter changes
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              >
                <option value="ALL">All Statuses</option>
                <option value={ProjectStatus.PLANNING}>Planning</option>
                <option value={ProjectStatus.ACTIVE}>Active</option>
                <option value={ProjectStatus.ON_HOLD}>On Hold</option>
                <option value={ProjectStatus.COMPLETED}>Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-completed"
                checked={showCompleted}
                onChange={(e) => {
                  setShowCompleted(e.target.checked);
                  setPage(0);
                }}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="show-completed"
                className="text-sm font-medium text-gray-700"
              >
                Show Completed Projects
              </label>
            </div>
          </div>
        </div>
      </div>
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
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              itemsMap={itemsMap}
              onEdit={(id) => {
                navigate(`/projects/${id}/edit`);
              }}
              onDelete={(id) => deleteProject(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
