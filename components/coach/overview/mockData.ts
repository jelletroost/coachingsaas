import { Calendar, MessageSquare, TrendingUp, Users } from "lucide-react";

// Coach-specific stats data
export const coachStatsData = [
   {
      title: "Active Patients",
      value: "24",
      icon: Users,
      trend: { value: 8.5, isPositive: true },
      description: "Patients under your care",
   },
   {
      title: "Today's Appointments",
      value: "6",
      icon: Calendar,
      trend: { value: 2, isPositive: true },
      description: "Scheduled sessions today",
   },
   {
      title: "Unread Messages",
      value: "12",
      icon: MessageSquare,
      trend: { value: -3, isPositive: false },
      description: "Messages requiring attention",
   },
   {
      title: "Patient Satisfaction",
      value: "4.8/5",
      icon: TrendingUp,
      trend: { value: 0.2, isPositive: true },
      description: "Average rating this month",
   },
];

// Patient progress data
export const patientProgressData = [
   { label: "Week 1", value: 75 },
   { label: "Week 2", value: 82 },
   { label: "Week 3", value: 78 },
   { label: "Week 4", value: 89 },
   { label: "Week 5", value: 91 },
   { label: "Week 6", value: 94 },
];

// Appointment data
export const appointmentData = [
   { label: "Mon", value: 8 },
   { label: "Tue", value: 12 },
   { label: "Wed", value: 10 },
   { label: "Thu", value: 15 },
   { label: "Fri", value: 11 },
   { label: "Sat", value: 6 },
   { label: "Sun", value: 3 },
];

// Recent activities for coach
export const coachActivityData = [
   {
      id: "1",
      type: "appointment" as const,
      title: "Session Completed",
      description: "Completed wellness session with Sarah Johnson",
      user: {
         name: "Sarah Johnson",
         avatar: "/avatars/sarah.jpg",
      },
      timestamp: "30 minutes ago",
      status: "completed" as const,
   },
   {
      id: "2",
      type: "message" as const,
      title: "New Patient Message",
      description: "Mike Davis sent a message about medication concerns",
      user: {
         name: "Mike Davis",
      },
      timestamp: "1 hour ago",
      status: "pending" as const,
   },
   {
      id: "3",
      type: "assessment" as const,
      title: "Assessment Submitted",
      description: "Emma Wilson completed her weekly health assessment",
      user: {
         name: "Emma Wilson",
      },
      timestamp: "2 hours ago",
      status: "completed" as const,
   },
   {
      id: "4",
      type: "goal" as const,
      title: "Goal Achievement",
      description: "David Brown achieved his weight loss milestone",
      user: {
         name: "David Brown",
      },
      timestamp: "3 hours ago",
      status: "completed" as const,
   },
   {
      id: "5",
      type: "alert" as const,
      title: "Patient Concern",
      description: "Lisa Chen reported side effects from medication",
      user: {
         name: "Lisa Chen",
      },
      timestamp: "4 hours ago",
      status: "pending" as const,
   },
];

// Coach-specific alerts
export const coachAlertsData = [
   {
      id: "1",
      type: "warning" as const,
      title: "Patient Missed Appointment",
      description: "John Smith missed his scheduled session yesterday",
      timestamp: "1 hour ago",
      priority: "medium" as const,
      actionRequired: true,
   },
   {
      id: "2",
      type: "info" as const,
      title: "New Patient Assignment",
      description: "You have been assigned a new patient: Maria Garcia",
      timestamp: "2 hours ago",
      priority: "low" as const,
   },
   {
      id: "3",
      type: "success" as const,
      title: "Patient Progress Milestone",
      description: "3 patients achieved their monthly goals",
      timestamp: "4 hours ago",
      priority: "low" as const,
   },
   {
      id: "4",
      type: "error" as const,
      title: "System Notification",
      description: "Video call feature temporarily unavailable",
      timestamp: "6 hours ago",
      priority: "medium" as const,
   },
];

// Upcoming appointments
export const upcomingAppointments = [
   {
      id: "1",
      patientName: "Sarah Johnson",
      time: "10:00 AM",
      duration: "45 min",
      type: "Wellness Check",
      status: "confirmed" as const,
   },
   {
      id: "2",
      patientName: "Mike Davis",
      time: "11:30 AM",
      duration: "30 min",
      type: "Medication Review",
      status: "confirmed" as const,
   },
   {
      id: "3",
      patientName: "Emma Wilson",
      time: "2:00 PM",
      duration: "60 min",
      type: "Goal Setting",
      status: "pending" as const,
   },
   {
      id: "4",
      patientName: "David Brown",
      time: "3:30 PM",
      duration: "45 min",
      type: "Progress Review",
      status: "confirmed" as const,
   },
];

// Patient summary data
export const patientSummaryData = {
   totalPatients: 24,
   activePatients: 22,
   newThisWeek: 3,
   completedGoals: 8,
   averageSatisfaction: 4.8,
   responseTime: "2.3 hours",
};
