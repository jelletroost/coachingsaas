-- Temporarily disable RLS for debugging
-- This will help us identify if RLS is the issue

-- Disable RLS on all tables
ALTER TABLE user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE coach_profiles DISABLE ROW LEVEL SECURITY;

-- Add a comment to remember to re-enable later
COMMENT ON TABLE user_profiles IS 'RLS temporarily disabled for debugging';
COMMENT ON TABLE patient_profiles IS 'RLS temporarily disabled for debugging';
COMMENT ON TABLE coach_profiles IS 'RLS temporarily disabled for debugging';
