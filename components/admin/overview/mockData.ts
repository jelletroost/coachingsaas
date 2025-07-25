import { CreditCard, Package, UserCheck, Users } from "lucide-react";

// Stats data
export const statsData = [
   {
      title: "Total Patients",
      value: "2,847",
      icon: Users,
      trend: { value: 12.5, isPositive: true },
      description: "Active patients in the system",
   },
   {
      title: "Total Coaches",
      value: "156",
      icon: UserCheck,
      trend: { value: 8.2, isPositive: true },
      description: "Certified health coaches",
   },
   {
      title: "Active Subscriptions",
      value: "1,892",
      icon: CreditCard,
      trend: { value: 15.3, isPositive: true },
      description: "Monthly recurring revenue",
   },
   {
      title: "Fulfilled Orders",
      value: "3,421",
      icon: Package,
      trend: { value: 5.7, isPositive: true },
      description: "Orders completed this month",
   },
];

// Chart data
export const userGrowthData = [
   { label: "Jan", value: 1200 },
   { label: "Feb", value: 1350 },
   { label: "Mar", value: 1420 },
   { label: "Apr", value: 1580 },
   { label: "May", value: 1720 },
   { label: "Jun", value: 2847 },
];

export const revenueData = [
   { label: "Jan", value: 45000 },
   { label: "Feb", value: 52000 },
   { label: "Mar", value: 48000 },
   { label: "Apr", value: 61000 },
   { label: "May", value: 68000 },
   { label: "Jun", value: 75000 },
];

export const engagementData = [
   { label: "Mon", value: 85 },
   { label: "Tue", value: 92 },
   { label: "Wed", value: 78 },
   { label: "Thu", value: 88 },
   { label: "Fri", value: 95 },
   { label: "Sat", value: 82 },
   { label: "Sun", value: 76 },
];

// Activity feed data
export const activityData = [
   {
      id: "1",
      type: "signup" as const,
      title: "New Patient Registration",
      description: "Sarah Johnson completed her health assessment",
      user: {
         name: "Sarah Johnson",
         avatar: "/avatars/sarah.jpg",
      },
      timestamp: "2 minutes ago",
      status: "completed" as const,
   },
   {
      id: "2",
      type: "message" as const,
      title: "New Message from Coach",
      description: "Dr. Michael Chen sent a message to patient #2847",
      user: {
         name: "Dr. Michael Chen",
      },
      timestamp: "15 minutes ago",
      status: "pending" as const,
   },
   {
      id: "3",
      type: "order" as const,
      title: "New Order Placed",
      description: "Premium subscription ordered by John Smith",
      user: {
         name: "John Smith",
      },
      timestamp: "1 hour ago",
      status: "completed" as const,
   },
   {
      id: "4",
      type: "alert" as const,
      title: "Screening Review Required",
      description: "Patient #2847 needs medical screening review",
      timestamp: "2 hours ago",
      status: "pending" as const,
   },
   {
      id: "5",
      type: "signup" as const,
      title: "New Coach Application",
      description: "Dr. Emily Rodriguez applied for coach position",
      user: {
         name: "Dr. Emily Rodriguez",
      },
      timestamp: "3 hours ago",
      status: "pending" as const,
   },
];

// Alerts data
export const alertsData = [
   {
      id: "1",
      type: "warning" as const,
      title: "Pending Screening Reviews",
      description: "5 patient screening reviews require immediate attention",
      timestamp: "1 hour ago",
      priority: "high" as const,
      actionRequired: true,
   },
   {
      id: "2",
      type: "error" as const,
      title: "Failed Payment Processing",
      description: "3 subscription payments failed to process",
      timestamp: "2 hours ago",
      priority: "high" as const,
      actionRequired: true,
   },
   {
      id: "3",
      type: "info" as const,
      title: "System Maintenance",
      description: "Scheduled maintenance in 2 hours",
      timestamp: "4 hours ago",
      priority: "medium" as const,
   },
   {
      id: "4",
      type: "success" as const,
      title: "Backup Completed",
      description: "Daily database backup completed successfully",
      timestamp: "6 hours ago",
      priority: "low" as const,
   },
];
