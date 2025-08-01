# Feature Access Environment Testing

## Overview
This document tests the new environment-based feature access logic for the sidebar menu items.

## API Response Structure
The API now returns feature access data in this format:
```json
{
    "featureAccess": [
        {
            "feature_name": "coach_overview",
            "staging_allowed": false,
            "production_allowed": false
        },
        {
            "feature_name": "coach_patients",
            "staging_allowed": false,
            "production_allowed": false
        },
        {
            "feature_name": "coach_products",
            "staging_allowed": false,
            "production_allowed": false
        },
        {
            "feature_name": "coach_messages",
            "staging_allowed": false,
            "production_allowed": false
        },
        {
            "feature_name": "coach_orders",
            "staging_allowed": false,
            "production_allowed": false
        },
        {
            "feature_name": "coach_settings",
            "staging_allowed": false,
            "production_allowed": false
        }
    ]
}
```

## Environment Logic
The sidebar now checks the `NEXT_PUBLIC_SITE_URL` environment variable:

1. **Staging/Dev Environment**: 
   - URLs containing `staging.example.com` or `dev.example.com`
   - Uses `staging_allowed` field to determine feature visibility

2. **Production Environment**:
   - URLs containing `example.com` (but not staging/dev)
   - Uses `production_allowed` field to determine feature visibility

3. **Unknown Environment**:
   - Defaults to `false` for all features

## Test Cases

### Test Case 1: Staging Environment
- `NEXT_PUBLIC_SITE_URL`: `https://staging.example.com`
- Expected behavior: Features are shown based on `staging_allowed` field
- If `staging_allowed: false` for all features → No coach menu items shown

### Test Case 2: Dev Environment
- `NEXT_PUBLIC_SITE_URL`: `https://dev.example.com`
- Expected behavior: Features are shown based on `staging_allowed` field
- If `staging_allowed: false` for all features → No coach menu items shown

### Test Case 3: Production Environment
- `NEXT_PUBLIC_SITE_URL`: `https://example.com`
- Expected behavior: Features are shown based on `production_allowed` field
- If `production_allowed: false` for all features → No coach menu items shown

### Test Case 4: Mixed Permissions
```json
{
    "featureAccess": [
        {
            "feature_name": "coach_overview",
            "staging_allowed": true,
            "production_allowed": false
        },
        {
            "feature_name": "coach_patients",
            "staging_allowed": false,
            "production_allowed": true
        }
    ]
}
```

- **Staging**: Only "Overview" menu item shown
- **Production**: Only "Patients" menu item shown

## Implementation Details

### Updated Files:
1. `services/feature_flag_services.ts` - Added new interfaces for API response
2. `hooks/useFeatureFlags.ts` - Added environment-based feature access logic
3. `lib/config/sidebar.config.ts` - Updated to use new feature access logic

### Key Functions:
- `isFeatureEnabled(featureName: string)` - Checks if a feature is enabled based on environment
- `getEnabledFeatures()` - Returns array of enabled feature names
- `filterItemsByFeatures()` - Filters sidebar items based on feature access

## Testing Instructions

1. Set different `NEXT_PUBLIC_SITE_URL` values in your environment
2. Check that coach sidebar menu items appear/disappear based on the environment
3. Verify that the correct permission field (`staging_allowed` vs `production_allowed`) is being used
4. Test with different API response configurations 