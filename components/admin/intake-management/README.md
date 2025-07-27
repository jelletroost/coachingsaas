# Intake Management Components

This directory contains the components for the admin intake management dashboard.

## Components

### IntakeManagement

The main dashboard component that orchestrates all intake management functionality.

**Features:**

-  Displays statistics cards (total intakes, pending, approved, this week)
-  Provides filtering and search capabilities
-  Shows intake records in a table format
-  Handles approve/reject actions
-  Manages coach assignments
-  Export functionality

### IntakeTable

Displays intake records in a table format with actions.

**Features:**

-  Sortable columns
-  Status badges with color coding
-  Priority indicators
-  Action dropdown menu for each record
-  Responsive design

### IntakeFilters

Provides comprehensive filtering options for intake records.

**Filters:**

-  Search by patient name, email, or ID
-  Filter by status (pending, approved, rejected, under review)
-  Filter by questionnaire type (initial, follow-up, assessment)
-  Filter by priority (low, medium, high, urgent)
-  Filter by date range
-  Clear all filters option

### IntakeDetailsModal

Detailed view and editing modal for individual intake records.

**Features:**

-  Complete patient information display
-  Timeline information
-  Coach assignment management
-  Follow-up actions management
-  Recommendations management
-  Notes editing
-  Inline editing capabilities

## Data Structure

### IntakeRecord Interface

```typescript
interface IntakeRecord {
   id: string;
   patientName: string;
   patientEmail: string;
   patientId: string;
   submittedDate: string;
   status: "pending" | "approved" | "rejected" | "under_review";
   questionnaireType: "initial" | "follow_up" | "assessment";
   priority: "low" | "medium" | "high" | "urgent";
   assignedCoach?: string;
   followUpActions?: string[];
   recommendations?: string[];
   notes?: string;
   lastUpdated: string;
}
```

## Usage

```tsx
import { IntakeManagement } from "@/components/admin/intake-management";

export default function IntakeManagementPage() {
   return <IntakeManagement />;
}
```

## Mock Data

The components use mock data for demonstration purposes. In a real application, you would:

1. Replace mock data with API calls
2. Implement proper error handling
3. Add loading states
4. Implement real-time updates
5. Add proper validation
6. Implement the export functionality

## Styling

All components use Tailwind CSS classes and follow the existing design system with:

-  Consistent color schemes
-  Responsive design
-  Accessible components
-  Modern UI patterns
