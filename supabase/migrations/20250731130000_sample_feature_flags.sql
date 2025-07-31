-- Migration: 20250731130000_sample_feature_flags.sql
-- Description: Add sample feature flags for testing
-- Date: 2025-07-31

-- Insert sample feature flags
INSERT INTO feature_flags (name, description) VALUES
    ('advanced_analytics', 'Enable advanced analytics dashboard for coaches and admins'),
    ('patient_messaging', 'Enable direct messaging between patients and coaches'),
    ('prescription_management', 'Enable prescription management system for coaches'),
    ('subscription_tiers', 'Enable multiple subscription tiers and pricing plans'),
    ('mobile_app', 'Enable mobile app features and notifications'),
    ('ai_coaching', 'Enable AI-powered coaching recommendations'),
    ('video_consultations', 'Enable video consultation scheduling and management'),
    ('health_tracking', 'Enable health metrics tracking and visualization')
ON CONFLICT (name) DO NOTHING;

-- Get the feature flag IDs and role IDs for creating access records
DO $$
DECLARE
    flag_id UUID;
    admin_role_id UUID;
    coach_role_id UUID;
    patient_role_id UUID;
    env_id UUID;
BEGIN
    -- Get environment ID
    SELECT id INTO env_id FROM environments WHERE name = 'staging';
    
    -- Get role IDs
    SELECT id INTO admin_role_id FROM user_roles WHERE name = 'admin';
    SELECT id INTO coach_role_id FROM user_roles WHERE name = 'coach';
    SELECT id INTO patient_role_id FROM user_roles WHERE name = 'patient';
    
    -- Create access records for each feature flag
    FOR flag_id IN SELECT id FROM feature_flags LOOP
        -- Admin access (all features enabled)
        INSERT INTO feature_flag_access (feature_flag_id, user_role_id, environment_id, enabled)
        VALUES (flag_id, admin_role_id, env_id, true)
        ON CONFLICT (feature_flag_id, user_role_id, environment_id) DO NOTHING;
        
        -- Coach access (most features enabled)
        INSERT INTO feature_flag_access (feature_flag_id, user_role_id, environment_id, enabled)
        VALUES (flag_id, coach_role_id, env_id, true)
        ON CONFLICT (feature_flag_id, user_role_id, environment_id) DO NOTHING;
        
        -- Patient access (limited features)
        INSERT INTO feature_flag_access (feature_flag_id, user_role_id, environment_id, enabled)
        VALUES (flag_id, patient_role_id, env_id, 
            CASE 
                WHEN flag_id IN (SELECT id FROM feature_flags WHERE name IN ('patient_messaging', 'health_tracking', 'mobile_app')) 
                THEN true 
                ELSE false 
            END)
        ON CONFLICT (feature_flag_id, user_role_id, environment_id) DO NOTHING;
    END LOOP;
END $$; 