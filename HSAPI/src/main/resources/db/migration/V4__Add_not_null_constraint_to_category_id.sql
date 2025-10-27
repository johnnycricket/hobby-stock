-- Add NOT NULL constraint to category_id column
-- This ensures the column cannot accept null values
alter TABLE items
alter column category_id
set
  not null;