import { ProjectStatus } from "./ProjectStatus";
import { Item } from "./Item";

export type ProjectTemplate = {
  id: number;
  name: string;
  description?: string;
  defaultStatus: ProjectStatus;
  createdAt: string;
  updatedAt?: string;
  items?: ProjectTemplateItem[];
};

export type ProjectTemplateItem = {
  id: number;
  templateId: number;
  itemId: string;
  quantityUsed: number;
  createdAt: string;
  item?: Item;
};

export type ProjectTemplateInput = {
  name: string;
  description?: string;
  defaultStatus: ProjectStatus;
  items?: ProjectTemplateItemInput[];
};

export type ProjectTemplateItemInput = {
  itemId: string;
  quantityUsed: number;
};

export type ProjectTemplatePage = {
  content: ProjectTemplate[];
  pageInfo: {
    totalElements: number;
    totalPages: number;
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

export type ProjectTemplateMutationResult = {
  success: boolean;
  message?: string;
  template?: ProjectTemplate;
};



