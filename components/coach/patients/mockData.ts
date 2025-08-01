// Patient data based on API response
export interface Patient {
   id: string;
   user_id: string;
   date_of_birth: string | null;
   phone: string | null;
   avatar_url: string | null;
   account_status: "active" | "inactive" | "pending";
   created_at: string;
   updated_at: string;
   assigned_coach_id: string;
   user: {
      id: string;
      role: string;
      email: string;
      last_name: string;
      first_name: string;
      created_at: string;
      updated_at: string;
   };
}

// Computed properties for display
export interface PatientDisplay {
   id: string;
   name: string;
   email: string;
   avatar?: string;
   status: string;
   joinDate: string;
   lastActive: string;
   assignedCoach: string;
}

export const patientsData: Patient[] = [
   {
      id: "1",
      user_id: "1",
      date_of_birth: "1990-01-01",
      phone: "123-456-7890",
      avatar_url: "https://via.placeholder.com/50",
      account_status: "active",
      created_at: "2024-01-15T10:00:00Z",
      updated_at: "2024-01-20T14:30:00Z",
      assigned_coach_id: "coach1",
      user: {
         id: "user1",
         role: "patient",
         email: "sarah.johnson@email.com",
         last_name: "Johnson",
         first_name: "Sarah",
         created_at: "2024-01-15T10:00:00Z",
         updated_at: "2024-01-20T14:30:00Z",
      },
   },
   {
      id: "2",
      user_id: "2",
      date_of_birth: "1985-05-10",
      phone: "987-654-3210",
      avatar_url: "https://via.placeholder.com/50",
      account_status: "active",
      created_at: "2024-01-10T09:00:00Z",
      updated_at: "2024-01-19T11:00:00Z",
      assigned_coach_id: "coach1",
      user: {
         id: "user2",
         role: "patient",
         email: "mike.davis@email.com",
         last_name: "Davis",
         first_name: "Mike",
         created_at: "2024-01-10T09:00:00Z",
         updated_at: "2024-01-19T11:00:00Z",
      },
   },
   {
      id: "3",
      user_id: "3",
      date_of_birth: "1992-02-20",
      phone: null,
      avatar_url: "https://via.placeholder.com/50",
      account_status: "active",
      created_at: "2024-01-05T10:00:00Z",
      updated_at: "2024-01-18T15:00:00Z",
      assigned_coach_id: "coach1",
      user: {
         id: "user3",
         role: "patient",
         email: "emma.wilson@email.com",
         last_name: "Wilson",
         first_name: "Emma",
         created_at: "2024-01-05T10:00:00Z",
         updated_at: "2024-01-18T15:00:00Z",
      },
   },
   {
      id: "4",
      user_id: "4",
      date_of_birth: "1988-07-15",
      phone: "111-222-3333",
      avatar_url: "https://via.placeholder.com/50",
      account_status: "active",
      created_at: "2024-01-12T09:00:00Z",
      updated_at: "2024-01-17T10:00:00Z",
      assigned_coach_id: "coach1",
      user: {
         id: "user4",
         role: "patient",
         email: "david.brown@email.com",
         last_name: "Brown",
         first_name: "David",
         created_at: "2024-01-12T09:00:00Z",
         updated_at: "2024-01-17T10:00:00Z",
      },
   },
   {
      id: "5",
      user_id: "5",
      date_of_birth: "1995-11-01",
      phone: "444-555-6666",
      avatar_url: "https://via.placeholder.com/50",
      account_status: "inactive",
      created_at: "2023-12-20T10:00:00Z",
      updated_at: "2024-01-10T11:00:00Z",
      assigned_coach_id: "coach1",
      user: {
         id: "user5",
         role: "patient",
         email: "lisa.chen@email.com",
         last_name: "Chen",
         first_name: "Lisa",
         created_at: "2023-12-20T10:00:00Z",
         updated_at: "2024-01-10T11:00:00Z",
      },
   },
   {
      id: "6",
      user_id: "6",
      date_of_birth: null,
      phone: null,
      avatar_url: "https://via.placeholder.com/50",
      account_status: "pending",
      created_at: "2024-01-22T10:00:00Z",
      updated_at: "2024-01-22T10:00:00Z",
      assigned_coach_id: "coach1",
      user: {
         id: "user6",
         role: "patient",
         email: "john.smith@email.com",
         last_name: "Smith",
         first_name: "John",
         created_at: "2024-01-22T10:00:00Z",
         updated_at: "2024-01-22T10:00:00Z",
      },
   },
];

// Patient statistics
export const patientStats = {
   total: patientsData.length,
   active: patientsData.filter((p) => p.account_status === "active").length,
   inactive: patientsData.filter((p) => p.account_status === "inactive").length,
   pending: patientsData.filter((p) => p.account_status === "pending").length,
   averageProgress: 75, // Placeholder since we don't have progress data
   averageSatisfaction: "4.5", // Placeholder since we don't have satisfaction data
   totalSessions: 45, // Placeholder since we don't have sessions data
   unreadMessages: 12, // Placeholder since we don't have messages data
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
