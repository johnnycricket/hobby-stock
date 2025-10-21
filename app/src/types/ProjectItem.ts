export type ProjectItem = {
  id: number;
  projectId: number;
  itemId: number;
  quantityUsed: number;
  createdAt: string;
};

export type ProjectItemInput = {
  projectId: number;
  itemId: number;
  quantityUsed: number;
};
