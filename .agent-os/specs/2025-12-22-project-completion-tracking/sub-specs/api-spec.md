# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-12-22-project-completion-tracking/spec.md

## GraphQL Schema Extensions

### Type Updates

#### Project Type

```graphql
type Project {
  id: ID!
  name: String!
  description: String
  status: String!  # or ProjectStatus! if enum implemented
  startDate: String
  endDate: String
  completedAt: String  # New field - ISO timestamp
  createdAt: String!
  updatedAt: String
  items: [ProjectItem]
  supplyCheck: [ProjectSupplyCheck!]!
}
```

## Query Updates

### Existing Queries

All existing project queries now return `completedAt: String` field:
- `projectsPaginated`
- `project(id: ID!)`
- `projectsByStatusPaginated`
- `searchProjectsPaginated`

### New Query for Completed Projects

```graphql
completedProjectsPaginated(
  page: Int = 0
  size: Int = 20
): ProjectPage!
```

**Purpose:** Get paginated list of completed projects
**Parameters:**
- `page: Int` - Page number (default: 0)
- `size: Int` - Page size (default: 20)

**Response:** `ProjectPage` with completed projects only

**Errors:**
- Invalid pagination parameters

## Mutation Updates

### Complete Project

```graphql
completeProject(
  id: ID!
  endDate: String  # Optional - ISO date format
): ProjectMutationResult!
```

**Purpose:** Mark project as completed and set completion timestamp
**Parameters:**
- `id: ID!` - Project ID
- `endDate: String` - Optional end date (ISO format, e.g., "2025-12-22")

**Response:** `ProjectMutationResult` with completed project including `completedAt` timestamp

**Behavior:**
- Sets project status to "COMPLETED" (or `ProjectStatus.COMPLETED` if enum exists)
- Sets `completedAt` to current timestamp
- Sets `endDate` if provided
- Returns updated project with all fields

**Errors:**
- Project not found
- Invalid date format
- Project already completed (optional validation)

## Error Handling

- Clear error messages for invalid operations:
  - "Project not found"
  - "Invalid date format. Expected ISO format: YYYY-MM-DD"
  - "Project is already completed" (if validation added)

## Integration Notes

- Works with existing `ProjectMutationResult` type
- Compatible with Project Status Workflow spec (if enum implemented)
- No breaking changes to existing mutations
- `completedAt` is optional in response (null for incomplete projects)

