# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/2025-12-22-usage-analytics/spec.md

## GraphQL Schema Extensions

### New Types

```graphql
type ItemUsageAnalytics {
  itemId: ID!
  itemName: String!
  totalUsageCount: Int!
  projectCount: Int!
  projects: [Project!]  # Optional - only included in detailed queries
}

type ItemUsageAnalyticsPage {
  content: [ItemUsageAnalytics!]!
  pageInfo: PageInfo!
}

enum UsageSortBy {
  USAGE_COUNT_ASC
  USAGE_COUNT_DESC
  ITEM_NAME_ASC
  ITEM_NAME_DESC
  PROJECT_COUNT_ASC
  PROJECT_COUNT_DESC
}
```

## New Queries

### Get Usage Analytics (Paginated)

```graphql
itemUsageAnalytics(
  page: Int = 0
  size: Int = 20
  sortBy: UsageSortBy = USAGE_COUNT_DESC
): ItemUsageAnalyticsPage!
```

**Purpose:** Get aggregated usage statistics for all items with pagination and sorting
**Parameters:**
- `page: Int` - Page number (default: 0)
- `size: Int` - Page size (default: 20)
- `sortBy: UsageSortBy` - Sort order (default: USAGE_COUNT_DESC)

**Response:** `ItemUsageAnalyticsPage` with paginated usage statistics

**Errors:**
- Invalid pagination parameters
- Invalid sort option

**Behavior:**
- Aggregates data from `project_items` table
- Groups by item and calculates totals
- Sorts according to `sortBy` parameter
- Returns paginated results

### Get Usage Analytics for Specific Item

```graphql
itemUsageAnalyticsById(itemId: ID!): ItemUsageAnalytics!
```

**Purpose:** Get detailed usage statistics for a specific item including project associations
**Parameters:**
- `itemId: ID!` - Item ID

**Response:** `ItemUsageAnalytics` with item usage data including project list

**Errors:**
- Item not found

**Behavior:**
- Returns usage statistics for single item
- Includes list of projects using the item
- Shows quantities used per project

## Response Format

### ItemUsageAnalytics Fields

- `itemId: ID!` - The item identifier
- `itemName: String!` - The item name (from items table)
- `totalUsageCount: Int!` - Sum of all `quantity_used` values across all projects
- `projectCount: Int!` - Number of distinct projects using this item
- `projects: [Project!]` - List of projects using this item (only in detailed queries)

### Example Response

```graphql
{
  itemUsageAnalytics(page: 0, size: 10, sortBy: USAGE_COUNT_DESC) {
    content {
      itemId: "123e4567-e89b-12d3-a456-426614174000"
      itemName: "Arduino Uno"
      totalUsageCount: 15
      projectCount: 3
    }
    pageInfo {
      totalElements: 150
      totalPages: 15
      currentPage: 0
      hasNext: true
      hasPrevious: false
    }
  }
}
```

## Error Handling

- Clear error messages for invalid operations:
  - "Item not found"
  - "Invalid pagination parameters"
  - "Invalid sort option"

## Performance Notes

- Queries use database aggregation (GROUP BY, SUM) for efficiency
- Indexes support fast aggregation operations
- Pagination limits result set size
- Project associations are only loaded when needed (detailed queries)

