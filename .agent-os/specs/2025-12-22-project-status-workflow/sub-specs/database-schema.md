# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-12-22-project-status-workflow/spec.md

## Schema Changes

### Project Status Enum Migration

**Migration:** `V6__Add_project_status_enum.sql`

Convert the existing `status` VARCHAR column in `projects` table to use an enum type for better data integrity and validation.

```sql
-- Create enum type for project status
CREATE TYPE project_status AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED');

-- Add new column with enum type
ALTER TABLE projects ADD COLUMN status_new project_status;

-- Migrate existing data (default to ACTIVE for existing projects)
UPDATE projects SET status_new = CASE 
  WHEN UPPER(status) = 'PLANNING' THEN 'PLANNING'::project_status
  WHEN UPPER(status) = 'ACTIVE' THEN 'ACTIVE'::project_status
  WHEN UPPER(status) = 'ON_HOLD' THEN 'ON_HOLD'::project_status
  WHEN UPPER(status) = 'COMPLETED' THEN 'COMPLETED'::project_status
  WHEN UPPER(status) = 'CANCELLED' THEN 'COMPLETED'::project_status  -- Map cancelled to completed
  ELSE 'ACTIVE'::project_status
END;

-- Make new column NOT NULL
ALTER TABLE projects ALTER COLUMN status_new SET NOT NULL;

-- Drop old column
ALTER TABLE projects DROP COLUMN status;

-- Rename new column
ALTER TABLE projects RENAME COLUMN status_new TO status;

-- Add default value
ALTER TABLE projects ALTER COLUMN status SET DEFAULT 'PLANNING'::project_status;

-- Add index for status filtering
CREATE INDEX idx_projects_status ON projects(status);
```

**Rationale:** Using an enum type ensures data integrity by preventing invalid status values and provides better type safety in the application layer. The index improves query performance for status-based filtering.

## Data Integrity Rules

1. **Status Values:** Only enum values (PLANNING, ACTIVE, ON_HOLD, COMPLETED) are allowed
2. **Default Status:** New projects default to PLANNING status
3. **Status Transitions:** Application-level validation enforces valid transitions

## Performance Considerations

- Index on status column optimizes filtering queries
- Enum type provides efficient storage and comparison
- No additional tables or joins required

