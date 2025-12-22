import { Category } from "./Category";

export enum AmountType {
  PERCENT = "PERCENT",
  COUNT = "COUNT",
  VOLUME = "VOLUME",
}

export type Item = {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  quantity: number;
  minQuantity?: number;
  unitPrice?: number;
  amountType: AmountType;
  location: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  category?: Category;
};

export type ItemInput = {
  name: string;
  description?: string;
  categoryId: number;
  quantity: number;
  minQuantity?: number;
  unitPrice?: number;
  amountType?: AmountType;
  location: string;
  notes?: string;
};

export namespace Item {
  export function is(item: unknown): item is Item {
    return (
      item !== null &&
      typeof item === "object" &&
      "id" in item &&
      typeof (item as Record<string, unknown>).id === "number"
    );
  }
}
