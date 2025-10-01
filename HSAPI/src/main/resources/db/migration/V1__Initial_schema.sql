-- Initial database schema for Hobby Stock
-- Create categories table
CREATE TABLE
  categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- Create items table
CREATE TABLE
  items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT REFERENCES categories (id),
    quantity INTEGER NOT NULL DEFAULT 0,
    min_quantity INTEGER DEFAULT 0,
    unit_price DECIMAL(10, 2),
    location VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- Create projects table
CREATE TABLE
  projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- Create project_items table (many-to-many relationship)
CREATE TABLE
  project_items (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects (id) ON DELETE CASCADE,
    item_id BIGINT REFERENCES items (id) ON DELETE CASCADE,
    quantity_used INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (project_id, item_id)
  );

-- Create indexes for better performance
CREATE INDEX idx_items_category_id ON items (category_id);

CREATE INDEX idx_items_name ON items (name);

CREATE INDEX idx_project_items_project_id ON project_items (project_id);

CREATE INDEX idx_project_items_item_id ON project_items (item_id);

-- Insert some sample data
INSERT INTO
  categories (name, description)
VALUES
  (
    'Electronics',
    'Electronic components and devices'
  ),
  ('Tools', 'Hand tools and power tools'),
  ('Materials', 'Raw materials and supplies'),
  ('Books', 'Reference books and manuals');

INSERT INTO
  items (
    name,
    description,
    category_id,
    quantity,
    min_quantity,
    unit_price,
    location
  )
VALUES
  (
    'Arduino Uno',
    'Microcontroller board for prototyping',
    1,
    5,
    2,
    25.99,
    'Electronics Shelf A'
  ),
  (
    'Soldering Iron',
    '60W temperature controlled soldering iron',
    2,
    2,
    1,
    45.00,
    'Tool Box'
  ),
  (
    'Breadboard',
    'Half-size breadboard for prototyping',
    1,
    10,
    5,
    8.50,
    'Electronics Shelf B'
  ),
  (
    'Multimeter',
    'Digital multimeter for electrical testing',
    2,
    1,
    1,
    35.00,
    'Tool Box'
  ),
  (
    'Resistor Kit',
    'Assorted resistor values',
    1,
    1,
    1,
    15.99,
    'Electronics Shelf A'
  );

INSERT INTO
  projects (name, description, status)
VALUES
  (
    'LED Strip Controller',
    'Arduino-based LED strip controller project',
    'ACTIVE'
  ),
  (
    'Weather Station',
    'IoT weather monitoring station',
    'PLANNING'
  );