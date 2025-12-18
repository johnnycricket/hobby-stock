import { ProjectItem } from "./ProjectItem";
import { ProjectSupplyCheck } from "./ProjectSupplyCheck";

export type Project = {
  id: number;
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt?: string;
  items?: ProjectItem[];
  supplyCheck?: ProjectSupplyCheck[];
};

export type ProjectInput = {
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
};
