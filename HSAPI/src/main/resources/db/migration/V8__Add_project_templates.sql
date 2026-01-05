-- Create project_templates table
CREATE TABLE project_templates (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  default_status project_status NOT NULL DEFAULT 'PLANNING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create project_template_items table (many-to-many relationship)
CREATE TABLE project_template_items (
  id BIGSERIAL PRIMARY KEY,
  template_id BIGINT NOT NULL REFERENCES project_templates(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  quantity_used DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (template_id, item_id)
);

-- Create indexes for better performance
CREATE INDEX idx_template_items_template_id ON project_template_items(template_id);
CREATE INDEX idx_template_items_item_id ON project_template_items(item_id);
CREATE INDEX idx_templates_name ON project_templates(name);



