# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/2025-12-22-project-templates/spec.md

## Schema Changes

### Project Templates

**Migration:** `V8__Add_project_templates.sql`

Create tables for project templates and template items to support reusable project configurations.

```sql
-- Create project_templates table
CREATE TABLE project_templates (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  default_status VARCHAR(50) NOT NULL DEFAULT 'PLANNING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create project_template_items table (many-to-many relationship)
CREATE TABLE project_template_items (
  id BIGSERIAL PRIMARY KEY,
  template_id BIGINT NOT NULL REFERENCES project_templates(id) ON DELETE CASCADE,
  item_id BIGINT NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quantity_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (template_id, item_id)
);

-- Create indexes for better performance
CREATE INDEX idx_template_items_template_id ON project_template_items(template_id);
CREATE INDEX idx_template_items_item_id ON project_template_items(item_id);
CREATE INDEX idx_templates_name ON project_templates(name);

-- Note: If project_status enum exists, use it for default_status:
-- ALTER TABLE project_templates ALTER COLUMN default_status TYPE project_status USING default_status::project_status;
```

**Rationale:** Separate template tables allow users to create reusable project configurations without affecting actual project data. The structure mirrors the `projects` and `project_items` relationship for consistency. Indexes improve query performance for template lookups and item associations.

## Data Integrity Rules

1. **Template Items:** Foreign key constraints ensure template items reference valid templates and items
2. **Cascade Delete:** Deleting a template automatically deletes associated template items
3. **Unique Constraint:** Each item can only appear once per template (enforced by UNIQUE constraint)
4. **Default Status:** Must be a valid project status value

## Performance Considerations

- Indexes on foreign keys support efficient joins
- Index on template name supports search/filtering
- Unique constraint prevents duplicate items in templates
- CASCADE delete ensures data consistency

## Relationship Diagram

```
project_templates (1) ----< (many) project_template_items (many) >---- (1) items
```

Templates can have many items, and items can be in many templates (many-to-many relationship).

