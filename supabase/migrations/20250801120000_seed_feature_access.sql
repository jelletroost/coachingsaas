-- Seed feature_access table with sample data
INSERT INTO feature_access (user_role_id, feature_name, staging_allowed, production_allowed) 
SELECT 
    ur.id,
    feature_name,
    CASE 
        WHEN ur.name = 'admin' THEN true
        WHEN ur.name = 'coach' THEN true
        ELSE false
    END as staging_allowed,
    CASE 
        WHEN ur.name = 'admin' THEN true
        ELSE false
    END as production_allowed
FROM user_roles ur
CROSS JOIN (
    VALUES 
        ('patient_messaging'),
        ('coach_dashboard'),
        ('admin_panel'),
        ('prescription_management'),
        ('intake_forms'),
        ('subscription_management'),
        ('analytics_dashboard'),
        ('notification_system')
) AS features(feature_name)
WHERE ur.name IN ('admin', 'coach', 'patient')
ON CONFLICT DO NOTHING; 