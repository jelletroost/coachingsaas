export interface IntakeRecord {
   id: string;
   patientName: string;
   patientEmail: string;
   patientId: string;
   submittedDate: string;
   status: "pending" | "approved" | "rejected" | "under_review";
   questionnaireType: "initial" | "follow_up" | "assessment";
   priority: "low" | "medium" | "high" | "urgent";
   assignedCoach?: string;
   followUpActions?: string[];
   recommendations?: string[];
   notes?: string;
   lastUpdated: string;
}

export interface IntakeStats {
   total: number;
   pending: number;
   approved: number;
   rejected: number;
   underReview: number;
   thisWeek: number;
   thisMonth: number;
}

export const intakeStats: IntakeStats = {
   total: 1247,
   pending: 89,
   approved: 892,
   rejected: 156,
   underReview: 110,
   thisWeek: 45,
   thisMonth: 187,
};

export const mockIntakes: IntakeRecord[] = [
   {
      id: "INT-001",
      patientName: "Sarah Johnson",
      patientEmail: "sarah.johnson@email.com",
      patientId: "PAT-001",
      submittedDate: "2024-01-15T10:30:00Z",
      status: "pending",
      questionnaireType: "initial",
      priority: "medium",
      lastUpdated: "2024-01-15T10:30:00Z",
   },
   {
      id: "INT-002",
      patientName: "Michael Chen",
      patientEmail: "michael.chen@email.com",
      patientId: "PAT-002",
      submittedDate: "2024-01-14T14:20:00Z",
      status: "approved",
      questionnaireType: "initial",
      priority: "high",
      assignedCoach: "Dr. Emily Rodriguez",
      followUpActions: [
         "Schedule initial consultation",
         "Send welcome materials",
      ],
      recommendations: [
         "Begin with basic nutrition plan",
         "Start light exercise routine",
      ],
      lastUpdated: "2024-01-15T09:15:00Z",
   },
   {
      id: "INT-003",
      patientName: "Lisa Thompson",
      patientEmail: "lisa.thompson@email.com",
      patientId: "PAT-003",
      submittedDate: "2024-01-13T16:45:00Z",
      status: "rejected",
      questionnaireType: "follow_up",
      priority: "low",
      notes: "Incomplete medical history provided",
      lastUpdated: "2024-01-14T11:30:00Z",
   },
   {
      id: "INT-004",
      patientName: "David Wilson",
      patientEmail: "david.wilson@email.com",
      patientId: "PAT-004",
      submittedDate: "2024-01-12T08:15:00Z",
      status: "under_review",
      questionnaireType: "assessment",
      priority: "urgent",
      assignedCoach: "Dr. James Miller",
      notes: "Requires immediate attention - high risk factors identified",
      lastUpdated: "2024-01-15T13:45:00Z",
   },
   {
      id: "INT-005",
      patientName: "Jennifer Davis",
      patientEmail: "jennifer.davis@email.com",
      patientId: "PAT-005",
      submittedDate: "2024-01-11T12:00:00Z",
      status: "approved",
      questionnaireType: "initial",
      priority: "medium",
      assignedCoach: "Dr. Sarah Williams",
      followUpActions: [
         "Schedule nutrition consultation",
         "Begin fitness assessment",
      ],
      recommendations: [
         "Start with Mediterranean diet",
         "Begin walking program",
      ],
      lastUpdated: "2024-01-12T15:20:00Z",
   },
   {
      id: "INT-006",
      patientName: "Robert Brown",
      patientEmail: "robert.brown@email.com",
      patientId: "PAT-006",
      submittedDate: "2024-01-10T09:30:00Z",
      status: "pending",
      questionnaireType: "initial",
      priority: "high",
      lastUpdated: "2024-01-10T09:30:00Z",
   },
   {
      id: "INT-007",
      patientName: "Amanda Garcia",
      patientEmail: "amanda.garcia@email.com",
      patientId: "PAT-007",
      submittedDate: "2024-01-09T15:45:00Z",
      status: "approved",
      questionnaireType: "follow_up",
      priority: "medium",
      assignedCoach: "Dr. Emily Rodriguez",
      followUpActions: ["Review progress", "Adjust treatment plan"],
      recommendations: ["Continue current regimen", "Increase protein intake"],
      lastUpdated: "2024-01-10T10:15:00Z",
   },
   {
      id: "INT-008",
      patientName: "Christopher Lee",
      patientEmail: "christopher.lee@email.com",
      patientId: "PAT-008",
      submittedDate: "2024-01-08T11:20:00Z",
      status: "rejected",
      questionnaireType: "initial",
      priority: "low",
      notes: "Missing required medical documentation",
      lastUpdated: "2024-01-09T14:30:00Z",
   },
   {
      id: "INT-009",
      patientName: "Maria Rodriguez",
      patientEmail: "maria.rodriguez@email.com",
      patientId: "PAT-009",
      submittedDate: "2024-01-07T13:10:00Z",
      status: "under_review",
      questionnaireType: "assessment",
      priority: "high",
      assignedCoach: "Dr. James Miller",
      notes: "Complex medical history - requires specialist review",
      lastUpdated: "2024-01-08T16:45:00Z",
   },
   {
      id: "INT-010",
      patientName: "Kevin Martinez",
      patientEmail: "kevin.martinez@email.com",
      patientId: "PAT-010",
      submittedDate: "2024-01-06T10:00:00Z",
      status: "approved",
      questionnaireType: "initial",
      priority: "medium",
      assignedCoach: "Dr. Sarah Williams",
      followUpActions: ["Schedule initial meeting", "Send program materials"],
      recommendations: ["Begin with basic nutrition", "Start light cardio"],
      lastUpdated: "2024-01-07T12:30:00Z",
   },
];

export const filterOptions = {
   status: [
      { value: "all", label: "All Status" },
      { value: "pending", label: "Pending" },
      { value: "approved", label: "Approved" },
      { value: "rejected", label: "Rejected" },
      { value: "under_review", label: "Under Review" },
   ],
   questionnaireType: [
      { value: "all", label: "All Types" },
      { value: "initial", label: "Initial" },
      { value: "follow_up", label: "Follow-up" },
      { value: "assessment", label: "Assessment" },
   ],
   priority: [
      { value: "all", label: "All Priorities" },
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "urgent", label: "Urgent" },
   ],
   dateRange: [
      { value: "all", label: "All Time" },
      { value: "today", label: "Today" },
      { value: "week", label: "This Week" },
      { value: "month", label: "This Month" },
      { value: "quarter", label: "This Quarter" },
   ],
};

export const coaches = [
   "Dr. Emily Rodriguez",
   "Dr. James Miller",
   "Dr. Sarah Williams",
   "Dr. Michael Johnson",
   "Dr. Lisa Anderson",
];
