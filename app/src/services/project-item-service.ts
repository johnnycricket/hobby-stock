export namespace ProjectItemService {
  export const findAllPaginated = async (page: number, size: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { projectItemsPaginated(page: ${page}, size: ${size}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findByProjectIdPaginated = async (
    projectId: number,
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { projectItemsByProjectPaginated(projectId: ${projectId}, page: ${page}, size: ${size}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findByItemIdPaginated = async (
    itemId: number,
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { projectItemsByItemPaginated(itemId: ${itemId}, page: ${page}, size: ${size}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const addItemToProject = async (
    projectId: number,
    itemId: number,
    quantityUsed: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { addItemToProject(projectId: ${projectId}, itemId: ${itemId}, quantityUsed: ${quantityUsed}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const removeItemFromProject = async (id: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { removeItemFromProject(id: ${id}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const updateProjectItem = async (id: number, quantityUsed: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { updateProjectItem(id: ${id}, quantityUsed: ${quantityUsed}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const removeItemFromProjectByIds = async (
    projectId: number,
    itemId: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation { removeItemFromProjectByIds(projectId: ${projectId}, itemId: ${itemId}) { id projectId itemId quantityUsed createdAt } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
}
