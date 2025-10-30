import { ItemInput } from "@/types/Item";

export namespace ItemService {
  export const findAll = async () => {
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

  export const findAllPaginated = async (page: number, size: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { itemsPaginated(page: ${page}, size: ${size}) { content { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
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
        query: `query { item(id: "${id}") { 
            id 
            name 
            description 
            categoryId 
            quantity 
            minQuantity 
            unitPrice 
            location 
            notes 
            createdAt 
            updatedAt 
            category 
            { 
              id 
              name 
              description 
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

  export const findByCategoryId = async (categoryId: number) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { itemsByCategory(categoryId: ${categoryId}) { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findByCategoryIdPaginated = async (
    categoryId: number,
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { itemsByCategoryPaginated(categoryId: ${categoryId}, page: ${page}, size: ${size}) { content { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findByLocation = async (location: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { itemsByLocation(location: "${location}") { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findByLocationPaginated = async (
    location: string,
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { itemsByLocationPaginated(location: "${location}", page: ${page}, size: ${size}) { content { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findLowStockItems = async () => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { lowStockItems { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const findLowStockItemsPaginated = async (
    page: number,
    size: number
  ) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { lowStockItemsPaginated(page: ${page}, size: ${size}) { content { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const search = async (searchTerm: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { searchItems(searchTerm: "${searchTerm}") { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } }`,
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
        query: `query { searchItemsPaginated(searchTerm: "${searchTerm}", page: ${page}, size: ${size}) { content { id name description categoryId quantity minQuantity unitPrice location notes createdAt updatedAt category { id name description } } pageInfo { totalElements totalPages currentPage hasNext hasPrevious } } }`,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const createItem = async (item: ItemInput) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation CreateItem($input: ItemInput!) {
          createItem(input: $input) {
            success
            message
            item {
              id
              name
              description
              categoryId
              quantity
              minQuantity
              unitPrice
              location
              notes
              createdAt
              updatedAt
              category {
                id
                name
                description
              }
            }
          }
        }`,
        variables: {
          input: item,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const updateItem = async (id: number, item: ItemInput) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation UpdateItem($id: String!, $input: ItemUpdateInput!) {
          updateItem(id: $id, input: $input) {
            success
            message
            item {
              id 
              name 
              description 
              categoryId 
              quantity 
              minQuantity 
              unitPrice 
              location 
              notes 
              createdAt 
              updatedAt 
              category { 
                id 
                name 
                description 
              } 
            } 
          } 
        }`,
        variables: {
          id: id,
          input: item,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  export const deleteItem = async (id: string) => {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation DeleteItem($id: String!) {
          deleteItem(id: $id) {
            success
            message
            item {
              id
              name
              description
              categoryId
              quantity
              minQuantity
              unitPrice
              location
              notes
              createdAt
              updatedAt
              category {
                id
                name
                description
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
}
