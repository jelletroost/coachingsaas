-- Migration: 20250731131000_add_staging_environment.sql
-- Description: Add staging environment and ensure all required data exists
-- Date: 2025-07-31

-- Insert staging environment
INSERT INTO environments (name) VALUES ('staging')
ON CONFLICT (name) DO NOTHING;

-- Ensure all required roles exist
INSERT INTO user_roles (name, description) VALUES
    ('patient', 'Regular patient user'),
    ('coach', 'Health coach user'),
    ('admin', 'Administrator user'),
    ('super_admin', 'Super Administrator user')
ON CONFLICT (name) DO NOTHING; 