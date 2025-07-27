# Coach Orders Components

This directory contains the components for the Coach Orders page in the coach dashboard. These components provide a simplified view of patient orders for coaches, focusing on their assigned patients and their order management needs.

## Components

### CoachOrdersManagement

The main component that orchestrates the coach orders page. It includes:

-  Statistics cards showing order metrics for the coach's patients
-  Order status overview
-  Order table with filtering and search capabilities
-  Order details modal

### CoachOrderTable

A simplified order table component that displays:

-  Patient orders with basic information
-  Order status and payment information
-  Subscription vs one-time order indicators
-  Search and filtering capabilities
-  Read-only actions (view details only)

### CoachOrderDetailsModal

A detailed modal for viewing order information including:

-  Patient details
-  Order items and pricing
-  Payment and shipping information
-  Order status and tracking
-  Prescription requirements

### mockData

Contains mock data structures and sample data for:

-  Coach order interfaces
-  Order statistics
-  Sample orders for testing

## Key Features

### Coach-Specific Scope

-  Only shows orders for patients assigned to the coach
-  Focuses on patient care and order tracking
-  Simplified permissions (read-only access)

### Subscription Focus

-  Highlights subscription-generated orders
-  Shows subscription vs one-time order indicators
-  Tracks subscription order percentages

### Patient-Centric View

-  Patient information prominently displayed
-  Order history for individual patients
-  Patient contact information readily available

## Usage

```tsx
import { CoachOrdersManagement } from "@/components/coach/orders";

export default function CoachOrdersPage() {
   return <CoachOrdersManagement />;
}
```

## Data Structure

The components use the `CoachOrder` interface which extends the base order structure with coach-specific fields:

```typescript
interface CoachOrder {
   // ... standard order fields
   coachId: string;
   coachName: string;
   isSubscriptionOrder: boolean;
   subscriptionId?: string;
}
```

## Permissions

Coaches have read-only access to order information and can:

-  View order details
-  Track order status
-  Export order data
-  Search and filter orders

Coaches cannot:

-  Modify order status
-  Edit order details
-  Cancel or refund orders
-  Access payment processing

This ensures coaches can effectively monitor their patients' orders while maintaining appropriate access controls.
