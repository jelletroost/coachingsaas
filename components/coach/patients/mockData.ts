// Patient data
export interface Patient {
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

export const patientsData: Patient[] = [
   {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      progress: 85,
      goals: ["Weight loss", "Better sleep", "Stress management"],
      nextAppointment: {
         date: "2024-01-25",
         time: "10:00 AM",
         type: "Wellness Check",
      },
      unreadMessages: 2,
      totalSessions: 12,
      satisfaction: 4.8,
      healthMetrics: {
         weight: 68,
         bloodPressure: "120/80",
         heartRate: 72,
         sleepHours: 7.5,
      },
      notes: "Responding well to new exercise routine. Showing good progress with stress management techniques.",
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "2",
      name: "Mike Davis",
      email: "mike.davis@email.com",
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-01-19",
      progress: 72,
      goals: [
         "Blood pressure control",
         "Medication adherence",
         "Exercise routine",
      ],
      nextAppointment: {
         date: "2024-01-26",
         time: "2:30 PM",
         type: "Medication Review",
      },
      unreadMessages: 1,
      totalSessions: 8,
      satisfaction: 4.6,
      healthMetrics: {
         weight: 82,
         bloodPressure: "135/85",
         heartRate: 78,
         sleepHours: 6.5,
      },
      notes: "Concerned about medication side effects. Needs follow-up on blood pressure monitoring.",
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      status: "active",
      joinDate: "2024-01-05",
      lastActive: "2024-01-18",
      progress: 91,
      goals: ["Fitness goals", "Nutrition planning", "Mental wellness"],
      nextAppointment: {
         date: "2024-01-24",
         time: "11:00 AM",
         type: "Goal Setting",
      },
      unreadMessages: 0,
      totalSessions: 15,
      satisfaction: 4.9,
      healthMetrics: {
         weight: 55,
         bloodPressure: "110/70",
         heartRate: 65,
         sleepHours: 8.0,
      },
      notes: "Excellent progress with fitness goals. Ready to set new challenges.",
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "4",
      name: "David Brown",
      email: "david.brown@email.com",
      status: "active",
      joinDate: "2024-01-12",
      lastActive: "2024-01-17",
      progress: 68,
      goals: ["Diabetes management", "Weight control", "Diet planning"],
      nextAppointment: {
         date: "2024-01-27",
         time: "3:00 PM",
         type: "Progress Review",
      },
      unreadMessages: 3,
      totalSessions: 6,
      satisfaction: 4.4,
      healthMetrics: {
         weight: 90,
         bloodPressure: "140/90",
         heartRate: 85,
         sleepHours: 6.0,
      },
      notes: "Struggling with diet adherence. Needs more support with meal planning.",
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "5",
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      status: "inactive",
      joinDate: "2023-12-20",
      lastActive: "2024-01-10",
      progress: 45,
      goals: ["Anxiety management", "Sleep improvement", "Work-life balance"],
      unreadMessages: 5,
      totalSessions: 4,
      satisfaction: 3.8,
      healthMetrics: {
         weight: 58,
         bloodPressure: "115/75",
         heartRate: 70,
         sleepHours: 5.5,
      },
      notes: "Hasn't responded to recent messages. May need outreach to re-engage.",
      assignedCoach: "Dr. Michael Chen",
   },
   {
      id: "6",
      name: "John Smith",
      email: "john.smith@email.com",
      status: "pending",
      joinDate: "2024-01-22",
      lastActive: "2024-01-22",
      progress: 0,
      goals: ["Initial assessment pending"],
      unreadMessages: 1,
      totalSessions: 0,
      satisfaction: 0,
      healthMetrics: {},
      notes: "New patient. Initial assessment scheduled for next week.",
      assignedCoach: "Dr. Michael Chen",
   },
];

// Patient statistics
export const patientStats = {
   total: patientsData.length,
   active: patientsData.filter((p) => p.status === "active").length,
   inactive: patientsData.filter((p) => p.status === "inactive").length,
   pending: patientsData.filter((p) => p.status === "pending").length,
   averageProgress: Math.round(
      patientsData.reduce((acc, p) => acc + p.progress, 0) / patientsData.length
   ),
   averageSatisfaction: (
      patientsData.reduce((acc, p) => acc + p.satisfaction, 0) /
      patientsData.length
   ).toFixed(1),
   totalSessions: patientsData.reduce((acc, p) => acc + p.totalSessions, 0),
   unreadMessages: patientsData.reduce((acc, p) => acc + p.unreadMessages, 0),
};

// Filter options
export const statusOptions = [
   { value: "all", label: "All Patients" },
   { value: "active", label: "Active" },
   { value: "inactive", label: "Inactive" },
   { value: "pending", label: "Pending" },
];

export const progressOptions = [
   { value: "all", label: "All Progress" },
   { value: "high", label: "High Progress (80%+)" },
   { value: "medium", label: "Medium Progress (50-79%)" },
   { value: "low", label: "Low Progress (<50%)" },
];

// Recent activities for patients
export const patientActivities = [
   {
      id: "1",
      patientId: "1",
      patientName: "Sarah Johnson",
      type: "assessment" as const,
      title: "Weekly Assessment Completed",
      description: "Completed health assessment with 85% progress",
      timestamp: "2 hours ago",
      status: "completed" as const,
   },
   {
      id: "2",
      patientId: "2",
      patientName: "Mike Davis",
      type: "message" as const,
      title: "New Message",
      description: "Sent message about medication concerns",
      timestamp: "4 hours ago",
      status: "pending" as const,
   },
   {
      id: "3",
      patientId: "3",
      patientName: "Emma Wilson",
      type: "goal" as const,
      title: "Goal Achievement",
      description: "Achieved fitness milestone",
      timestamp: "1 day ago",
      status: "completed" as const,
   },
   {
      id: "4",
      patientId: "4",
      patientName: "David Brown",
      type: "appointment" as const,
      title: "Appointment Scheduled",
      description: "Scheduled progress review for next week",
      timestamp: "2 days ago",
      status: "completed" as const,
   },
];
