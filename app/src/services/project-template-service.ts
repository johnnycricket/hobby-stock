import {
  ProjectTemplate,
  ProjectTemplateInput,
  ProjectTemplatePage,
  ProjectTemplateMutationResult,
} from "@/types/ProjectTemplate";
import { ProjectInput } from "@/types/Project";
import { ProjectMutationResult } from "@/types/Project";

export namespace ProjectTemplateService {
  export const findAll = async () => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          projectTemplates {
            id
            name
            description
            defaultStatus
            createdAt
            updatedAt
            items {
              id
              templateId
              itemId
              quantityUsed
              createdAt
              item {
                id
                name
                description
                categoryId
                quantity
                minQuantity
                unitPrice
                amountType
                location
                notes
                createdAt
                updatedAt
              }
            }
          }
        }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findById = async (id: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          projectTemplate(id: ${id}) {
            id
            name
            description
            defaultStatus
            createdAt
            updatedAt
            items {
              id
              templateId
              itemId
              quantityUsed
              createdAt
              item {
                id
                name
                description
                categoryId
                quantity
                minQuantity
                unitPrice
                amountType
                location
                notes
                createdAt
                updatedAt
              }
            }
          }
        }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findAllPaginated = async (page: number, size: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          projectTemplatesPaginated(page: ${page}, size: ${size}) {
            content {
              id
              name
              description
              defaultStatus
              createdAt
              updatedAt
              items {
                id
                templateId
                itemId
                quantityUsed
                createdAt
                item {
                  id
                  name
                  description
                  categoryId
                  quantity
                  minQuantity
                  unitPrice
                  amountType
                  location
                  notes
                  createdAt
                  updatedAt
                }
              }
            }
            pageInfo {
              totalElements
              totalPages
              currentPage
              hasNext
              hasPrevious
            }
          }
        }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const createTemplate = async (input: ProjectTemplateInput) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation CreateProjectTemplate($input: ProjectTemplateInput!) {
          createProjectTemplate(input: $input) {
            success
            message
            template {
              id
              name
              description
              defaultStatus
              createdAt
              updatedAt
              items {
                id
                templateId
                itemId
                quantityUsed
                createdAt
                item {
                  id
                  name
                  description
                  categoryId
                  quantity
                  minQuantity
                  unitPrice
                  amountType
                  location
                  notes
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }`,
        variables: {
          input: input,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const updateTemplate = async (
    id: number,
    input: ProjectTemplateInput
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation UpdateProjectTemplate($id: Int!, $input: ProjectTemplateInput!) {
          updateProjectTemplate(id: $id, input: $input) {
            success
            message
            template {
              id
              name
              description
              defaultStatus
              createdAt
              updatedAt
              items {
                id
                templateId
                itemId
                quantityUsed
                createdAt
                item {
                  id
                  name
                  description
                  categoryId
                  quantity
                  minQuantity
                  unitPrice
                  amountType
                  location
                  notes
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }`,
        variables: {
          id: id,
          input: input,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const deleteTemplate = async (id: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation DeleteProjectTemplate($id: Int!) {
          deleteProjectTemplate(id: $id) {
            success
            message
            template {
              id
              name
              description
              defaultStatus
              createdAt
              updatedAt
            }
          }
        }`,
        variables: {
          id: id,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const createProjectFromTemplate = async (
    templateId: number,
    projectInput: ProjectInput
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation CreateProjectFromTemplate($templateId: Int!, $projectInput: ProjectInput!) {
          createProjectFromTemplate(templateId: $templateId, projectInput: $projectInput) {
            success
            message
            project {
              id
              name
              description
              status
              startDate
              endDate
              completedAt
              createdAt
              updatedAt
              items {
                id
                projectId
                itemId
                quantityUsed
                createdAt
              }
              supplyCheck {
                itemId
                itemName
                requiredQuantity
                availableQuantity
                supplyStatus
                quantityGap
              }
            }
          }
        }`,
        variables: {
          templateId: templateId,
          projectInput: projectInput,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
}



