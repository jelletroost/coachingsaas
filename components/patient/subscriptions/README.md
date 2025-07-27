# Patient Subscription Management Components

This directory contains components for managing patient subscriptions, billing, and plan management in the health coaching platform.

## Components

### Core Components

-  **SubscriptionManagement** - Main subscription management interface
-  **mockData** - Subscription, billing, and plan data

## Usage

```tsx
import { SubscriptionManagement } from "@/components/patient/subscriptions/SubscriptionManagement";

export default function PatientSubscriptionsPage() {
   return (
      <div className="p-6">
         <SubscriptionManagement />
      </div>
   );
}
```

## Features

### Current Subscription Overview

-  **Plan Details** - Current plan information with pricing and features
-  **Billing Information** - Next billing date and payment method
-  **Usage Tracking** - Monthly usage statistics and limits
-  **Quick Actions** - Change plan, billing settings, view details

### Billing Management

-  **Billing History** - Complete invoice history with download options
-  **Payment Methods** - Manage payment methods and billing preferences
-  **Invoice Downloads** - Download PDF invoices for all transactions
-  **Payment Status** - Track payment status and due dates

### Plan Management

-  **Available Plans** - Compare different subscription tiers
-  **Plan Features** - Detailed feature comparison
-  **Plan Switching** - Easy plan upgrades and downgrades
-  **Recommendations** - Suggested plans based on usage

### Usage Analytics

-  **Session Tracking** - Monitor coaching session usage
-  **Resource Usage** - Track downloaded resources and materials
-  **Usage History** - Detailed usage logs and patterns
-  **Progress Indicators** - Visual usage progress bars

## Data Structure

### Subscription Data

```typescript
interface Subscription {
   id: string;
   status: "active" | "cancelled" | "past_due" | "incomplete";
   plan: {
      id: string;
      name: string;
      description: string;
      price: number;
      features: {
         coachingSessions: number;
         resources: string;
         support: string;
         assessments: string;
         progressTracking: boolean;
         mealPlans: boolean;
         workoutPlans: boolean;
      };
   };
   nextBillingDate: string;
   billingCycle: string;
   startDate: string;
   paymentMethod: {
      id: string;
      type: string;
      brand: string;
      last4: string;
      expiryMonth: string;
      expiryYear: string;
   };
   usage: {
      sessionsUsed: number;
      resourcesDownloaded: number;
      sessionHistory: SessionHistory[];
      resourceHistory: ResourceHistory[];
   };
}
```

### Billing History

```typescript
interface BillingHistory {
   id: string;
   description: string;
   date: string;
   amount: number;
   status: "paid" | "pending" | "failed";
   invoiceUrl: string;
}
```

### Plan Features

```typescript
interface PlanFeatures {
   id: string;
   name: string;
   description: string;
   price: number;
   recommended: boolean;
   features: string[];
}
```

## Subscription Plans

### Basic Plan ($49.99/month)

-  4 coaching sessions per month
-  Basic health resources
-  Email support
-  Progress tracking
-  Monthly assessments

### Premium Plan ($99.99/month) - Recommended

-  8 coaching sessions per month
-  Unlimited resources
-  24/7 support
-  Advanced progress tracking
-  Monthly assessments
-  Custom meal plans
-  Personalized workout plans
-  Priority scheduling

### Elite Plan ($199.99/month)

-  Unlimited coaching sessions
-  Dedicated health coach
-  Unlimited resources
-  24/7 priority support
-  Advanced progress tracking
-  Weekly assessments
-  Custom meal plans
-  Personalized workout plans
-  Priority scheduling
-  Video consultations
-  Family plan options

## Usage Tracking

### Session Usage

-  Track coaching sessions used vs. allocated
-  Session history with dates and durations
-  Visual progress indicators
-  Usage recommendations

### Resource Usage

-  Monitor downloaded resources
-  Resource type categorization
-  Download history tracking
-  Usage analytics

## Billing Features

### Payment Management

-  Secure payment method storage
-  Multiple payment options
-  Automatic billing setup
-  Payment method updates

### Invoice Management

-  Complete billing history
-  PDF invoice downloads
-  Payment status tracking
-  Tax documentation

## Interactive Features

### Plan Comparison

-  Side-by-side plan comparison
-  Feature highlighting
-  Price comparison
-  Upgrade/downgrade recommendations

### Usage Analytics

-  Visual usage charts
-  Progress tracking
-  Usage patterns
-  Optimization suggestions

### Quick Actions

-  Plan changes
-  Billing updates
-  Payment method management
-  Support access

## Responsive Design

All subscription components are built with responsive design:

-  **Mobile Optimization** - Touch-friendly interfaces
-  **Tablet Support** - Enhanced layouts for tablets
-  **Desktop Experience** - Full-featured desktop interface
-  **Accessibility** - WCAG compliant design

## Integration Points

### Payment Processing

-  Stripe integration ready
-  PayPal support
-  Apple Pay/Google Pay
-  Bank transfer options

### Analytics Integration

-  Usage analytics
-  Billing analytics
-  Plan performance metrics
-  Customer insights

### Notification System

-  Billing reminders
-  Plan expiration alerts
-  Usage limit notifications
-  Payment confirmations

## Security Features

### Data Protection

-  Encrypted payment data
-  Secure API communication
-  PCI compliance ready
-  GDPR compliant

### Access Control

-  Role-based permissions
-  Secure authentication
-  Session management
-  Audit logging

## Future Enhancements

Planned features for subscription management:

-  **Family Plans** - Multi-user subscription management
-  **Corporate Plans** - Business subscription options
-  **Trial Management** - Free trial handling
-  **Referral System** - Referral rewards and tracking
-  **Loyalty Program** - Long-term customer rewards
-  **Advanced Analytics** - Detailed usage insights
-  **API Integration** - Third-party integrations
-  **Mobile App** - Native mobile subscription management
