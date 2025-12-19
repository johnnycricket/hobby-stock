import { SupplyStatus } from "./SupplyStatus";

export type ProjectSupplyCheck = {
  itemId: string;
  itemName: string;
  requiredQuantity: number;
  availableQuantity: number;
  supplyStatus: SupplyStatus;
  quantityGap: number;
};
