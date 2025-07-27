# Coach Patient Management Components

This directory contains modular components for managing patients in the coach dashboard of the health coaching platform.

## Components

### Core Components

-  **PatientsManagement** - Main component that combines all patient management features
-  **PatientFilters** - Filter component for searching and filtering patients
-  **PatientTable** - Table component for displaying patients with actions
-  **PatientProfileModal** - Modal for viewing detailed patient profiles

### Data

-  **mockData** - Mock patient data and statistics for development

## Usage

```tsx
import { PatientsManagement } from "@/components/coach/patients/PatientsManagement";

export default function CoachPatientsPage() {
   return (
      <div className="p-6">
         <PatientsManagement />
      </div>
   );
}
```

## Individual Components

### PatientsManagement

The main orchestrator component that combines all patient management functionality.

**Features:**

-  Displays patient statistics cards
-  Provides filtering and search capabilities
-  Shows patient records in a table format
-  Handles patient profile viewing
-  Manages patient interactions

### PatientFilters

Provides comprehensive filtering options for patient records.

**Filters:**

-  Search by patient name or email
-  Filter by status (active, inactive, pending)
-  Filter by progress level (high, medium, low)
-  Clear all filters option

### PatientTable

Displays patient records in a responsive table format with actions.

**Features:**

-  Patient avatar and basic information
-  Status badges with color coding
-  Progress indicators
-  Satisfaction ratings
-  Next appointment information
-  Unread message counts
-  Action dropdown menu for each patient

### PatientProfileModal

Detailed view modal for individual patient profiles.

**Features:**

-  Complete patient information display
-  Health metrics overview
-  Goal tracking
-  Recent activity timeline
-  Quick action buttons
-  Tabbed interface for different sections

## Data Structure

### Patient Interface

```typescript
interface Patient {
   id: string;
   name: string;
   email: string;
   avatar?: string;
   status: "active" | "inactive" | "pending";
   joinDate: string;
   lastActive: string;
   progress: number;
   goals: string[];
   nextAppointment?: {
      date: string;
      time: string;
      type: string;
   };
   unreadMessages: number;
   totalSessions: number;
   satisfaction: number;
   healthMetrics: {
      weight?: number;
      bloodPressure?: string;
      heartRate?: number;
      sleepHours?: number;
   };
   notes?: string;
   assignedCoach: string;
}
```

### Patient Statistics

```typescript
interface PatientStats {
   total: number;
   active: number;
   inactive: number;
   pending: number;
   averageProgress: number;
   averageSatisfaction: string;
   totalSessions: number;
   unreadMessages: number;
}
```

## Features

### Patient Overview Dashboard

-  **Statistics Cards** - Overview of total patients, average progress, sessions, and messages
-  **Status Overview** - Quick view of active, inactive, and pending patients
-  **Search and Filter** - Find patients by name, email, status, or progress
-  **Responsive Table** - View all patients with key information at a glance

### Patient Management

-  **Profile Viewing** - Detailed patient profiles with health metrics
-  **Progress Tracking** - Visual progress indicators and satisfaction ratings
-  **Appointment Management** - View and schedule patient appointments
-  **Message Management** - Track unread messages and patient communication

### Patient Profile Modal

-  **Overview Tab** - Basic patient information and status
-  **Health Tab** - Health metrics and vital signs
-  **Goals Tab** - Patient health goals and progress
-  **Activity Tab** - Recent patient activities and interactions

### Interactive Features

-  **Quick Actions** - Send messages, schedule appointments, view profiles
-  **Status Indicators** - Color-coded status badges and progress bars
-  **Responsive Design** - Works on all screen sizes
-  **Accessible** - Built with accessibility in mind

## Coach-Specific Features

### Patient Monitoring

-  Track patient progress over time
-  Monitor health metrics and vital signs
-  View patient satisfaction ratings
-  Check appointment schedules

### Communication Management

-  Track unread messages from patients
-  Quick access to patient communication
-  Message history and activity logs

### Progress Assessment

-  Visual progress indicators
-  Goal achievement tracking
-  Performance analytics
-  Trend analysis

### Appointment Coordination

-  View upcoming appointments
-  Schedule new sessions
-  Track session history
-  Manage patient availability

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
