# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-12-22-bulk-operations/spec.md

## GraphQL Schema Extensions

### New Types

```graphql
type BulkOperationResult {
  success: Boolean!
  message: String
  itemsProcessed: Int!
  itemsSucceeded: Int!
  itemsFailed: Int!
  errors: [BulkOperationError!]
}

type BulkOperationError {
  itemId: ID!
  itemName: String
  error: String!
}

input BulkProjectItemInput {
  itemId: ID!
  quantityUsed: Int!
}

input BulkQuantityUpdateInput {
  projectItemId: ID!
  quantityUsed: Int!
}
```

## Mutations

### Bulk Add Project Items

```graphql
bulkAddProjectItems(
  projectId: ID!
  items: [BulkProjectItemInput!]!
): BulkOperationResult!
```

**Purpose:** Add multiple items to a project in a single operation
**Parameters:**
- `projectId: ID!` - Target project
- `items: [BulkProjectItemInput!]!` - Array of items to add (non-empty)

**Response:** `BulkOperationResult` with detailed success/failure information

**Behavior:**
- Processes all items in a single transaction
- Validates each item individually
- Creates new project items or updates existing ones (if item already in project)
- Collects errors for failed items while processing successful ones
- Returns detailed results showing which items succeeded and which failed

**Errors:**
- Project not found
- Empty items array
- Individual item errors (reported in result, not thrown)

**Example:**
```graphql
mutation {
  bulkAddProjectItems(
    projectId: "123"
    items: [
      { itemId: "456", quantityUsed: 5 }
      { itemId: "789", quantityUsed: 10 }
    ]
  ) {
    success
    itemsProcessed
    itemsSucceeded
    itemsFailed
    errors {
      itemId
      itemName
      error
    }
  }
}
```

### Bulk Update Project Item Quantities

```graphql
bulkUpdateProjectItemQuantities(
  projectId: ID!
  updates: [BulkQuantityUpdateInput!]!
): BulkOperationResult!
```

**Purpose:** Update quantities for multiple project items simultaneously
**Parameters:**
- `projectId: ID!` - Target project
- `updates: [BulkQuantityUpdateInput!]!` - Array of quantity updates (non-empty)

**Response:** `BulkOperationResult` with detailed success/failure information

**Behavior:**
- Processes all updates in a single transaction
- Validates each update individually
- Updates existing project item quantities
- Collects errors for failed updates while processing successful ones
- Returns detailed results showing which updates succeeded and which failed

**Errors:**
- Project not found
- Empty updates array
- Individual update errors (reported in result, not thrown)

**Example:**
```graphql
mutation {
  bulkUpdateProjectItemQuantities(
    projectId: "123"
    updates: [
      { projectItemId: "111", quantityUsed: 15 }
      { projectItemId: "222", quantityUsed: 20 }
    ]
  ) {
    success
    itemsProcessed
    itemsSucceeded
    itemsFailed
    errors {
      itemId
      itemName
      error
    }
  }
}
```

## Response Format

### BulkOperationResult Fields

- `success: Boolean!` - True if all items processed successfully, false otherwise
- `message: String` - Summary message (optional)
- `itemsProcessed: Int!` - Total number of items in the operation
- `itemsSucceeded: Int!` - Number of items that succeeded
- `itemsFailed: Int!` - Number of items that failed
- `errors: [BulkOperationError!]` - List of errors for failed items (empty if all succeeded)

### BulkOperationError Fields

- `itemId: ID!` - The item or project item ID that failed
- `itemName: String` - The item name (if available)
- `error: String!` - Error message describing the failure

## Error Handling

- **Partial Success:** Operations can partially succeed - some items succeed while others fail
- **Error Collection:** All errors are collected and returned in the result, not thrown
- **Transaction Behavior:** 
  - Option 1: All-or-nothing (rollback on any error)
  - Option 2: Partial success (commit successful items, report failed ones)
  - Recommendation: Partial success for better user experience

- **Common Error Messages:**
  - "Item not found"
  - "Project item not found"
  - "Invalid quantity: must be non-negative"
  - "Project not found"
  - "Duplicate item in project"

## Performance Notes

- Operations use batch processing for efficiency
- Transactions ensure data consistency
- Validation happens before database operations when possible
- Large operations (100+ items) may take longer but should complete within 2-3 seconds

