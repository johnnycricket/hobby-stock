import { ProjectInput } from "@/types/Project";

export namespace ProjectService {
  export const findAllPaginated = async (page: number, size: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findById = async (id: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findByStatusPaginated = async (
    status: string,
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { projectsByStatusPaginated(status: ${status}, page: ${page}, size: ${size}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const searchPaginated = async (
    searchTerm: string,
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { searchProjectsPaginated(searchTerm: ${searchTerm}, page: ${page}, size: ${size}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const createProject = async (project: ProjectInput) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { createProject(input: ${JSON.stringify(
          project
        )}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const updateProject = async (id: number, project: ProjectInput) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { updateProject(id: ${id}, input: ${JSON.stringify(
          project
        )}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const deleteProject = async (id: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { deleteProject(id: ${id}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const updateProjectStatus = async (id: number, status: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { updateProjectStatus(id: ${id}, status: ${status}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const completeProject = async (id: number, endDate: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { completeProject(id: ${id}, endDate: ${endDate}) { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
}
