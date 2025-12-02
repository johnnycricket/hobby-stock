import { Item } from "./Item";

export type ProjectItem = {
  id: number;
  projectId: number;
  itemId: number;
  quantityUsed: number;
  createdAt: string;
  item?: Item;
};

export type ProjectItemInput = {
  projectId: number;
  itemId: number;
  quantityUsed: number;
};
