# Admin Dashboard Components

This directory contains modular components for the admin dashboard of the health coaching platform.

## Components

### Core Components

-  **AdminDashboard** - Main dashboard component that combines all other components
-  **StatsCard** - Reusable card for displaying key metrics with trends
-  **LineChart** - SVG-based line chart for data visualization
-  **ActivityFeed** - Feed component for recent activities
-  **AlertsPanel** - Panel for displaying alerts and notifications
-  **DashboardOverview** - Overview component for quick metrics summary

### Utility Components

-  **SimpleChart** - Simple bar chart component (alternative to LineChart)
-  **mockData** - Mock data for testing and development

## Usage

```tsx
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export default function AdminPage() {
   return (
      <div className="p-6">
         <AdminDashboard />
      </div>
   );
}
```

## Individual Components

### StatsCard

```tsx
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Users } from "lucide-react";

<StatsCard
   title="Total Patients"
   value="2,847"
   icon={Users}
   trend={{ value: 12.5, isPositive: true }}
   description="Active patients in the system"
/>;
```

### LineChart

```tsx
import { LineChart } from "@/components/dashboard/LineChart";

<LineChart
   title="User Growth"
   data={userGrowthData}
   type="growth"
   currentValue={2847}
   previousValue={1720}
   color="#3b82f6"
/>;
```

### ActivityFeed

```tsx
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

<ActivityFeed activities={activityData} title="Recent Activity" />;
```

### AlertsPanel

```tsx
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

<AlertsPanel alerts={alertsData} title="Alerts & Notifications" />;
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
   type: "signup" | "message" | "order" | "alert";
   title: string;
   description: string;
   user?: {
      name: string;
      avatar?: string;
   };
   timestamp: string;
   status?: "pending" | "completed" | "failed";
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

## Features

-  **Responsive Design** - All components are mobile-friendly
-  **Modular Architecture** - Each component can be used independently
-  **TypeScript Support** - Full type safety for all components
-  **Mock Data** - Ready-to-use mock data for development
-  **Customizable** - Easy to customize colors, layouts, and data
-  **Accessible** - Built with accessibility in mind

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
