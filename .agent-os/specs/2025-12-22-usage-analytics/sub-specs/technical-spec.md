# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-12-22-usage-analytics/spec.md

## Technical Requirements

### Backend Implementation

- **Data Models:**
  - Create `ItemUsageAnalytics` data class with fields:
    - `itemId: UUID`
    - `itemName: String`
    - `totalUsageCount: Int` (sum of all quantities used)
    - `projectCount: Int` (number of projects using this item)
    - `projects: List<Project>` (optional, for detailed view)

- **Service Layer:**
  - Create `ItemUsageService` to calculate usage statistics
  - Implement `getUsageAnalytics(page: Int, size: Int, sortBy: UsageSortBy)` method
  - Implement `getUsageAnalyticsById(itemId: UUID)` for single item details
  - Use aggregation queries to calculate totals from `project_items` table
  - Join with `items` table to get item names
  - Join with `projects` table for project associations (when needed)

- **GraphQL Schema:**
  - Add `ItemUsageAnalytics` type
  - Add `ItemUsageAnalyticsPage` type for pagination
  - Add `UsageSortBy` enum: `USAGE_COUNT_ASC`, `USAGE_COUNT_DESC`, `ITEM_NAME_ASC`, `ITEM_NAME_DESC`, `PROJECT_COUNT_ASC`, `PROJECT_COUNT_DESC`
  - Add query `itemUsageAnalytics(page, size, sortBy)`
  - Add query `itemUsageAnalyticsById(itemId)`

- **Database Optimization:**
  - Add composite index on `project_items(item_id, quantity_used)` for aggregation queries
  - Add index on `project_items(project_id, quantity_used)` for project-based queries
  - Ensure indexes support efficient GROUP BY and SUM operations

### Frontend Implementation

- **Type Definitions:**
  - Create `ItemUsageAnalytics` type matching backend structure
  - Create `UsageSortBy` enum matching backend
  - Create `ItemUsageAnalyticsPage` type for paginated results

- **Service Layer:**
  - Add `getUsageAnalytics()` method to analytics or item service
  - Add `getUsageAnalyticsById()` method for single item details
  - Implement pagination and sorting parameters

- **Dashboard Component:**
  - Create `UsageAnalyticsDashboard` component
  - Display analytics in table format with columns:
    - Item Name
    - Total Usage Count
    - Number of Projects
    - Actions (view details)
  - Implement sortable columns
  - Add pagination controls
  - Show loading and error states

- **Item Details View:**
  - Create `ItemUsageDetails` component or modal
  - Display item name and total usage
  - List projects using the item with quantities
  - Link to project details pages

- **Navigation:**
  - Add "Usage Analytics" link to main navigation or dashboard
  - Create dedicated analytics page/route
  - Optional: Add analytics section to existing dashboard

### UI/UX Specifications

- **Table Layout:**
  - Sortable column headers
  - Alternating row colors for readability
  - Responsive design for mobile
  - Clear column headers with icons

- **Visual Indicators:**
  - Highlight top 10 most used items (optional)
  - Usage count badges or formatted numbers
  - Project count badges
  - Color coding for high usage (optional)

- **Sorting:**
  - Click column headers to sort
  - Visual indicator for current sort (arrow up/down)
  - Default sort: Usage Count (descending)

- **Pagination:**
  - Standard pagination controls
  - Page size selector (10, 20, 50 items per page)
  - Display total count and current page info

- **Details View:**
  - Modal or expandable row
  - Project list with quantities
  - Link to each project
  - Close/back button

## Integration Requirements

- Queries existing `project_items` table relationships
- Works with existing `Item` and `Project` types
- Compatible with existing pagination system
- No database schema changes required (only indexes)

## Performance Criteria

- Usage analytics calculations complete in < 500ms for datasets up to 10,000 items
- Paginated queries complete in < 200ms
- Single item analytics query completes in < 100ms
- Indexes support efficient aggregation operations

## External Dependencies

No new external dependencies required. Uses existing stack:
- Spring Boot GraphQL (existing)
- React (existing)
- Apollo Client (existing)
- PostgreSQL (existing)

