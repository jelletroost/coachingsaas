-- Migration: 20250731093454_update_role_field.sql
-- Description: Move users role field from user_role enum to user_roles table reference
-- Date: 2025-07-31

-- Step 1: Insert default roles into user_roles table
INSERT INTO user_roles (name, description) VALUES
    ('patient', 'Regular patient user'),
    ('coach', 'Health coach user'),
    ('admin', 'Administrator user'),
    ('super_admin', 'Super Administrator user')
ON CONFLICT (name) DO NOTHING;

-- Step 2: Add role_id column to users table
ALTER TABLE users ADD COLUMN role_id UUID REFERENCES user_roles(id);

-- Step 3: Update role_id based on existing role enum values
UPDATE users SET role_id = (SELECT id FROM user_roles WHERE name = role::text);

-- Step 4: Make role_id NOT NULL after data migration
ALTER TABLE users ALTER COLUMN role_id SET NOT NULL;

-- Step 5: Drop the old role column
ALTER TABLE users DROP COLUMN role;

-- Step 6: Drop the user_role enum type
DROP TYPE user_role;

-- Step 7: Update the index to use role_id instead of role
DROP INDEX IF EXISTS idx_users_role;
CREATE INDEX idx_users_role_id ON users(role_id);
