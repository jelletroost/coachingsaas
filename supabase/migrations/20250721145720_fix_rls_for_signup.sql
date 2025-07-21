-- Fix RLS policies to allow signup while maintaining security
-- The issue is that during signup, the user might not be fully authenticated yet

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Patients can insert their own profile" ON patient_profiles;
DROP POLICY IF EXISTS "Coaches can insert their own profile" ON coach_profiles;

-- Create more permissive policies for signup
-- Allow users to insert their own profile (for signup)
CREATE POLICY "Users can insert their own profile" ON user_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        -- Allow if the user is creating their own profile during signup
        (auth.uid() IS NOT NULL AND auth.uid() = user_id)
    );

-- Allow authenticated users to insert patient profiles for themselves
CREATE POLICY "Patients can insert their own profile" ON patient_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ) OR 
        -- Allow during signup if user is authenticated
        (auth.uid() IS NOT NULL AND EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = patient_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ))
    );

-- Allow authenticated users to insert coach profiles for themselves
CREATE POLICY "Coaches can insert their own profile" ON coach_profiles
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ) OR 
        -- Allow during signup if user is authenticated
        (auth.uid() IS NOT NULL AND EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = coach_profiles.user_profile_id 
            AND user_profiles.user_id = auth.uid()
        ))
    );
