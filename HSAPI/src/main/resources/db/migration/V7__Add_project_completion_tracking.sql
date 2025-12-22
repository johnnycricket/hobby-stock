-- Add completed_at timestamp column
ALTER TABLE projects ADD COLUMN completed_at TIMESTAMP WITH TIME ZONE;

-- Create partial index for filtering completed projects (only indexes non-null values)
CREATE INDEX idx_projects_completed_at ON projects(completed_at) WHERE completed_at IS NOT NULL;

-- Update existing completed projects to have completed_at = end_date if end_date exists
UPDATE projects 
SET completed_at = end_date::timestamp 
WHERE status = 'COMPLETED'::project_status
  AND end_date IS NOT NULL 
  AND completed_at IS NULL;

