-- Additional database initialization if needed
-- This file is executed when the PostgreSQL container starts for the first time
-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET
  timezone = 'UTC';