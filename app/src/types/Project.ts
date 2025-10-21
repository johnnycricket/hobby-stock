import { ProjectItem } from "./ProjectItem";

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
};

export type ProjectInput = {
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
};
