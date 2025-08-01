import { CheckCircle, Clock, FileText, User } from "lucide-react";

// Intake History Statistics Data
export const intakeHistoryStatsData = [
   {
      title: "Total Intakes",
      value: "8",
      icon: FileText,
      description: "All time submissions",
   },
   {
      title: "Completed",
      value: "6",
      icon: CheckCircle,
      description: "Successfully completed",
   },
   {
      title: "In Progress",
      value: "1",
      icon: Clock,
      description: "Currently being reviewed",
   },
   {
      title: "Follow-ups",
      value: "1",
      icon: User,
      description: "Requires follow-up",
   },
];

// Intake History Data
export const intakeHistoryData = [
   {
      id: "1",
      intakeNumber: "INT-2024-001",
      submittedDate: "2024-01-15",
      status: "completed" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "initial" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2024-01-16",
      completionDate: "2024-01-16",
      healthConcerns: ["Weight management", "Stress", "Sleep issues"],
      goals: ["Lose 20 pounds", "Improve sleep quality", "Reduce stress"],
      recommendations: [
         "Start with 30-minute daily walks",
         "Implement stress management techniques",
         "Establish consistent sleep schedule",
      ],
      notes: "Patient shows good motivation and realistic goals. Ready to begin coaching program.",
   },
   {
      id: "2",
      intakeNumber: "INT-2024-002",
      submittedDate: "2024-01-10",
      status: "completed" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "follow_up" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2024-01-11",
      completionDate: "2024-01-11",
      healthConcerns: ["Progress tracking", "Plateau in weight loss"],
      goals: ["Continue weight loss", "Build muscle", "Improve fitness"],
      recommendations: [
         "Increase workout intensity",
         "Adjust nutrition plan",
         "Add strength training",
      ],
      notes: "Good progress shown. Ready to advance to next phase of program.",
   },
   {
      id: "3",
      intakeNumber: "INT-2024-003",
      submittedDate: "2024-01-08",
      status: "in_progress" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "assessment" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: null,
      completionDate: null,
      healthConcerns: ["Fitness assessment", "Performance goals"],
      goals: ["Improve running endurance", "Increase strength"],
      recommendations: [],
      notes: "Assessment in progress. Coach will review and provide feedback.",
   },
   {
      id: "4",
      intakeNumber: "INT-2024-004",
      submittedDate: "2024-01-05",
      status: "requires_followup" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "screening" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2024-01-06",
      completionDate: null,
      healthConcerns: ["Blood pressure concerns", "Family history"],
      goals: ["Lower blood pressure", "Improve cardiovascular health"],
      recommendations: [
         "Consult with primary care physician",
         "Monitor blood pressure daily",
         "Reduce sodium intake",
      ],
      notes: "Patient needs medical clearance before starting intensive program. Follow-up required.",
   },
   {
      id: "5",
      intakeNumber: "INT-2023-012",
      submittedDate: "2023-12-20",
      status: "completed" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "follow_up" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2023-12-21",
      completionDate: "2023-12-21",
      healthConcerns: ["Holiday weight gain", "Stress management"],
      goals: ["Maintain weight", "Manage holiday stress"],
      recommendations: [
         "Continue regular exercise routine",
         "Practice stress management techniques",
         "Maintain healthy eating habits",
      ],
      notes: "Patient maintained good habits during holidays. Continuing with program.",
   },
   {
      id: "6",
      intakeNumber: "INT-2023-011",
      submittedDate: "2023-12-15",
      status: "completed" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "assessment" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2023-12-16",
      completionDate: "2023-12-16",
      healthConcerns: ["Progress evaluation", "Goal achievement"],
      goals: ["Evaluate current progress", "Set new goals"],
      recommendations: [
         "Continue current program",
         "Set new weight loss targets",
         "Add variety to workouts",
      ],
      notes: "Excellent progress shown. Patient exceeded initial goals.",
   },
   {
      id: "7",
      intakeNumber: "INT-2023-010",
      submittedDate: "2023-12-10",
      status: "completed" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "follow_up" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2023-12-11",
      completionDate: "2023-12-11",
      healthConcerns: ["Workout consistency", "Nutrition adherence"],
      goals: ["Improve consistency", "Better meal planning"],
      recommendations: [
         "Schedule workouts in advance",
         "Meal prep on weekends",
         "Use food tracking app",
      ],
      notes: "Patient struggling with consistency. Additional support provided.",
   },
   {
      id: "8",
      intakeNumber: "INT-2023-009",
      submittedDate: "2023-12-05",
      status: "completed" as
         | "completed"
         | "in_progress"
         | "requires_followup"
         | "pending",
      questionnaireType: "initial" as
         | "initial"
         | "follow_up"
         | "assessment"
         | "screening",
      assignedCoach: "Dr. Sarah Johnson",
      coachAvatar: "/avatars/sarah.jpg",
      reviewDate: "2023-12-06",
      completionDate: "2023-12-06",
      healthConcerns: ["General fitness", "Weight management"],
      goals: ["Get in shape", "Lose 15 pounds"],
      recommendations: [
         "Start with beginner workouts",
         "Focus on nutrition education",
         "Set realistic milestones",
      ],
      notes: "New patient with good baseline health. Ready to begin fitness journey.",
   },
];

export interface IntakeHistoryRecord {
   id: string;
   intakeNumber: string;
   submittedDate: string;
   status: "completed" | "in_progress" | "requires_followup" | "pending";
   questionnaireType: "initial" | "follow_up" | "assessment" | "screening";
   assignedCoach: string;
   coachAvatar?: string;
   reviewDate: string | null;
   completionDate: string | null;
   healthConcerns: string[];
   goals: string[];
   recommendations: string[];
   notes: string;
}
