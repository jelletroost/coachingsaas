# Patient Dashboard Components

This directory contains modular components for the patient dashboard of the health coaching platform.

## Components

### Core Components

-  **PatientDashboard** - Main dashboard component that combines all other components
-  **StatsCard** - Reusable card for displaying key metrics with trends
-  **LineChart** - SVG-based line chart for data visualization
-  **ActivityFeed** - Feed component for recent patient activities
-  **AlertsPanel** - Panel for displaying alerts and notifications
-  **AppointmentSchedule** - Component for showing upcoming appointments

### Data

-  **mockData** - Mock data for testing and development

## Usage

```tsx
import { PatientDashboard } from "@/components/patient/overview/PatientDashboard";

export default function PatientPage() {
   return (
      <div className="p-6">
         <PatientDashboard />
      </div>
   );
}
```

## Individual Components

### StatsCard

```tsx
import { StatsCard } from "@/components/patient/overview/StatsCard";
import { TrendingUp } from "lucide-react";

<StatsCard
   title="Overall Progress"
   value="78%"
   icon={TrendingUp}
   trend={{ value: 6.2, isPositive: true }}
   description="Your health journey progress"
/>;
```

### LineChart

```tsx
import { LineChart } from "@/components/patient/overview/LineChart";

<LineChart
   title="My Progress"
   data={patientProgressData}
   type="progress"
   currentValue={78}
   previousValue={72}
   color="#3b82f6"
/>;
```

### ActivityFeed

```tsx
import { ActivityFeed } from "@/components/patient/overview/ActivityFeed";

<ActivityFeed activities={patientActivityData} title="Recent Activity" />;
```

### AlertsPanel

```tsx
import { AlertsPanel } from "@/components/patient/overview/AlertsPanel";

<AlertsPanel alerts={patientAlertsData} title="Alerts & Notifications" />;
```

### AppointmentSchedule

```tsx
import { AppointmentSchedule } from "@/components/patient/overview/AppointmentSchedule";

<AppointmentSchedule
   appointments={upcomingAppointments}
   title="Upcoming Appointments"
/>;
```

## Data Structure

### Stats Data

```typescript
interface StatsData {
   title: string;
   value: string;
   icon: React.ComponentType<{ className?: string }>;
   trend?: {
      value: number;
      isPositive: boolean;
   };
   description?: string;
}
```

### Activity Data

```typescript
interface Activity {
   id: string;
   type: "appointment" | "message" | "goal" | "progress" | "achievement";
   title: string;
   description: string;
   timestamp: string;
   coachName?: string;
   coachAvatar?: string;
   status?: "completed" | "upcoming" | "in-progress";
}
```

### Alert Data

```typescript
interface Alert {
   id: string;
   type: "info" | "warning" | "success" | "reminder";
   title: string;
   message: string;
   timestamp: string;
   priority: "low" | "medium" | "high";
   action?: {
      label: string;
      onClick: () => void;
   };
}
```

### Appointment Data

```typescript
interface Appointment {
   id: string;
   title: string;
   date: string;
   time: string;
   duration: number;
   type: "video" | "phone" | "in-person";
   coachName: string;
   coachAvatar?: string;
   coachSpecialty: string;
   status: "confirmed" | "pending" | "cancelled";
   notes?: string;
}
```

### Chart Data

```typescript
interface DataPoint {
   date: string;
   value: number;
}
```

## Features

### Patient Overview Dashboard

-  **Statistics Cards** - Overview of progress, wellness score, sessions, and messages
-  **Progress Tracking** - Visual progress indicators and trend analysis
-  **Activity Feed** - Recent activities and achievements
-  **Alerts & Notifications** - Important reminders and updates
-  **Appointment Management** - View and manage upcoming appointments

### Patient-Specific Features

-  **Progress Visualization** - Line charts showing progress over time
-  **Wellness Scoring** - Health and wellness metrics tracking
-  **Coach Communication** - Quick access to coach messages and updates
-  **Goal Tracking** - Achievement and milestone tracking
-  **Appointment Scheduling** - Easy appointment management

### Interactive Features

-  **Trend Indicators** - Visual trend arrows and percentages
-  **Status Badges** - Color-coded status indicators
-  **Action Buttons** - Quick actions for appointments and messages
-  **Responsive Design** - Works on all screen sizes
-  **Accessible** - Built with accessibility in mind

## Patient Dashboard Layout

The patient dashboard is organized into three main sections:

### 1. Statistics Row

-  Overall Progress (with trend)
-  Wellness Score (with trend)
-  Sessions Completed (with trend)
-  Unread Messages (with trend)

### 2. Charts Row

-  My Progress Chart (line chart)
-  Wellness Score Chart (line chart)

### 3. Information Row

-  Recent Activity Feed
-  Alerts & Notifications Panel
-  Upcoming Appointments Schedule

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

## Patient vs Coach Perspective

The patient dashboard focuses on:

-  **Personal Progress** - Individual health journey tracking
-  **Coach Communication** - Messages and appointments with coaches
-  **Goal Achievement** - Personal health goals and milestones
-  **Wellness Monitoring** - Health metrics and wellness scores
-  **Appointment Management** - Scheduling and managing sessions

This differs from the coach dashboard which focuses on managing multiple patients, tracking patient progress, and administrative tasks.
