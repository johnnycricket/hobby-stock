# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-12-22-project-templates/spec.md

## GraphQL Schema Extensions

### New Types

```graphql
type ProjectTemplate {
  id: ID!
  name: String!
  description: String
  defaultStatus: String!  # or ProjectStatus! if enum exists
  createdAt: String!
  updatedAt: String
  items: [ProjectTemplateItem!]
}

type ProjectTemplateItem {
  id: ID!
  templateId: ID!
  itemId: ID!
  item: Item
  quantityUsed: Int!
  createdAt: String!
}

type ProjectTemplatePage {
  content: [ProjectTemplate!]!
  pageInfo: PageInfo!
}

input ProjectTemplateInput {
  name: String!
  description: String
  defaultStatus: String!  # or ProjectStatus! if enum exists
  items: [ProjectTemplateItemInput!]
}

input ProjectTemplateItemInput {
  itemId: ID!
  quantityUsed: Int!
}

type ProjectTemplateMutationResult {
  success: Boolean!
  message: String
  template: ProjectTemplate
}
```

## Queries

### Get All Templates

```graphql
projectTemplates: [ProjectTemplate!]!
```

**Purpose:** Get all available project templates
**Parameters:** None
**Response:** Array of `ProjectTemplate`
**Errors:** None (returns empty array if no templates)

### Get Paginated Templates

```graphql
projectTemplatesPaginated(
  page: Int = 0
  size: Int = 20
): ProjectTemplatePage!
```

**Purpose:** Get paginated list of templates
**Parameters:**
- `page: Int` - Page number (default: 0)
- `size: Int` - Page size (default: 20)
**Response:** `ProjectTemplatePage` with paginated templates
**Errors:** Invalid pagination parameters

### Get Template by ID

```graphql
projectTemplate(id: ID!): ProjectTemplate
```

**Purpose:** Get a specific template with all details
**Parameters:**
- `id: ID!` - Template ID
**Response:** `ProjectTemplate` or null if not found
**Errors:** None (returns null if not found)

## Mutations

### Create Template

```graphql
createProjectTemplate(
  input: ProjectTemplateInput!
): ProjectTemplateMutationResult!
```

**Purpose:** Create a new reusable project template
**Parameters:**
- `input: ProjectTemplateInput!` - Template data including items
**Response:** `ProjectTemplateMutationResult` with created template
**Errors:**
- Invalid template name (empty or duplicate)
- Invalid item IDs
- Invalid quantities

### Update Template

```graphql
updateProjectTemplate(
  id: ID!
  input: ProjectTemplateInput!
): ProjectTemplateMutationResult!
```

**Purpose:** Update an existing template
**Parameters:**
- `id: ID!` - Template ID
- `input: ProjectTemplateInput!` - Updated template data
**Response:** `ProjectTemplateMutationResult` with updated template
**Errors:**
- Template not found
- Invalid input data

### Delete Template

```graphql
deleteProjectTemplate(id: ID!): MutationResult!
```

**Purpose:** Delete a template and all associated template items
**Parameters:**
- `id: ID!` - Template ID
**Response:** `MutationResult` with success status
**Errors:**
- Template not found

### Create Project from Template

```graphql
createProjectFromTemplate(
  templateId: ID!
  projectInput: ProjectInput!
): ProjectMutationResult!
```

**Purpose:** Create a new project using a template as a starting point
**Parameters:**
- `templateId: ID!` - Template to use
- `projectInput: ProjectInput!` - Project-specific data (overrides template defaults)
**Response:** `ProjectMutationResult` with created project and all template items
**Behavior:**
- Creates new project with data from `projectInput`
- Adds all template items to the new project
- Uses template item quantities
- Returns complete project with items
**Errors:**
- Template not found
- Invalid project input
- Template items reference non-existent items

## Example Mutations

### Create Template

```graphql
mutation {
  createProjectTemplate(input: {
    name: "Arduino Starter Project"
    description: "Basic Arduino project template"
    defaultStatus: "PLANNING"
    items: [
      { itemId: "123", quantityUsed: 1 }
      { itemId: "456", quantityUsed: 5 }
    ]
  }) {
    success
    message
    template {
      id
      name
      items {
        itemId
        quantityUsed
      }
    }
  }
}
```

### Create Project from Template

```graphql
mutation {
  createProjectFromTemplate(
    templateId: "789"
    projectInput: {
      name: "My Arduino Project"
      description: "Custom description"
      status: "PLANNING"
    }
  ) {
    success
    message
    project {
      id
      name
      items {
        itemId
        quantityUsed
      }
    }
  }
}
```

## Error Handling

- Clear error messages for invalid operations:
  - "Template not found"
  - "Template name is required"
  - "Duplicate template name"
  - "Invalid item ID"
  - "Quantity must be positive"
  - "Project creation failed"

