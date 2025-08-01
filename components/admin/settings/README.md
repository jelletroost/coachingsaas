# Feature Flag Management System

This system allows super administrators to control feature access for different user roles in the application.

## Overview

The feature flag system provides:
- **Role-based access control**: Enable/disable features for specific user roles (admin, coach, patient)
- **Super admin only access**: Only users with `super_admin` role can manage feature flags
- **Real-time updates**: Changes are immediately reflected across the application
- **Caching**: Uses TanStack Query for efficient data caching and updates

## Components

### FeatureFlagManagement
The main component for managing feature flags. Only accessible to super admins.

**Location**: `components/admin/settings/FeatureFlagManagement.tsx`

**Features**:
- View all feature flags with their current status for each role
- Toggle feature access for specific roles
- Real-time updates with loading states
- Error handling and retry functionality

### FeatureFlag (Utility Component)
A utility component for conditionally rendering content based on feature flags.

**Location**: `components/shared/FeatureFlag.tsx`

**Usage**:
```tsx
import { FeatureFlag } from "@/components/shared/FeatureFlag";

<FeatureFlag flag="advanced_analytics" fallback={<p>Feature not available</p>}>
   <AdvancedAnalyticsDashboard />
</FeatureFlag>
```

### useFeatureFlags Hook
Custom hook for managing feature flags with TanStack Query.

**Location**: `hooks/useFeatureFlags.ts`

**Features**:
- Fetch all feature flags (super admin only)
- Update feature flag status
- Automatic cache invalidation
- Loading and error states

### useFeatureFlag Hook
Utility hook for checking if a specific feature is enabled for the current user.

**Location**: `hooks/useFeatureFlags.ts`

**Usage**:
```tsx
import { useFeatureFlag } from "@/hooks/useFeatureFlags";

const { isEnabled } = useFeatureFlag("advanced_analytics");
```

## API Endpoints

### Get Feature Flags (Role-based)
- **Endpoint**: `GET /feature-flags/get-feature-flags?userRole={role}`
- **Description**: Get feature flags accessible to the specified role
- **Access**: All authenticated users

### Get All Feature Flags (Super Admin)
- **Endpoint**: `GET /feature-flags/get-all-feature-flags?userRole=super_admin`
- **Description**: Get all feature flags with access status for each role
- **Access**: Super admin only

### Update Feature Flag
- **Endpoint**: `POST /feature-flags/update-feature-flag?userRole=super_admin`
- **Body**: `{ featureFlagId: string, roleId: string, enabled: boolean }`
- **Description**: Update feature flag access for a specific role
- **Access**: Super admin only

## Database Schema

### feature_flags
- `id`: UUID (Primary Key)
- `name`: Text (Feature flag identifier)
- `description`: Text (Human-readable description)
- `created_at`: Timestamp
- `updated_at`: Timestamp

### feature_flag_access
- `id`: UUID (Primary Key)
- `feature_flag_id`: UUID (Foreign Key to feature_flags)
- `user_role_id`: UUID (Foreign Key to user_roles)
- `environment_id`: UUID (Foreign Key to environments)
- `enabled`: Boolean (Whether the feature is enabled for this role)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Sample Feature Flags

The system includes several sample feature flags for testing:

1. **advanced_analytics**: Advanced analytics dashboard
2. **patient_messaging**: Direct messaging between patients and coaches
3. **prescription_management**: Prescription management system
4. **subscription_tiers**: Multiple subscription tiers
5. **mobile_app**: Mobile app features
6. **ai_coaching**: AI-powered coaching recommendations
7. **video_consultations**: Video consultation scheduling
8. **health_tracking**: Health metrics tracking

## Usage Examples

### Protecting a Feature
```tsx
import { FeatureFlag } from "@/components/shared/FeatureFlag";

function CoachDashboard() {
   return (
      <div>
         <h1>Coach Dashboard</h1>
         
         <FeatureFlag flag="advanced_analytics">
            <AdvancedAnalytics />
         </FeatureFlag>
         
         <FeatureFlag flag="prescription_management">
            <PrescriptionManager />
         </FeatureFlag>
      </div>
   );
}
```

### Conditional Rendering with Hook
```tsx
import { useFeatureFlag } from "@/hooks/useFeatureFlags";

function Navigation() {
   const isMessagingEnabled = useFeatureFlag("patient_messaging");
   
   return (
      <nav>
         <a href="/dashboard">Dashboard</a>
         {isMessagingEnabled && <a href="/messages">Messages</a>}
      </nav>
   );
}
```

### Checking Feature Status in Logic
```tsx
import { useFeatureFlag } from "@/hooks/useFeatureFlags";

function handleAction() {
   const { isEnabled } = useFeatureFlag("ai_coaching");
   
   if (isEnabled) {
      // Execute AI coaching logic
      executeAICoaching();
   } else {
      // Fallback to manual coaching
      executeManualCoaching();
   }
}
```

## Security Considerations

1. **Role-based access**: Only super admins can modify feature flags
2. **Environment isolation**: Feature flags are environment-specific
3. **Audit trail**: All changes are timestamped
4. **Validation**: Input validation on all API endpoints

## Best Practices

1. **Use descriptive names**: Feature flag names should clearly indicate their purpose
2. **Provide fallbacks**: Always provide fallback content when using FeatureFlag component
3. **Test thoroughly**: Test both enabled and disabled states
4. **Monitor usage**: Track which features are most commonly used
5. **Clean up**: Remove feature flags once features are fully rolled out

## Troubleshooting

### Feature Flag Not Working
1. Check if the user has the correct role
2. Verify the feature flag name is correct
3. Ensure the feature flag is enabled for the user's role
4. Check the browser console for any errors

### Super Admin Cannot Access Management
1. Verify the user has `super_admin` role
2. Check if the user is properly authenticated
3. Ensure the API endpoints are accessible

### Changes Not Reflecting
1. Check if TanStack Query cache needs invalidation
2. Verify the API call was successful
3. Check browser network tab for errors
