-- Re-enable RLS with proper policies that allow signup
-- First, re-enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_profiles ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Authenticated users can create profiles" ON user_profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON user_profiles;

DROP POLICY IF EXISTS "Patients can view their own profile" ON patient_profiles;
DROP POLICY IF EXISTS "Patients can update their own profile" ON patient_profiles;
DROP POLICY IF EXISTS "Patients can insert their own profile" ON patient_profiles;
DROP POLICY IF EXISTS "Service role can manage all patient profiles" ON patient_profiles;

DROP POLICY IF EXISTS "Coaches can view their own profile" ON coach_profiles;
DROP POLICY IF EXISTS "Coaches can update their own profile" ON coach_profiles;
DROP POLICY IF EXISTS "Coaches can insert their own profile" ON coach_profiles;
DROP POLICY IF EXISTS "Anyone can view public coach profiles" ON coach_profiles;
DROP POLICY IF EXISTS "Service role can manage all coach profiles" ON coach_profiles;

-- Create new policies that work with the signup flow
-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Patient profiles policies
CREATE POLICY "Patients can view their own profile" ON patient_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Patients can update their own profile" ON patient_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Patients can insert their own profile" ON patient_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        )
    );

-- Coach profiles policies
CREATE POLICY "Coaches can view their own profile" ON coach_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Coaches can update their own profile" ON coach_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        )
    );

CREATE POLICY "Coaches can insert their own profile" ON coach_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        )
    );

-- Public read access for verified coach profiles
CREATE POLICY "Anyone can view public coach profiles" ON coach_profiles
    FOR SELECT USING (is_verified = true);

-- Remove the temporary comments
COMMENT ON TABLE user_profiles IS NULL;
COMMENT ON TABLE patient_profiles IS NULL;
COMMENT ON TABLE coach_profiles IS NULL;
