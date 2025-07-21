-- Test and fix the signup functions
-- Drop and recreate the functions with better error handling

DROP FUNCTION IF EXISTS create_user_profile_during_signup(UUID, user_role, VARCHAR, VARCHAR, VARCHAR, VARCHAR, DATE);
DROP FUNCTION IF EXISTS create_patient_profile_during_signup(UUID, TEXT);
DROP FUNCTION IF EXISTS create_coach_profile_during_signup(UUID, coach_specialization, experience_level, VARCHAR, TEXT);

-- Recreate with better error handling
CREATE OR REPLACE FUNCTION create_user_profile_during_signup(
    p_user_id UUID,
    p_role user_role,
    p_first_name VARCHAR,
    p_last_name VARCHAR,
    p_email VARCHAR,
    p_phone VARCHAR DEFAULT NULL,
    p_date_of_birth DATE DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    profile_id UUID;
BEGIN
    -- Check if profile already exists
    IF EXISTS (SELECT 1 FROM user_profiles WHERE user_id = p_user_id) THEN
        RAISE EXCEPTION 'User profile already exists for user %', p_user_id;
    END IF;
    
    -- Insert user profile with elevated privileges
    INSERT INTO user_profiles (
        user_id,
        role,
        first_name,
        last_name,
        email,
        phone,
        date_of_birth,
        account_status,
        email_verified
    ) VALUES (
        p_user_id,
        p_role,
        p_first_name,
        p_last_name,
        p_email,
        p_phone,
        p_date_of_birth,
        'pending',
        false
    ) RETURNING id INTO profile_id;
    
    RETURN profile_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'User profile already exists';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to create user profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to handle patient profile creation
CREATE OR REPLACE FUNCTION create_patient_profile_during_signup(
    p_user_profile_id UUID,
    p_health_conditions TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    patient_profile_id UUID;
BEGIN
    -- Check if patient profile already exists
    IF EXISTS (SELECT 1 FROM patient_profiles WHERE user_profile_id = p_user_profile_id) THEN
        RAISE EXCEPTION 'Patient profile already exists for user profile %', p_user_profile_id;
    END IF;
    
    -- Insert patient profile with elevated privileges
    INSERT INTO patient_profiles (
        user_profile_id,
        health_conditions,
        preferred_language,
        timezone
    ) VALUES (
        p_user_profile_id,
        p_health_conditions,
        'en',
        'UTC'
    ) RETURNING id INTO patient_profile_id;
    
    RETURN patient_profile_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Patient profile already exists';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to create patient profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to handle coach profile creation
CREATE OR REPLACE FUNCTION create_coach_profile_during_signup(
    p_user_profile_id UUID,
    p_specialization coach_specialization,
    p_experience_level experience_level,
    p_license_number VARCHAR,
    p_bio TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    coach_profile_id UUID;
BEGIN
    -- Check if coach profile already exists
    IF EXISTS (SELECT 1 FROM coach_profiles WHERE user_profile_id = p_user_profile_id) THEN
        RAISE EXCEPTION 'Coach profile already exists for user profile %', p_user_profile_id;
    END IF;
    
    -- Insert coach profile with elevated privileges
    INSERT INTO coach_profiles (
        user_profile_id,
        specialization,
        experience_level,
        license_number,
        bio,
        languages_spoken,
        timezone,
        is_verified
    ) VALUES (
        p_user_profile_id,
        p_specialization,
        p_experience_level,
        p_license_number,
        p_bio,
        ARRAY['en'],
        'UTC',
        false
    ) RETURNING id INTO coach_profile_id;
    
    RETURN coach_profile_id;
EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'Coach profile already exists';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to create coach profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
