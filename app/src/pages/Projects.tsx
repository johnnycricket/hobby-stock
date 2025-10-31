import { useState } from "react";

import { ProjectService } from "@/services/project-service";
import { useEffect } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Project } from "@/types/Project";
import { useNavigate } from "react-router-dom";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await ProjectService.findAllPaginated(page, size);
      if (response.errors) {
        setError(response.errors[0].message);
        setLoading(false);
        return;
      }
      setProjects(response.data.projectsPaginated.content);
      setPage(response.data.projectsPaginated.pageInfo.currentPage);
      setTotal(response.data.projectsPaginated.pageInfo.totalElements);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, size]);

  const deleteProject = async (id: string) => {
    const response = await ProjectService.deleteProject(id);
    if (response.errors) {
      setError(response.errors[0].message);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <p className="mt-2 text-gray-600">View and manage your projects.</p>
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
              onEdit={(id) => {
                navigate(`/projects/${id}`);
              }}
              onDelete={(id) => deleteProject(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
