-- Improve RLS policies for signup flow
-- The issue is that during signup, the user might not be fully authenticated
-- So we need to allow profile creation for the user being created

-- Drop and recreate user profiles insert policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;

-- Allow users to insert their own profile during signup
-- This policy allows insertion when the user_id matches the authenticated user
-- OR when there's no authenticated user (for initial signup)
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        auth.uid() IS NULL OR
        -- Allow if the user is creating their own profile
        (auth.uid() IS NOT NULL AND auth.uid() = user_id)
    );

-- Also allow authenticated users to create profiles for themselves
-- This handles the case where the user is authenticated but creating their profile
CREATE POLICY "Authenticated users can create profiles" ON user_profiles
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND auth.uid() = user_id
    );

-- For patient and coach profiles, we need to be more permissive during signup
DROP POLICY IF EXISTS "Patients can insert their own profile" ON patient_profiles;
DROP POLICY IF EXISTS "Coaches can insert their own profile" ON coach_profiles;

-- Allow patient profile creation for authenticated users
CREATE POLICY "Patients can insert their own profile" ON patient_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ) OR auth.uid() IS NULL
    );

-- Allow coach profile creation for authenticated users
CREATE POLICY "Coaches can insert their own profile" ON coach_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ) OR auth.uid() IS NULL
    );
