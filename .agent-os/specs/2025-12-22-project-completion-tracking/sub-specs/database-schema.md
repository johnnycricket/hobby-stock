# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-12-22-project-completion-tracking/spec.md

## Schema Changes

### Project Completion Tracking

**Migration:** `V7__Add_project_completion_tracking.sql`

Add `completed_at` timestamp to track when projects are marked as complete.

```sql
-- Add completed_at timestamp column
ALTER TABLE projects ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE;

-- Create partial index for filtering completed projects (only indexes non-null values)
CREATE INDEX idx_projects_completed_at ON projects(completed_at) WHERE completed_at IS NOT NULL;

-- Update existing completed projects to have completed_at = end_date if end_date exists
-- This assumes status is stored as string or enum
UPDATE projects 
SET completed_at = end_date::timestamp 
WHERE (status = 'COMPLETED' OR status::text = 'COMPLETED') 
  AND end_date IS NOT NULL 
  AND completed_at IS NULL;
```

**Rationale:** The `completed_at` field provides explicit tracking of completion time separate from `end_date`, which may represent project duration end rather than completion time. The partial index improves query performance for filtering completed projects while keeping index size small.

## Data Integrity Rules

1. **Completion Timestamp:** `completed_at` should only be set when project status is COMPLETED
2. **End Date Relationship:** `end_date` and `completed_at` can differ (end_date = project duration end, completed_at = when marked complete)
3. **Null Values:** `completed_at` is nullable and only set when project is completed

## Performance Considerations

- Partial index on `completed_at` only indexes non-null values, reducing index size
- Index supports efficient queries filtering completed vs active projects
- No additional tables or joins required

