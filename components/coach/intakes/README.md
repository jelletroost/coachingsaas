# Coach Intake Management Components

This directory contains modular components for managing patient intake forms and health screenings in the coach dashboard.

## Components

### Core Components

-  **IntakeManagement** - Main component that combines all intake management features
-  **IntakeFilters** - Filter component for searching and filtering intake forms
-  **IntakeTable** - Table component for displaying intake forms with actions
-  **IntakeDetailsModal** - Modal for viewing detailed intake form information

### Data

-  **mockData** - Mock intake form data and statistics for development

## Usage

```tsx
import { IntakeManagement } from "@/components/coach/intakes/IntakeManagement";

export default function CoachIntakesPage() {
   return (
      <div className="p-6">
         <IntakeManagement />
      </div>
   );
}
```

## Individual Components

### IntakeManagement

The main orchestrator component that combines all intake management functionality.

**Features:**

-  Displays intake statistics cards
-  Provides filtering and search capabilities
-  Shows intake forms in a table format
-  Handles intake form review and approval
-  Manages intake status updates

### IntakeFilters

Provides comprehensive filtering options for intake forms.

**Filters:**

-  Search by patient name, email, or intake ID
-  Filter by status (pending, reviewed, approved, rejected, requires_followup)
-  Filter by priority (urgent, high, medium, low)
-  Filter by questionnaire type (initial, follow_up, assessment, screening)
-  Clear all filters option

### IntakeTable

Displays intake forms in a responsive table format with actions.

**Features:**

-  Patient avatar and basic information
-  Status badges with color coding and icons
-  Priority indicators
-  Questionnaire type display
-  Submission date
-  Health concerns count
-  Action dropdown menu for each intake

### IntakeDetailsModal

Detailed view modal for individual intake forms.

**Features:**

-  Complete intake form information display
-  Tabbed interface for different sections
-  Health information overview
-  Lifestyle factors analysis
-  Goal tracking
-  Review and approval actions
-  Notes and recommendations

## Data Structure

### IntakeForm Interface

```typescript
interface IntakeForm {
   id: string;
   patientName: string;
   patientEmail: string;
   patientId: string;
   submittedDate: string;
   status:
      | "pending"
      | "reviewed"
      | "approved"
      | "rejected"
      | "requires_followup";
   priority: "low" | "medium" | "high" | "urgent";
   questionnaireType: "initial" | "follow_up" | "assessment" | "screening";
   assignedCoach?: string;
   reviewNotes?: string;
   followUpActions?: string[];
   recommendations?: string[];
   healthConcerns: string[];
   medications: string[];
   allergies: string[];
   familyHistory: string[];
   lifestyleFactors: {
      exercise: string;
      diet: string;
      sleep: string;
      stress: string;
      smoking: string;
      alcohol: string;
   };
   goals: string[];
   emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
   };
   insuranceInfo?: {
      provider: string;
      policyNumber: string;
      groupNumber?: string;
   };
   lastUpdated: string;
}
```

### Intake Statistics

```typescript
interface IntakeStats {
   total: number;
   pending: number;
   reviewed: number;
   approved: number;
   rejected: number;
   requiresFollowup: number;
   urgent: number;
   high: number;
   thisWeek: number;
}
```

## Features

### Intake Overview Dashboard

-  **Statistics Cards** - Overview of total intakes, pending reviews, approvals, and urgent cases
-  **Status Overview** - Quick view of intake form statuses
-  **Search and Filter** - Find intake forms by various criteria
-  **Responsive Table** - View all intake forms with key information at a glance

### Intake Form Management

-  **Form Review** - Detailed review of patient intake information
-  **Status Management** - Approve, reject, or require follow-up on forms
-  **Priority Handling** - Identify and handle urgent cases
-  **Notes and Recommendations** - Add review notes and recommendations

### Intake Details Modal

-  **Overview Tab** - Basic patient information and contact details
-  **Health Tab** - Health concerns, medications, allergies, family history
-  **Lifestyle Tab** - Exercise, diet, sleep, stress, smoking, alcohol habits
-  **Goals Tab** - Patient health goals and objectives
-  **Review Tab** - Review notes and approval actions

### Interactive Features

-  **Quick Actions** - Approve, reject, require follow-up, view details
-  **Status Indicators** - Color-coded status badges and priority levels
-  **Responsive Design** - Works on all screen sizes
-  **Accessible** - Built with accessibility in mind

## Coach-Specific Features

### Intake Review Process

-  Review patient health information
-  Assess eligibility for coaching program
-  Identify urgent medical concerns
-  Make approval/rejection decisions
-  Add follow-up recommendations

### Priority Management

-  Identify urgent cases requiring immediate attention
-  Handle high-priority patients first
-  Track review progress
-  Manage workload distribution

### Health Screening

-  Review patient health concerns
-  Assess medication lists and allergies
-  Evaluate family medical history
-  Analyze lifestyle factors
-  Determine program suitability

### Documentation

-  Add review notes and observations
-  Document follow-up actions
-  Record recommendations
-  Track decision rationale

## Customization

All components accept props for customization:

-  Colors can be customized via CSS classes
-  Layouts can be adjusted via Tailwind classes
-  Data can be easily replaced with real API data
-  Icons can be changed using Lucide React icons

## Dependencies

-  `@/components/ui/*` - UI components from the design system
-  `lucide-react` - Icons
-  `class-variance-authority` - Component variants
-  `tailwindcss` - Styling
