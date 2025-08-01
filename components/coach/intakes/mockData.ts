// Intake form data
export interface IntakeForm {
   id: string;
   patientName: string;
   patientEmail: string;
   patientId: string;
   submittedDate: string;
   status:
      | "pending"
      | "reviewed"
      | "approved"
      | "rejected"
      | "requires_followup";
   priority: "low" | "medium" | "high" | "urgent";
   questionnaireType: "initial" | "follow_up" | "assessment" | "screening";
   assignedCoach?: string;
   reviewNotes?: string;
   followUpActions?: string[];
   recommendations?: string[];
   healthConcerns: string[];
   medications: string[];
   allergies: string[];
   familyHistory: string[];
   lifestyleFactors: {
      exercise: string;
      diet: string;
      sleep: string;
      stress: string;
      smoking: string;
      alcohol: string;
   };
   goals: string[];
   emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
   };
   insuranceInfo?: {
      provider: string;
      policyNumber: string;
      groupNumber?: string;
   };
   lastUpdated: string;
}

export const intakeFormsData: IntakeForm[] = [
   {
      id: "INT-001",
      patientName: "Sarah Johnson",
      patientEmail: "sarah.johnson@email.com",
      patientId: "PAT-001",
      submittedDate: "2024-01-20",
      status: "pending",
      priority: "high",
      questionnaireType: "initial",
      assignedCoach: "Dr. Michael Chen",
      healthConcerns: ["Weight management", "Stress", "Sleep issues"],
      medications: ["Vitamin D", "Omega-3"],
      allergies: ["Peanuts"],
      familyHistory: ["Diabetes (mother)", "Heart disease (father)"],
      lifestyleFactors: {
         exercise: "Light walking 2-3 times per week",
         diet: "Generally healthy, but struggles with portion control",
         sleep: "6-7 hours per night, often interrupted",
         stress: "High stress from work",
         smoking: "Never",
         alcohol: "Occasional glass of wine",
      },
      goals: ["Lose 20 pounds", "Improve sleep quality", "Reduce stress"],
      emergencyContact: {
         name: "John Johnson",
         relationship: "Husband",
         phone: "(555) 123-4567",
      },
      insuranceInfo: {
         provider: "Blue Cross Blue Shield",
         policyNumber: "BCBS123456",
         groupNumber: "GRP789",
      },
      lastUpdated: "2024-01-20",
   },
   {
      id: "INT-002",
      patientName: "Mike Davis",
      patientEmail: "mike.davis@email.com",
      patientId: "PAT-002",
      submittedDate: "2024-01-19",
      status: "reviewed",
      priority: "medium",
      questionnaireType: "initial",
      assignedCoach: "Dr. Michael Chen",
      reviewNotes:
         "Patient shows good understanding of health goals. Ready for initial consultation.",
      followUpActions: [
         "Schedule initial consultation",
         "Review blood pressure monitoring",
      ],
      recommendations: [
         "Start blood pressure log",
         "Begin light exercise routine",
      ],
      healthConcerns: ["High blood pressure", "Medication management"],
      medications: ["Lisinopril", "Metformin"],
      allergies: ["Sulfa drugs"],
      familyHistory: ["Hypertension (father)", "Diabetes (mother)"],
      lifestyleFactors: {
         exercise: "Sedentary, occasional walking",
         diet: "High sodium intake, irregular meals",
         sleep: "5-6 hours per night",
         stress: "Moderate stress from work",
         smoking: "Quit 2 years ago",
         alcohol: "1-2 drinks per week",
      },
      goals: [
         "Control blood pressure",
         "Improve diet",
         "Increase physical activity",
      ],
      emergencyContact: {
         name: "Lisa Davis",
         relationship: "Wife",
         phone: "(555) 234-5678",
      },
      lastUpdated: "2024-01-19",
   },
   {
      id: "INT-003",
      patientName: "Emma Wilson",
      patientEmail: "emma.wilson@email.com",
      patientId: "PAT-003",
      submittedDate: "2024-01-18",
      status: "approved",
      priority: "low",
      questionnaireType: "follow_up",
      assignedCoach: "Dr. Michael Chen",
      reviewNotes:
         "Excellent progress reported. Ready for advanced fitness program.",
      followUpActions: ["Schedule fitness assessment", "Update exercise plan"],
      recommendations: [
         "Continue current routine",
         "Consider strength training",
      ],
      healthConcerns: ["Fitness goals", "Nutrition optimization"],
      medications: ["Multivitamin"],
      allergies: ["None"],
      familyHistory: ["No significant history"],
      lifestyleFactors: {
         exercise: "Regular gym workouts 4-5 times per week",
         diet: "Balanced diet with protein focus",
         sleep: "7-8 hours per night",
         stress: "Low stress, good work-life balance",
         smoking: "Never",
         alcohol: "Rarely",
      },
      goals: [
         "Build muscle mass",
         "Improve athletic performance",
         "Optimize nutrition",
      ],
      emergencyContact: {
         name: "David Wilson",
         relationship: "Brother",
         phone: "(555) 345-6789",
      },
      lastUpdated: "2024-01-18",
   },
   {
      id: "INT-004",
      patientName: "David Brown",
      patientEmail: "david.brown@email.com",
      patientId: "PAT-004",
      submittedDate: "2024-01-17",
      status: "requires_followup",
      priority: "urgent",
      questionnaireType: "screening",
      assignedCoach: "Dr. Michael Chen",
      reviewNotes:
         "Patient reports concerning symptoms. Requires immediate medical evaluation.",
      followUpActions: [
         "Urgent medical consultation",
         "Blood work ordered",
         "Cardiologist referral",
      ],
      recommendations: [
         "Immediate lifestyle changes",
         "Medication review with doctor",
      ],
      healthConcerns: [
         "Chest pain",
         "Shortness of breath",
         "Diabetes management",
      ],
      medications: ["Metformin", "Glipizide", "Aspirin"],
      allergies: ["Penicillin"],
      familyHistory: ["Heart disease (father)", "Diabetes (both parents)"],
      lifestyleFactors: {
         exercise: "Minimal physical activity",
         diet: "High carb, high fat diet",
         sleep: "4-5 hours per night",
         stress: "Very high stress",
         smoking: "1 pack per day",
         alcohol: "3-4 drinks per day",
      },
      goals: ["Quit smoking", "Control diabetes", "Improve heart health"],
      emergencyContact: {
         name: "Mary Brown",
         relationship: "Daughter",
         phone: "(555) 456-7890",
      },
      lastUpdated: "2024-01-17",
   },
   {
      id: "INT-005",
      patientName: "Lisa Chen",
      patientEmail: "lisa.chen@email.com",
      patientId: "PAT-005",
      submittedDate: "2024-01-16",
      status: "rejected",
      priority: "medium",
      questionnaireType: "initial",
      assignedCoach: "Dr. Michael Chen",
      reviewNotes:
         "Patient does not meet eligibility criteria for our program.",
      followUpActions: ["Refer to specialist", "Provide alternative resources"],
      recommendations: [
         "Consult with psychiatrist",
         "Consider therapy options",
      ],
      healthConcerns: ["Severe anxiety", "Depression", "Eating disorder"],
      medications: ["Sertraline", "Alprazolam"],
      allergies: ["None"],
      familyHistory: ["Depression (mother)", "Anxiety (sister)"],
      lifestyleFactors: {
         exercise: "No exercise",
         diet: "Irregular eating patterns",
         sleep: "3-4 hours per night",
         stress: "Extremely high stress",
         smoking: "Occasional",
         alcohol: "2-3 drinks per day",
      },
      goals: ["Manage anxiety", "Improve mental health", "Establish routine"],
      emergencyContact: {
         name: "Robert Chen",
         relationship: "Father",
         phone: "(555) 567-8901",
      },
      lastUpdated: "2024-01-16",
   },
   {
      id: "INT-006",
      patientName: "John Smith",
      patientEmail: "john.smith@email.com",
      patientId: "PAT-006",
      submittedDate: "2024-01-15",
      status: "pending",
      priority: "low",
      questionnaireType: "assessment",
      assignedCoach: "Dr. Michael Chen",
      healthConcerns: ["General wellness", "Preventive care"],
      medications: ["None"],
      allergies: ["None"],
      familyHistory: ["No significant history"],
      lifestyleFactors: {
         exercise: "Regular walking and yoga",
         diet: "Vegetarian diet",
         sleep: "8 hours per night",
         stress: "Low stress",
         smoking: "Never",
         alcohol: "Occasional",
      },
      goals: ["Maintain current health", "Learn preventive strategies"],
      emergencyContact: {
         name: "Jane Smith",
         relationship: "Wife",
         phone: "(555) 678-9012",
      },
      lastUpdated: "2024-01-15",
   },
];

