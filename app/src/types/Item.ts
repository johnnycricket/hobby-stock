import { Category } from "./Category";

export type Item = {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  quantity: number;
  minQuantity?: number;
  unitPrice?: number;
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
  location: string;
  notes?: string;
};

export namespace Item {
  export function is(item: any): item is Item {
    return item && typeof item === "object" && "id" in item;
  }
}
