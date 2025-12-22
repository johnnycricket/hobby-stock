# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-12-22-usage-analytics/spec.md

## Schema Changes

### Usage Analytics Indexes

**Migration:** `V9__Add_usage_analytics_indexes.sql`

Add indexes to optimize analytics queries that aggregate item usage across projects.

```sql
-- Add composite index for analytics aggregation queries
-- This index supports GROUP BY item_id with SUM(quantity_used) operations
CREATE INDEX idx_project_items_item_id_quantity ON project_items(item_id, quantity_used);

-- Add index for project-based usage queries
-- This index supports queries filtering by project and aggregating quantities
CREATE INDEX idx_project_items_project_id_quantity ON project_items(project_id, quantity_used);
```

**Rationale:** These indexes optimize queries that:
1. Aggregate total usage per item across all projects (first index)
2. Calculate usage statistics for specific projects (second index)
3. Support efficient JOIN operations with items and projects tables

The composite indexes include `quantity_used` to support covering index queries where possible, reducing need to access the main table.

## Data Integrity Rules

- Analytics are calculated from existing `project_items` table
- No new tables or data integrity constraints required
- Analytics are computed on-demand (not stored)

## Performance Considerations

- Composite indexes support efficient GROUP BY and SUM operations
- Indexes reduce full table scans for analytics queries
- No additional storage overhead for analytics data (computed on demand)
- Indexes support both ascending and descending sort operations

## Migration Notes

- Indexes can be created without downtime
- Existing queries continue to work
- Indexes improve performance but are not required for functionality

