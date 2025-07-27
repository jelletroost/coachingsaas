# Coach Dashboard Components

This directory contains modular components for the coach dashboard of the health coaching platform.

## Components

### Core Components

-  **CoachDashboard** - Main dashboard component that combines all other components
-  **StatsCard** - Reusable card for displaying key metrics with trends
-  **LineChart** - SVG-based line chart for data visualization
-  **ActivityFeed** - Feed component for recent patient activities
-  **AlertsPanel** - Panel for displaying alerts and notifications
-  **AppointmentSchedule** - Component for showing upcoming appointments

### Data

-  **mockData** - Mock data for testing and development

## Usage

```tsx
import { CoachDashboard } from "@/components/coach/overview/CoachDashboard";

export default function CoachPage() {
   return (
      <div className="p-6">
         <CoachDashboard />
      </div>
   );
}
```

## Individual Components

### StatsCard

```tsx
import { StatsCard } from "@/components/coach/overview/StatsCard";
import { Users } from "lucide-react";

<StatsCard
   title="Active Patients"
   value="24"
   icon={Users}
   trend={{ value: 8.5, isPositive: true }}
   description="Patients under your care"
/>;
```

### LineChart

```tsx
import { LineChart } from "@/components/coach/overview/LineChart";

<LineChart
   title="Patient Progress"
   data={patientProgressData}
   type="progress"
   currentValue={94}
   previousValue={89}
   color="#3b82f6"
/>;
```

### ActivityFeed

```tsx
import { ActivityFeed } from "@/components/coach/overview/ActivityFeed";

<ActivityFeed activities={coachActivityData} title="Recent Activity" />;
```

### AlertsPanel

```tsx
import { AlertsPanel } from "@/components/coach/overview/AlertsPanel";

<AlertsPanel alerts={coachAlertsData} title="Alerts & Notifications" />;
```

### AppointmentSchedule

```tsx
import { AppointmentSchedule } from "@/components/coach/overview/AppointmentSchedule";

<AppointmentSchedule
   appointments={upcomingAppointments}
   title="Today's Schedule"
/>;
```

## Data Structure

### Stats Data

```typescript
interface StatsData {
   title: string;
   value: string | number;
   icon: LucideIcon;
   trend?: {
      value: number;
      isPositive: boolean;
   };
   description?: string;
}
```

### Chart Data

```typescript
interface ChartDataPoint {
   label: string;
   value: number;
}
```

### Activity Data

```typescript
interface ActivityItem {
   id: string;
   type: "appointment" | "message" | "assessment" | "goal" | "alert";
   title: string;
   description: string;
   user?: {
      name: string;
      avatar?: string;
   };
   timestamp: string;
   status: "pending" | "completed" | "failed";
}
```

### Alert Data

```typescript
interface Alert {
   id: string;
   type: "warning" | "error" | "info" | "success";
   title: string;
   description: string;
   timestamp: string;
   priority: "low" | "medium" | "high";
   actionRequired?: boolean;
}
```

### Appointment Data

```typescript
interface Appointment {
   id: string;
   patientName: string;
   time: string;
   duration: string;
   type: string;
   status: "confirmed" | "pending" | "cancelled";
}
```

## Features

-  **Responsive Design** - All components are mobile-friendly
-  **Modular Architecture** - Each component can be used independently
-  **TypeScript Support** - Full type safety for all components
-  **Mock Data** - Ready-to-use mock data for development
-  **Customizable** - Easy to customize colors, layouts, and data
-  **Accessible** - Built with accessibility in mind

## Coach-Specific Features

### Key Metrics

-  Active patient count
-  Today's appointments
-  Unread messages
-  Patient satisfaction ratings

### Patient Progress Tracking

-  Weekly progress charts
-  Goal achievement tracking
-  Assessment completion rates

### Appointment Management

-  Today's schedule view
-  Session type indicators
-  Status tracking (confirmed, pending, cancelled)

### Activity Monitoring

-  Patient interactions
-  Assessment submissions
-  Goal achievements
-  Patient concerns

### Alert System

-  Missed appointments
-  New patient assignments
-  System notifications
-  Priority-based alerts

## Customization

All components accept props for customization:

-  Colors can be customized via `color` props
-  Layouts can be adjusted via CSS classes
-  Data can be easily replaced with real API data
-  Icons can be changed using Lucide React icons

## Dependencies

-  `@/components/ui/*` - UI components from the design system
-  `lucide-react` - Icons
-  `class-variance-authority` - Component variants
-  `tailwindcss` - Styling
