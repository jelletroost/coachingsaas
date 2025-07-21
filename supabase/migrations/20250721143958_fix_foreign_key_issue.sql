-- Fix the foreign key constraint issue
-- The problem is that user_profiles.user_id references auth.users.id
-- But during signup, there might be a timing issue

-- First, let's check the current foreign key constraint
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='user_profiles';

-- The foreign key constraint is correct, but we need to ensure the user exists
-- Let's modify the function to check if the user exists in auth.users first
DROP FUNCTION IF EXISTS create_user_profile_during_signup(UUID, user_role, VARCHAR, VARCHAR, VARCHAR, VARCHAR, DATE);

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
    -- Check if user exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) THEN
        RAISE EXCEPTION 'User with ID % does not exist in auth.users', p_user_id;
    END IF;
    
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
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'User does not exist in auth.users table';
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to create user profile: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
