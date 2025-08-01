-- Add sample feature access data for patient and admin roles
INSERT INTO feature_access (user_role_id, feature_name, staging_allowed, production_allowed) 
SELECT 
    ur.id,
    feature_name,
    CASE 
        WHEN ur.name = 'admin' THEN true
        WHEN ur.name = 'patient' THEN false
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
        ('patient_orders'),
        ('patient_overview'),
        ('patient_profile'),
        ('patient_program'),
        ('patient_subscriptions'),
        ('admin_users'),
        ('admin_orders'),
        ('admin_subscriptions'),
        ('admin_analytics'),
        ('admin_settings'),
        ('admin_cms')
) AS features(feature_name)
WHERE ur.name IN ('admin', 'patient')
ON CONFLICT DO NOTHING; 