# Admin Settings Components

This directory contains the components for the admin settings dashboard.

## Components

### AdminSettings

The main settings dashboard component that orchestrates all settings functionality.

**Features:**

-  Overview cards showing system status, security, notifications, and integrations
-  Tabbed interface for different setting categories
-  Global save functionality
-  Real-time settings preview

### SystemSettings

Manages general system configuration and site information.

**Settings:**

-  Site name and description
-  Contact information
-  Timezone and regional settings
-  Date format and currency
-  Maintenance mode toggle
-  Registration and email verification settings

### SecuritySettings

Handles security and authentication configuration.

**Settings:**

-  Two-factor authentication
-  Session timeout management
-  Password policy configuration
-  Login attempt limits
-  IP whitelist management
-  Allowed domains configuration

### NotificationSettings

Manages notification preferences and delivery methods.

**Settings:**

-  Email notification preferences
-  SMS notification settings
-  Push notification configuration
-  Automated report scheduling
-  Alert type management

### IntegrationSettings

Configures third-party service integrations.

**Settings:**

-  Stripe payment integration
-  Email provider configuration (SendGrid, Mailgun, SMTP)
-  SMS provider setup (Twilio, AWS SNS)
-  API key management
-  Integration testing

## Data Structure

### SystemSettings Interface

```typescript
interface SystemSettings {
   siteName: string;
   siteDescription: string;
   contactEmail: string;
   supportPhone: string;
   timezone: string;
   dateFormat: string;
   currency: string;
   maintenanceMode: boolean;
   allowRegistration: boolean;
   requireEmailVerification: boolean;
}
```

### SecuritySettings Interface

```typescript
interface SecuritySettings {
   twoFactorAuth: boolean;
   sessionTimeout: number;
   passwordMinLength: number;
   requireSpecialChars: boolean;
   maxLoginAttempts: number;
   lockoutDuration: number;
   ipWhitelist: string[];
   allowedDomains: string[];
}
```

### NotificationSettings Interface

```typescript
interface NotificationSettings {
   emailNotifications: boolean;
   smsNotifications: boolean;
   pushNotifications: boolean;
   newUserAlerts: boolean;
   paymentAlerts: boolean;
   systemAlerts: boolean;
   marketingEmails: boolean;
   weeklyReports: boolean;
   monthlyReports: boolean;
}
```

### IntegrationSettings Interface

```typescript
interface IntegrationSettings {
   stripeEnabled: boolean;
   stripePublishableKey: string;
   stripeSecretKey: string;
   emailProvider: "sendgrid" | "mailgun" | "smtp";
   emailApiKey: string;
   emailFromAddress: string;
   smsProvider: "twilio" | "aws-sns";
   smsApiKey: string;
   smsFromNumber: string;
}
```

## Usage

```tsx
import { AdminSettings } from "@/components/admin/settings";

export default function AdminSettingsPage() {
   return <AdminSettings />;
}
```

## Features

### Overview Dashboard

-  Real-time status indicators for all major systems
-  Quick access to critical settings
-  Visual feedback on configuration status

### Tabbed Interface

-  Organized settings by category
-  Clean, intuitive navigation
-  Responsive design for all screen sizes

### Form Validation

-  Input validation for all fields
-  Error handling and user feedback
-  Secure handling of sensitive data

### Integration Testing

-  Test buttons for all integrations
-  Connection status indicators
-  Error reporting for failed connections

## Security Considerations

-  API keys are masked in password fields
-  Sensitive data is not logged or stored in plain text
-  All form submissions are validated
-  CSRF protection for all settings updates

## Mock Data

The components use mock data for demonstration purposes. In a real application, you would:

1. Replace mock data with API calls to your backend
2. Implement proper error handling and loading states
3. Add real-time validation
4. Implement proper security measures
5. Add audit logging for settings changes
6. Implement role-based access control

## Styling

All components use Tailwind CSS classes and follow the existing design system with:

-  Consistent color schemes and spacing
-  Responsive design patterns
-  Accessible form controls
-  Modern UI components
-  Clear visual hierarchy
