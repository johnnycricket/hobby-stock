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
