# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-12-22-project-status-workflow/spec.md

## GraphQL Schema Extensions

### New Enum

```graphql
enum ProjectStatus {
  PLANNING
  ACTIVE
  ON_HOLD
  COMPLETED
}
```

### Type Updates

#### Project Type

```graphql
type Project {
  id: ID!
  name: String!
  description: String
  status: ProjectStatus!  # Changed from String! to enum
  startDate: String
  endDate: String
  createdAt: String!
  updatedAt: String
  items: [ProjectItem]
  supplyCheck: [ProjectSupplyCheck!]!
}
```

#### Project Input

```graphql
input ProjectInput {
  name: String!
  description: String
  status: ProjectStatus!  # Changed from String! to enum
  startDate: String
  endDate: String
}
```

## Query Updates

### Existing Queries (Updated)

All existing project queries now return `status: ProjectStatus!` instead of `String!`:
- `projectsPaginated`
- `project(id: ID!)`
- `projectsByStatusPaginated` - Now uses `ProjectStatus!` instead of `String!`
- `searchProjectsPaginated`

### Status Filtering Query

```graphql
projectsByStatusPaginated(
  status: ProjectStatus!  # Now uses enum
  page: Int = 0
  size: Int = 20
): ProjectPage!
```

## Mutation Updates

### Update Project Status

```graphql
updateProjectStatus(
  id: ID!
  status: ProjectStatus!  # Now uses enum
): ProjectMutationResult!
```

**Purpose:** Update project status with transition validation
**Parameters:**
- `id: ID!` - Project ID
- `status: ProjectStatus!` - New status value (enum)

**Response:** `ProjectMutationResult` with updated project

**Errors:**
- Project not found
- Invalid status transition (e.g., COMPLETED → ACTIVE)
- Status validation failure

**Validation Rules:**
- PLANNING → ACTIVE, ON_HOLD (allowed)
- ACTIVE → ON_HOLD, COMPLETED (allowed)
- ON_HOLD → ACTIVE, COMPLETED (allowed)
- COMPLETED → (no transitions allowed)

## Error Handling

- GraphQL enum validation ensures only valid status values are accepted
- Application-level validation enforces status transition rules
- Clear error messages returned for invalid transitions:
  - "Invalid status transition: Cannot change status from COMPLETED to ACTIVE"
  - "Project not found"
  - "Status is required"

## Backward Compatibility

- Existing status strings are migrated to enum values during database migration
- GraphQL schema change is breaking but migration handles data conversion
- Frontend must be updated simultaneously to use enum type

