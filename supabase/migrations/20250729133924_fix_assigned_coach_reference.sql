-- Drop the existing foreign key constraint
ALTER TABLE patients DROP CONSTRAINT IF EXISTS patients_assigned_coach_id_fkey;

-- Add the new foreign key constraint referencing coaches table
ALTER TABLE patients 
ADD CONSTRAINT patients_assigned_coach_id_fkey 
FOREIGN KEY (assigned_coach_id) REFERENCES coaches(id);
