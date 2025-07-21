-- Fix RLS policies to allow proper signup flow
-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Patients can insert their own profile" ON patient_profiles;
DROP POLICY IF EXISTS "Coaches can insert their own profile" ON coach_profiles;

-- Create more permissive policies for signup
-- Allow users to insert their own profile (for signup)
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        auth.uid() IS NULL
    );

-- Allow authenticated users to insert patient profiles for themselves
CREATE POLICY "Patients can insert their own profile" ON patient_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ) OR auth.uid() IS NULL
    );

-- Allow authenticated users to insert coach profiles for themselves
CREATE POLICY "Coaches can insert their own profile" ON coach_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ) OR auth.uid() IS NULL
    );

-- Also add a policy to allow service role to bypass RLS for signup
CREATE POLICY "Service role can manage all profiles" ON user_profiles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all patient profiles" ON patient_profiles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all coach profiles" ON coach_profiles
    FOR ALL USING (auth.role() = 'service_role');
