# Patient Components

This directory contains all components specifically designed for the patient experience in the health coaching platform.

## Directory Structure

```
components/patient/
├── overview/           # Dashboard overview components
├── program/           # Program management components
├── profile/           # Profile management components
├── messages/          # Messaging system components
└── README.md          # This file
```

## Components Overview

### Overview Components (`/overview`)

The patient dashboard overview components provide a comprehensive view of the patient's health journey.

**Components:**

-  **PatientDashboard** - Main dashboard orchestrator
-  **StatsCard** - Key metrics display with trends
-  **LineChart** - Progress and wellness visualization
-  **ActivityFeed** - Recent activities and achievements
-  **AlertsPanel** - Notifications and reminders
-  **AppointmentSchedule** - Upcoming appointments management

**Features:**

-  Progress tracking with visual indicators
-  Wellness score monitoring
-  Activity timeline
-  Appointment scheduling
-  Alert management

### Program Components (`/program`)

Program management components for tracking health programs, goals, and milestones.

**Components:**

-  **ProgramManagement** - Main program interface
-  **mockData** - Program, goals, and milestones data

**Features:**

-  Program overview and progress
-  Goal tracking and management
-  Milestone achievements
-  Weekly schedule view
-  Progress visualization

### Profile Components (`/profile`)

Profile management components for personal information and preferences.

**Components:**

-  **ProfileManagement** - Profile editing interface
-  **mockData** - Profile and health metrics data

**Features:**

-  Personal information management
-  Health metrics display
-  Emergency contact management
-  Communication preferences
-  Security settings

### Messages Components (`/messages`)

Messaging system for patient-coach communication.

**Components:**

-  **MessagesManagement** - Main messaging interface
-  **MessageList** - Conversation list
-  **ChatWindow** - Chat interface
-  **mockData** - Messages and conversations data

**Features:**

-  Real-time messaging
-  Conversation management
-  File sharing (UI ready)
-  Coach status indicators
-  Message history

## Patient Dashboard Features

### Core Functionality

1. **Progress Tracking**

   -  Visual progress indicators
   -  Trend analysis
   -  Goal achievement tracking
   -  Milestone celebrations

2. **Health Monitoring**

   -  Wellness score tracking
   -  Health metrics visualization
   -  Progress charts
   -  Performance analytics

3. **Communication**

   -  Direct messaging with coaches
   -  Appointment scheduling
   -  Notification management
   -  Activity updates

4. **Program Management**

   -  Health program overview
   -  Goal setting and tracking
   -  Weekly schedules
   -  Achievement milestones

5. **Profile Management**
   -  Personal information
   -  Health data
   -  Preferences
   -  Security settings

### Patient-Specific Features

-  **Personalized Experience** - All components are tailored to individual patient needs
-  **Health Focus** - Emphasis on health metrics and progress tracking
-  **Coach Integration** - Seamless communication with health coaches
-  **Goal-Oriented** - Focus on achieving health and wellness goals
-  **Progress Visualization** - Clear visual representation of health journey

## Usage Examples

### Dashboard Page

```tsx
import { PatientDashboard } from "@/components/patient/overview/PatientDashboard";

export default function PatientDashboardPage() {
   return (
      <div className="p-6">
         <PatientDashboard />
      </div>
   );
}
```

### Program Page

```tsx
import { ProgramManagement } from "@/components/patient/program/ProgramManagement";

export default function PatientProgramPage() {
   return (
      <div className="p-6">
         <ProgramManagement />
      </div>
   );
}
```

### Profile Page

```tsx
import { ProfileManagement } from "@/components/patient/profile/ProfileManagement";

export default function PatientProfilePage() {
   return (
      <div className="p-6">
         <ProfileManagement />
      </div>
   );
}
```

### Messages Page

```tsx
import { MessagesManagement } from "@/components/patient/messages/MessagesManagement";

export default function PatientMessagesPage() {
   return (
      <div className="p-6">
         <MessagesManagement />
      </div>
   );
}
```

## Data Structure

### Patient Profile

```typescript
interface PatientProfile {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   dateOfBirth: string;
   gender: string;
   address: string;
   avatar?: string;
   status: string;
   allergies?: string;
   medications?: string;
   medicalConditions?: string;
   emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
   };
   preferences: {
      communication: "email" | "phone" | "text";
      appointmentReminders: boolean;
      progressUpdates: boolean;
      marketingEmails: boolean;
   };
}
```

### Health Metrics

```typescript
interface HealthMetrics {
   height: string;
   weight: string;
   bmi: string;
   bloodType: string;
   bloodPressure: string;
   heartRate: string;
   lastUpdated: string;
}
```

### Program Data

```typescript
interface Program {
   id: string;
   name: string;
   description: string;
   status: string;
   progress: number;
   completedWeeks: number;
   totalWeeks: number;
   overview: string;
   learningOutcomes: string[];
   weeklySchedule: WeeklySchedule[];
}
```

## Navigation Structure

The patient navigation includes:

-  **Dashboard** (`/dashboard`) - Main overview and metrics
-  **My Program** (`/dashboard/program`) - Program management and goals
-  **Messages** (`/dashboard/messages`) - Coach communication
-  **Orders** (`/dashboard/orders`) - Order history and management
-  **Subscriptions** (`/dashboard/subscriptions`) - Subscription management
-  **Profile** (`/dashboard/profile`) - Personal information and settings

## Responsive Design

All patient components are built with responsive design in mind:

-  **Mobile-first approach** - Optimized for mobile devices
-  **Tablet support** - Enhanced layouts for tablet screens
-  **Desktop optimization** - Full-featured desktop experience
-  **Accessibility** - Built with accessibility standards

## Customization

Patient components can be customized through:

-  **Props** - Component-specific customization options
-  **CSS Classes** - Tailwind CSS for styling
-  **Theme** - Consistent design system
-  **Data** - Easy integration with real API data

## Dependencies

-  `@/components/ui/*` - UI component library
-  `lucide-react` - Icon library
-  `tailwindcss` - Styling framework
-  `class-variance-authority` - Component variants

## Future Enhancements

Planned features for patient components:

-  **Health Data Integration** - Real-time health device integration
-  **Video Calls** - Built-in video consultation
-  **AI Coaching** - AI-powered health recommendations
-  **Social Features** - Community and peer support
-  **Gamification** - Achievement badges and rewards
-  **Advanced Analytics** - Detailed health insights
-  **Mobile App** - Native mobile application
-  **Offline Support** - Offline functionality
-  **Multi-language** - Internationalization support
