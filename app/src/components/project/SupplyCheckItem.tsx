import { ProjectSupplyCheck } from "@/types/ProjectSupplyCheck";
import { SupplyStatus } from "@/types/SupplyStatus";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export function SupplyCheckItem({ check }: SupplyCheckItem.Props) {
  const getStatusConfig = (status: SupplyStatus) => {
    switch (status) {
      case SupplyStatus.SUFFICIENT:
        return {
          icon: CheckCircle2,
          bgColor: "bg-green-50",
          textColor: "text-green-800",
          borderColor: "border-green-200",
          badgeColor: "bg-green-100 text-green-800",
        };
      case SupplyStatus.INSUFFICIENT:
        return {
          icon: AlertCircle,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200",
          badgeColor: "bg-yellow-100 text-yellow-800",
        };
      case SupplyStatus.MISSING:
        return {
          icon: XCircle,
          bgColor: "bg-red-50",
          textColor: "text-red-800",
          borderColor: "border-red-200",
          badgeColor: "bg-red-100 text-red-800",
        };
    }
  };

  const config = getStatusConfig(check.supplyStatus);
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start justify-between p-3 rounded border ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`w-5 h-5 ${config.textColor}`} />
          <p className={`text-sm font-medium ${config.textColor}`}>
            {check.itemName}
          </p>
          <span
            className={`px-2 py-0.5 rounded text-xs font-medium ${config.badgeColor}`}
          >
            {check.supplyStatus}
          </span>
        </div>
        <div className="ml-7 space-y-1">
          <div className="flex items-center gap-4 text-xs">
            <span className="text-gray-600">
              Required:{" "}
              <span className="font-medium">{check.requiredQuantity}</span>
            </span>
            <span className="text-gray-600">
              Available:{" "}
              <span className="font-medium">{check.availableQuantity}</span>
            </span>
          </div>
          {check.quantityGap > 0 && (
            <p className={`text-xs font-medium ${config.textColor}`}>
              Need {check.quantityGap} more
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export namespace SupplyCheckItem {
  export type Props = {
    check: ProjectSupplyCheck;
  };
}
