# Patient Intake History Components

This directory contains components for managing and viewing patient intake history in the health coaching platform.

## Components

### Core Components

-  **IntakeHistoryManagement** - Main intake history interface
-  **mockData** - Intake history and statistics data

## Usage

```tsx
import { IntakeHistoryManagement } from "@/components/patient/intake-history/IntakeHistoryManagement";

export default function PatientIntakeHistoryPage() {
   return (
      <div className="p-6">
         <IntakeHistoryManagement />
      </div>
   );
}
```

## Features

### Intake History Overview

-  **Intake Statistics** - Total intakes, completed, in progress, and follow-ups counts
-  **Search Functionality** - Search intakes by intake number, coach, or health concerns
-  **Filter Options** - Filter by intake status (all, completed, in progress, requires followup, pending)
-  **Export Capability** - Export intake history for record keeping

### Intake Details

-  **Intake Information** - Intake number, submission date, type, status
-  **Coach Assignment** - Assigned coach information
-  **Health Concerns** - Patient health concerns and issues
-  **Goals** - Patient health and fitness goals
-  **Recommendations** - Coach recommendations and advice
-  **Coach Notes** - Detailed notes from the coach
-  **Timeline** - Review and completion dates

### Intake Management

-  **Complete History** - View all submitted intake forms
-  **Status Tracking** - Track intake status from submission to completion
-  **Coach Feedback** - View coach recommendations and notes
-  **Progress Tracking** - See how health concerns and goals have evolved

## Data Structure

### Intake History Statistics

```typescript
interface IntakeHistoryStats {
   title: string;
   value: string;
   icon: React.ComponentType;
   description: string;
}
```

### Intake History Record

```typescript
interface IntakeHistoryRecord {
   id: string;
   intakeNumber: string;
   submittedDate: string;
   status: "completed" | "in_progress" | "requires_followup" | "pending";
   questionnaireType: "initial" | "follow_up" | "assessment" | "screening";
   assignedCoach: string;
   coachAvatar?: string;
   reviewDate: string | null;
   completionDate: string | null;
   healthConcerns: string[];
   goals: string[];
   recommendations: string[];
   notes: string;
}
```

## Features

### Intake History Dashboard

-  **Statistics Cards** - Overview of total intakes, completed, in progress, and follow-ups
-  **Status Overview** - Quick view of intake form statuses
-  **Search and Filter** - Find intake forms by various criteria
-  **Responsive Cards** - View all intake forms with detailed information

### Intake Form Details

-  **Complete Information** - All intake form details and coach feedback
-  **Health Concerns Tracking** - See how health concerns have evolved over time
-  **Goal Progress** - Track goal changes and achievements
-  **Coach Recommendations** - View all coach recommendations and advice
-  **Timeline Information** - Review and completion dates

### Interactive Features

-  **Quick Actions** - View details, download forms
-  **Status Indicators** - Color-coded status badges and icons
-  **Responsive Design** - Works on all screen sizes
-  **Accessible** - Built with accessibility in mind

## Patient-Specific Features

### Intake History Tracking

-  **Complete Timeline** - View all intake forms from initial to current
-  **Progress Visualization** - See how health journey has evolved
-  **Coach Feedback History** - Review all coach recommendations
-  **Goal Evolution** - Track how goals have changed over time

### Health Journey Insights

-  **Health Concerns Evolution** - See how health concerns have changed
-  **Recommendation History** - Review all coach recommendations
-  **Progress Milestones** - Track completion of different intake types
-  **Coach Relationship** - View consistent coach assignments

### Documentation

-  **Complete Records** - All intake forms and coach feedback
-  **Download Capability** - Export intake history for personal records
-  **Search Functionality** - Find specific intakes or topics
-  **Filter Options** - Organize intakes by status or type

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

## Future Enhancements

Planned features for intake history components:

-  **Detailed View Modal** - Expandable intake form details
-  **Comparison View** - Compare different intake forms side by side
-  **Progress Charts** - Visual representation of health progress
-  **Coach Communication** - Direct messaging from intake history
-  **Reminder System** - Notifications for follow-up intakes
-  **Integration** - Connect with health tracking devices
-  **Analytics** - Health trend analysis and insights
