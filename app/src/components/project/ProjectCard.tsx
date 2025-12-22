import { Project } from "@/types/Project";
import { Item } from "@/types/Item";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

export function ProjectCard({
  project,
  itemsMap,
  onEdit,
  onDelete,
}: ProjectCard.Props) {
  const itemCount = project.items?.length ?? 0;

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(project.id.toString())}
            aria-label="Edit"
          >
            <Pencil />
          </button>
          <button
            onClick={() => onDelete(project.id.toString())}
            aria-label="Delete"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-gray-600">{project.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <ProjectStatusBadge status={project.status} size="sm" />
        <div className="text-gray-600">
          <p className="text-sm font-medium">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          {project.items && project.items.length > 0 && (
            <div className="mt-1 space-y-1">
              {project.items.slice(0, 3).map((projectItem) => {
                const item = itemsMap?.get(projectItem.itemId);
                return (
                  <p key={projectItem.id} className="text-xs text-gray-500">
                    • {item?.name || `Item #${projectItem.itemId}`} (Qty:{" "}
                    {projectItem.quantityUsed})
                  </p>
                );
              })}
              {project.items.length > 3 && (
                <p className="text-xs text-gray-500">
                  + {project.items.length - 3} more
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export namespace ProjectCard {
  export type Props = {
    project: Project;
    itemsMap?: Map<number, Item>;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  };
}
