import { ProjectSupplyCheck } from "@/types/ProjectSupplyCheck";
import { SupplyStatus } from "@/types/SupplyStatus";
import { SupplyCheckItem } from "./SupplyCheckItem";
import { Package, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export function SupplyCheck({
  supplyCheck,
  loading,
  error,
}: SupplyCheck.Props) {
  if (loading) {
    return (
      <div className="card">
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading supply check...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-4">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!supplyCheck || supplyCheck.length === 0) {
    return (
      <div className="card">
        <h2 className="text-sm font-medium text-gray-500 mb-4">Supply Check</h2>
        <p className="text-gray-600">No items to check</p>
      </div>
    );
  }

  // Calculate summary statistics
  const total = supplyCheck.length;
  const sufficient = supplyCheck.filter(
    (check) => check.supplyStatus === SupplyStatus.SUFFICIENT
  ).length;
  const insufficient = supplyCheck.filter(
    (check) => check.supplyStatus === SupplyStatus.INSUFFICIENT
  ).length;
  const missing = supplyCheck.filter(
    (check) => check.supplyStatus === SupplyStatus.MISSING
  ).length;

  return (
    <div className="card">
      <h2 className="text-sm font-medium text-gray-500 mb-4">Supply Check</h2>

      {/* Summary Section */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-gray-600" />
          <p className="text-sm font-medium text-gray-900">
            {total} {total === 1 ? "item" : "items"} total
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-xs text-gray-600">
              {sufficient} sufficient
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-gray-600">
              {insufficient} insufficient
            </span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-gray-600">{missing} missing</span>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {supplyCheck.map((check) => (
          <SupplyCheckItem key={check.itemId} check={check} />
        ))}
      </div>
    </div>
  );
}

export namespace SupplyCheck {
  export type Props = {
    supplyCheck?: ProjectSupplyCheck[];
    loading?: boolean;
    error?: string | null;
  };
}