// Intake statistics
export const intakeStats = {
   total: intakeFormsData.length,
   pending: intakeFormsData.filter((i) => i.status === "pending").length,
   reviewed: intakeFormsData.filter((i) => i.status === "reviewed").length,
   approved: intakeFormsData.filter((i) => i.status === "approved").length,
   rejected: intakeFormsData.filter((i) => i.status === "rejected").length,
   requiresFollowup: intakeFormsData.filter(
      (i) => i.status === "requires_followup"
   ).length,
   urgent: intakeFormsData.filter((i) => i.priority === "urgent").length,
   high: intakeFormsData.filter((i) => i.priority === "high").length,
   thisWeek: intakeFormsData.filter((i) => {
      const date = new Date(i.submittedDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date >= weekAgo;
   }).length,
};

// Filter options
export const statusOptions = [
   { value: "all", label: "All Statuses" },
   { value: "pending", label: "Pending Review" },
   { value: "reviewed", label: "Reviewed" },
   { value: "approved", label: "Approved" },
   { value: "rejected", label: "Rejected" },
   { value: "requires_followup", label: "Requires Follow-up" },
];

export const priorityOptions = [
   { value: "all", label: "All Priorities" },
   { value: "urgent", label: "Urgent" },
   { value: "high", label: "High" },
   { value: "medium", label: "Medium" },
   { value: "low", label: "Low" },
];

export const questionnaireTypeOptions = [
   { value: "all", label: "All Types" },
   { value: "initial", label: "Initial Intake" },
   { value: "follow_up", label: "Follow-up" },
   { value: "assessment", label: "Assessment" },
   { value: "screening", label: "Screening" },
];

// Recent activities for intakes
export const intakeActivities = [
   {
      id: "1",
      intakeId: "INT-001",
      patientName: "Sarah Johnson",
      type: "submitted" as const,
      title: "New Intake Submitted",
      description: "Initial intake form submitted by Sarah Johnson",
      timestamp: "2 hours ago",
      status: "pending" as const,
   },
   {
      id: "2",
      intakeId: "INT-002",
      patientName: "Mike Davis",
      type: "reviewed" as const,
      title: "Intake Reviewed",
      description: "Intake form reviewed and approved for consultation",
      timestamp: "4 hours ago",
      status: "completed" as const,
   },
   {
      id: "3",
      intakeId: "INT-004",
      patientName: "David Brown",
      type: "urgent" as const,
      title: "Urgent Follow-up Required",
      description: "Patient requires immediate medical evaluation",
      timestamp: "1 day ago",
      status: "pending" as const,
   },
   {
      id: "4",
      intakeId: "INT-003",
      patientName: "Emma Wilson",
      type: "approved" as const,
      title: "Intake Approved",
      description: "Follow-up intake approved for advanced program",
      timestamp: "2 days ago",
      status: "completed" as const,
   },
];
