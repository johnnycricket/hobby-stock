import { ProjectStatus } from "@/types/ProjectStatus";
import {
  ClipboardList,
  PlayCircle,
  PauseCircle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const statusConfig = {
  [ProjectStatus.PLANNING]: {
    label: "Planning",
    color: "bg-slate-100 text-slate-700 border-slate-300",
    icon: ClipboardList,
  },
  [ProjectStatus.ACTIVE]: {
    label: "Active",
    color: "bg-green-100 text-green-700 border-green-300",
    icon: PlayCircle,
  },
  [ProjectStatus.ON_HOLD]: {
    label: "On Hold",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    icon: PauseCircle,
  },
  [ProjectStatus.COMPLETED]: {
    label: "Completed",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    icon: CheckCircle,
  },
};

const sizeConfig = {
  sm: {
    container: "px-2 py-0.5 text-xs",
    icon: "h-3 w-3",
  },
  md: {
    container: "px-2.5 py-1 text-sm",
    icon: "h-4 w-4",
  },
  lg: {
    container: "px-3 py-1.5 text-base",
    icon: "h-5 w-5",
  },
};

export const ProjectStatusBadge = ({
  status,
  size = "md",
  className,
}: ProjectStatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  const sizeStyles = sizeConfig[size];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        config.color,
        sizeStyles.container,
        className
      )}
    >
      <Icon className={sizeStyles.icon} />
      <span>{config.label}</span>
    </span>
  );
};
