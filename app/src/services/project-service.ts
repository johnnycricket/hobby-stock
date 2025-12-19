import { ProjectInput } from "@/types/Project";

export namespace ProjectService {
  export const findAllPaginated = async (page: number, size: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { projectsPaginated(page: ${page}, size: ${size}) { content { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } supplyCheck { itemId itemName requiredQuantity availableQuantity supplyStatus quantityGap } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findById = async (id: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { 
          project(id: "${id}") { 
            id 
            name 
            description 
            status 
            startDate 
            endDate 
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
        }`,
      }),
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
        query: `query { projectsByStatusPaginated(status: "${status}", page: ${page}, size: ${size}) { content { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } supplyCheck { itemId itemName requiredQuantity availableQuantity supplyStatus quantityGap } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
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
        query: `query { searchProjectsPaginated(searchTerm: "${searchTerm}", page: ${page}, size: ${size}) { content { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } supplyCheck { itemId itemName requiredQuantity availableQuantity supplyStatus quantityGap } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
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
        query: `mutation CreateProject($input: ProjectInput!) {
          createProject(input: $input) {
            success
            message
            project {
              id
              name
              description
              status
              startDate
              endDate
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
          input: project,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const updateProject = async (id: string, project: ProjectInput) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation UpdateProject($id: String!, $input: ProjectInput!) {
          updateProject(id: $id, input: $input) {
            success
            message
            project {
              id
              name
              description
              status
              startDate
              endDate
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
          id: id,
          input: project,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const deleteProject = async (id: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation DeleteProject($id: String!) { 
          deleteProject(id: $id) { 
            success 
            message 
            project { 
              id 
              name 
              description 
              status 
              startDate 
              endDate 
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
          id: id,
        },
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
        query: `mutation { updateProjectStatus(id: "${id}", status: "${status}") { success message project { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } supplyCheck { itemId itemName requiredQuantity availableQuantity supplyStatus quantityGap } } } }`,
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
        query: `mutation { completeProject(id: "${id}", endDate: "${endDate}") { success message project { id name description status startDate endDate createdAt updatedAt items { id projectId itemId quantityUsed createdAt } supplyCheck { itemId itemName requiredQuantity availableQuantity supplyStatus quantityGap } } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
}
