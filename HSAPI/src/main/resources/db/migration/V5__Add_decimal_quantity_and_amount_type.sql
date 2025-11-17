-- Change quantity columns to DECIMAL(10,2) to support decimal values
-- Add amount_type enum and column to items table

-- Create enum type for amount_type
CREATE TYPE amount_type AS ENUM ('PERCENT', 'COUNT', 'VOLUME');

-- Alter items table: change quantity to DECIMAL and add amount_type
ALTER TABLE items
  ALTER COLUMN quantity TYPE DECIMAL(10, 2) USING quantity::DECIMAL(10, 2),
  ALTER COLUMN min_quantity TYPE DECIMAL(10, 2) USING min_quantity::DECIMAL(10, 2),
  ADD COLUMN amount_type amount_type NOT NULL DEFAULT 'COUNT';

-- Alter project_items table: change quantity_used to DECIMAL
ALTER TABLE project_items
  ALTER COLUMN quantity_used TYPE DECIMAL(10, 2) USING quantity_used::DECIMAL(10, 2);

