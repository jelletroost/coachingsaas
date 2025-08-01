# Feature Flag System Test Guide

## Prerequisites

1. Ensure all migrations have been run:
   - `20250731084652_user_role.sql`
   - `20250731074831_feature_flag.sql`
   - `20250731123816_flag_enable.sql`
   - `20250731124201_flag_enable_true.sql`
   - `20250731130000_sample_feature_flags.sql`
   - `20250731131000_add_staging_environment.sql`

2. Ensure you have a user with `super_admin` role

## Testing Steps

### 1. Access Feature Flag Management

1. Login as a super admin user
2. Navigate to `/admin/feature-flags` or go to Admin Settings → Feature Flags tab
3. Verify you can see the feature flag management interface

### 2. Test Feature Flag Toggle

1. Find a feature flag (e.g., "advanced_analytics")
2. Toggle the switch for "Coach" role from enabled to disabled
3. Verify the change is saved successfully
4. Toggle it back to enabled
5. Verify the change is saved successfully

### 3. Test Role-Based Access

1. Login as a coach user
2. Navigate to `/coach/overview`
3. Verify that features are shown/hidden based on the feature flag settings
4. Login as a patient user
5. Navigate to `/dashboard`
6. Verify that features are shown/hidden based on the feature flag settings

### 4. Test API Endpoints

#### Get All Feature Flags (Super Admin)
```bash
curl -X GET "http://localhost:54321/functions/v1/feature-flags/get-all-feature-flags?userRole=super_admin" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Feature Flag (Super Admin)
```bash
curl -X POST "http://localhost:54321/functions/v1/feature-flags/update-feature-flag?userRole=super_admin" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "featureFlagId": "FLAG_UUID",
    "roleName": "coach",
    "enabled": false
  }'
```

## Expected Behavior

### Super Admin
- Can access feature flag management
- Can toggle features for any role
- Can see all feature flags with their current status

### Admin
- Cannot access feature flag management
- Can access other admin features

### Coach
- Cannot access feature flag management
- Can see features based on feature flag settings

### Patient
- Cannot access feature flag management
- Can see features based on feature flag settings

## Troubleshooting

### Error: "invalid input syntax for type uuid: \"coach\""
- **Cause**: The API was expecting a UUID but received a role name
- **Fix**: Updated the API to accept role names and convert them to UUIDs internally

### Error: "Role not found"
- **Cause**: The role doesn't exist in the user_roles table
- **Fix**: Ensure the migration `20250731131000_add_staging_environment.sql` has been run

### Error: "Environment not found"
- **Cause**: The staging environment doesn't exist
- **Fix**: Ensure the migration `20250731131000_add_staging_environment.sql` has been run

### Feature flags not showing
- **Cause**: No feature flags exist in the database
- **Fix**: Ensure the migration `20250731130000_sample_feature_flags.sql` has been run

## Sample Feature Flags

The system includes these sample feature flags:

1. `advanced_analytics` - Advanced analytics dashboard
2. `patient_messaging` - Direct messaging between patients and coaches
3. `prescription_management` - Prescription management system
4. `subscription_tiers` - Multiple subscription tiers
5. `mobile_app` - Mobile app features
6. `ai_coaching` - AI-powered coaching recommendations
7. `video_consultations` - Video consultation scheduling
8. `health_tracking` - Health metrics tracking

## Default Access Patterns

- **Admin**: All features enabled
- **Coach**: All features enabled
- **Patient**: Only `patient_messaging`, `health_tracking`, and `mobile_app` enabled 