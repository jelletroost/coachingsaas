-- Test the signup functions to ensure they work correctly
-- This will help identify any issues with the functions

-- Test user profile creation function
DO $$
DECLARE
    test_user_id UUID := '00000000-0000-0000-0000-000000000001';
    profile_id UUID;
BEGIN
    -- Clean up any existing test data
    DELETE FROM user_profiles WHERE user_id = test_user_id;
    
    -- Test the function
    SELECT create_user_profile_during_signup(
        test_user_id,
        'patient'::user_role,
        'Test',
        'User',
        'test@example.com',
        '+1234567890',
        '1990-01-01'::DATE
    ) INTO profile_id;
    
    RAISE NOTICE 'User profile created with ID: %', profile_id;
    
    -- Clean up
    DELETE FROM user_profiles WHERE user_id = test_user_id;
    
    RAISE NOTICE 'Test completed successfully';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Test failed: %', SQLERRM;
END $$;
