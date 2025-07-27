import { Calendar, MessageSquare, Target, TrendingUp } from "lucide-react";

// Stats Data
export const patientStatsData = [
   {
      title: "Overall Progress",
      value: "78%",
      icon: TrendingUp,
      trend: { value: 6.2, isPositive: true },
      description: "Your health journey progress",
   },
   {
      title: "Wellness Score",
      value: "85",
      icon: Target,
      trend: { value: 3.7, isPositive: true },
      description: "Current wellness rating",
   },
   {
      title: "Sessions Completed",
      value: "12",
      icon: Calendar,
      trend: { value: 20.0, isPositive: true },
      description: "This month",
   },
   {
      title: "Unread Messages",
      value: "3",
      icon: MessageSquare,
      trend: { value: -25.0, isPositive: false },
      description: "From your coach",
   },
];

// Activity Data
export const patientActivityData = [
   {
      id: "1",
      type: "appointment" as const,
      title: "Session Completed",
      description:
         "Completed your weekly check-in session with Dr. Sarah Johnson",
      timestamp: "2 hours ago",
      coachName: "Dr. Sarah Johnson",
      status: "completed" as const,
   },
   {
      id: "2",
      type: "goal" as const,
      title: "Goal Achieved",
      description: "Reached your daily step goal of 10,000 steps",
      timestamp: "1 day ago",
      status: "completed" as const,
   },
   {
      id: "3",
      type: "message" as const,
      title: "New Message",
      description: "Dr. Johnson sent you a message about your progress",
      timestamp: "2 days ago",
      coachName: "Dr. Sarah Johnson",
      status: "completed" as const,
   },
   {
      id: "4",
      type: "progress" as const,
      title: "Progress Update",
      description: "Your weight loss goal is 75% complete",
      timestamp: "3 days ago",
      status: "in-progress" as const,
   },
   {
      id: "5",
      type: "achievement" as const,
      title: "Milestone Reached",
      description: "Completed 10 consecutive days of healthy eating",
      timestamp: "1 week ago",
      status: "completed" as const,
   },
];

// Alerts Data
export const patientAlertsData = [
   {
      id: "1",
      type: "reminder" as const,
      title: "Appointment Reminder",
      message: "You have a session with Dr. Johnson tomorrow at 2:00 PM",
      timestamp: "1 hour ago",
      priority: "medium" as const,
      action: {
         label: "View Details",
         onClick: () => console.log("View appointment details"),
      },
   },
   {
      id: "2",
      type: "success" as const,
      title: "Goal Completed",
      message: "Congratulations! You've completed your weekly exercise goal",
      timestamp: "3 hours ago",
      priority: "low" as const,
   },
   {
      id: "3",
      type: "info" as const,
      title: "New Resource Available",
      message: "A new nutrition guide has been added to your program",
      timestamp: "1 day ago",
      priority: "low" as const,
      action: {
         label: "View Guide",
         onClick: () => console.log("View nutrition guide"),
      },
   },
];

// Appointments Data
export const upcomingAppointments = [
   {
      id: "1",
      title: "Weekly Check-in",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: 30,
      type: "video" as const,
      coachName: "Dr. Sarah Johnson",
      coachSpecialty: "Health Coach",
      status: "confirmed" as const,
      notes: "Please prepare your weekly progress report",
   },
   {
      id: "2",
      title: "Nutrition Consultation",
      date: "2024-01-18",
      time: "10:00 AM",
      duration: 45,
      type: "phone" as const,
      coachName: "Dr. Michael Chen",
      coachSpecialty: "Nutritionist",
      status: "pending" as const,
   },
   {
      id: "3",
      title: "Progress Review",
      date: "2024-01-22",
      time: "3:30 PM",
      duration: 60,
      type: "video" as const,
      coachName: "Dr. Sarah Johnson",
      coachSpecialty: "Health Coach",
      status: "confirmed" as const,
   },
];

// Chart Data
export const patientProgressData = [
   { date: "Week 1", value: 65 },
   { date: "Week 2", value: 68 },
   { date: "Week 3", value: 72 },
   { date: "Week 4", value: 75 },
   { date: "Week 5", value: 78 },
   { date: "Week 6", value: 82 },
   { date: "Week 7", value: 85 },
   { date: "Week 8", value: 88 },
];

export const wellnessData = [
   { date: "Week 1", value: 72 },
   { date: "Week 2", value: 75 },
   { date: "Week 3", value: 78 },
   { date: "Week 4", value: 80 },
   { date: "Week 5", value: 82 },
   { date: "Week 6", value: 84 },
   { date: "Week 7", value: 85 },
   { date: "Week 8", value: 87 },
];
