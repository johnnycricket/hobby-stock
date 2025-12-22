# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-12-22-bulk-operations/spec.md

## Technical Requirements

### Backend Implementation

- **Data Models:**
  - Create `BulkProjectItemInput` data class with fields: `itemId`, `quantityUsed`
  - Create `BulkQuantityUpdateInput` data class with fields: `projectItemId`, `quantityUsed`
  - Create `BulkOperationResult` data class with:
    - `success: Boolean`
    - `message: String?`
    - `itemsProcessed: Int`
    - `itemsSucceeded: Int`
    - `itemsFailed: Int`
    - `errors: List<BulkOperationError>`
  - Create `BulkOperationError` data class with: `itemId`, `itemName`, `error`

- **Service Layer:**
  - Add `bulkAddProjectItems(projectId, items)` method to `ProjectItemService`
  - Add `bulkUpdateProjectItemQuantities(projectId, updates)` method
  - Implement transaction support for atomicity
  - Validate each item individually (existence, quantity validation)
  - Collect errors for failed items while processing successful ones
  - Return detailed results with success/failure breakdown

- **GraphQL Schema:**
  - Add `BulkProjectItemInput` input type
  - Add `BulkQuantityUpdateInput` input type
  - Add `BulkOperationResult` type
  - Add `BulkOperationError` type
  - Add mutation `bulkAddProjectItems(projectId, items)`
  - Add mutation `bulkUpdateProjectItemQuantities(projectId, updates)`

- **Validation:**
  - Validate project exists
  - Validate all item IDs exist
  - Validate quantities are non-negative
  - Validate project item IDs exist (for updates)
  - Handle duplicate items gracefully (update existing vs create new)

### Frontend Implementation

- **Type Definitions:**
  - Create `BulkProjectItemInput` type
  - Create `BulkQuantityUpdateInput` type
  - Create `BulkOperationResult` type
  - Create `BulkOperationError` type

- **Multi-Select Interface:**
  - Add checkboxes to item list components
  - Implement selection state management
  - Create `BulkActionToolbar` component that appears when items are selected
  - Show selection count and actions

- **Bulk Add Modal:**
  - Create `BulkAddItemsModal` component
  - Display selected items with quantity inputs
  - Allow setting default quantity for all items
  - Allow individual quantity customization
  - Show validation errors
  - Display operation results after submission

- **Bulk Update Modal:**
  - Create `BulkQuantityAdjustModal` component
  - Display project items with current quantities
  - Support adjustment modes:
    - Fixed value: set all to same quantity
    - Percentage: adjust by percentage (e.g., +10%, -20%)
    - Individual: customize per item
  - Show preview of new quantities
  - Display operation results after submission

- **Service Layer:**
  - Add `bulkAddProjectItems()` method to `ProjectItemService`
  - Add `bulkUpdateProjectItemQuantities()` method
  - Handle GraphQL mutations and responses
  - Parse and display detailed results

- **Result Display:**
  - Show success/failure summary
  - List items that succeeded
  - List items that failed with error messages
  - Allow retry for failed items
  - Close modal on success or show results

### UI/UX Specifications

- **Multi-Select:**
  - Checkbox in each item row
  - "Select All" checkbox in header
  - Selection count indicator
  - Clear selection button

- **Bulk Action Toolbar:**
  - Appears when items are selected
  - Actions: "Add to Project", "Bulk Edit Quantities"
  - Sticky or floating position
  - Clear selection option

- **Bulk Add Modal:**
  - Title: "Add Multiple Items to Project"
  - Item list with checkboxes (pre-selected)
  - Quantity input for each item
  - "Set Default Quantity" input with apply button
  - Validation feedback
  - Cancel and "Add Items" buttons

- **Bulk Update Modal:**
  - Title: "Bulk Adjust Quantities"
  - Adjustment mode selector (Fixed/Percentage/Individual)
  - Item list with current and new quantities
  - Preview of changes
  - Validation feedback
  - Cancel and "Update Quantities" buttons

- **Result Display:**
  - Success summary: "X items added successfully"
  - Failure summary: "Y items failed"
  - Expandable error list
  - Retry button for failed items
  - Close button

- **Visual Design:**
  - Clear selection indicators
  - Loading states during operations
  - Success/error color coding
  - Accessible form controls

## Integration Requirements

- Extends existing `ProjectItemService` functionality
- Works with existing project item management
- Compatible with existing item selection components
- No breaking changes to existing operations

## Performance Criteria

- Bulk operations handle up to 100 items per operation
- Operations complete in < 2s for typical datasets
- Transaction support ensures data consistency
- Partial success scenarios handled gracefully

## External Dependencies

No new external dependencies required. Uses existing stack:
- Spring Boot GraphQL (existing)
- React Hook Form (existing)
- Apollo Client (existing)
- PostgreSQL (existing)

