import { Project } from "@/types/Project";
import { Pencil, Trash2 } from "lucide-react";

export function ProjectCard({ project, onEdit, onDelete }: ProjectCard.Props) {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
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
        <p className="text-gray-600">{project.status}</p>
        <p className="text-gray-600">{project.items?.length ?? 0} items</p>
      </div>
    </div>
  );
}

export namespace ProjectCard {
  export type Props = {
    project: Project;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  };
}
