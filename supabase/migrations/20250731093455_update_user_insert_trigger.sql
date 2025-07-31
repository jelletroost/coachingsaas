-- Migration: 20250731093455_update_user_insert_trigger.sql
-- Description: Update user insert trigger to work with new role_id field
-- Date: 2025-07-31

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS create_patient_on_user_insert ON users;
DROP FUNCTION IF EXISTS on_user_insert();

-- Recreate the function with the correct role_id reference
CREATE OR REPLACE FUNCTION on_user_insert()
RETURNS TRIGGER AS $$
DECLARE
   role_name text;
BEGIN
   -- Get the role name from user_roles table
   SELECT name INTO role_name FROM user_roles WHERE id = NEW.role_id;
   
   IF role_name = 'patient' THEN
      INSERT INTO patients (user_id) VALUES (NEW.id);
   ELSIF role_name = 'coach' THEN
      INSERT INTO coaches (user_id) VALUES (NEW.id);
   END IF;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger
CREATE TRIGGER create_patient_on_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION on_user_insert(); 