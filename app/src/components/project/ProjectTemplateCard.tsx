import { ProjectTemplate } from "@/types/ProjectTemplate";
import { Pencil, Trash2, FileText } from "lucide-react";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

export function ProjectTemplateCard({
  template,
  onEdit,
  onDelete,
  onUse,
}: ProjectTemplateCard.Props) {
  const itemCount = template.items?.length ?? 0;

  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">
            {template.name}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onUse(template.id)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            aria-label="Use Template"
          >
            Use Template
          </button>
          <button
            onClick={() => onEdit(template.id)}
            aria-label="Edit"
          >
            <Pencil />
          </button>
          <button
            onClick={() => onDelete(template.id)}
            aria-label="Delete"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {template.description && (
          <p className="text-gray-600 text-sm">{template.description}</p>
        )}
        <ProjectStatusBadge status={template.defaultStatus} size="sm" />
        <div className="text-gray-600">
          <p className="text-sm font-medium">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          {template.items && template.items.length > 0 && (
            <div className="mt-1 space-y-1">
              {template.items.slice(0, 3).map((templateItem) => {
                const itemName = templateItem.item?.name || `Item #${templateItem.itemId}`;
                return (
                  <p key={templateItem.id} className="text-xs text-gray-500">
                    • {itemName} (Qty: {templateItem.quantityUsed})
                  </p>
                );
              })}
              {template.items.length > 3 && (
                <p className="text-xs text-gray-500">
                  + {template.items.length - 3} more
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export namespace ProjectTemplateCard {
  export type Props = {
    template: ProjectTemplate;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onUse: (id: number) => void;
  };
}



