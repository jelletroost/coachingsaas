// Program Data
export const programData = {
   id: "1",
   name: "12-Week Health Transformation",
   description:
      "A comprehensive program to improve your overall health and wellness",
   status: "active",
   progress: 65,
   completedWeeks: 8,
   totalWeeks: 12,
   overview:
      "This 12-week program is designed to help you build healthy habits, improve your nutrition, increase physical activity, and enhance your overall well-being. You'll work closely with your health coach to achieve your personal health goals.",
   learningOutcomes: [
      "Develop sustainable healthy eating habits",
      "Build a consistent exercise routine",
      "Improve sleep quality and stress management",
      "Track and monitor your health metrics",
      "Create long-term lifestyle changes",
   ],
   weeklySchedule: [
      {
         week: 1,
         activities: [
            { title: "Initial health assessment", completed: true },
            { title: "Goal setting session", completed: true },
            { title: "Nutrition basics workshop", completed: true },
            { title: "First workout session", completed: true },
         ],
      },
      {
         week: 2,
         activities: [
            { title: "Progress check-in", completed: true },
            { title: "Meal planning session", completed: true },
            { title: "Exercise routine adjustment", completed: true },
            { title: "Stress management techniques", completed: false },
         ],
      },
      {
         week: 3,
         activities: [
            { title: "Weekly review", completed: true },
            { title: "Nutrition tracking setup", completed: true },
            { title: "Workout progression", completed: true },
            { title: "Sleep optimization", completed: true },
         ],
      },
      {
         week: 4,
         activities: [
            { title: "Monthly assessment", completed: true },
            { title: "Goal review and adjustment", completed: true },
            { title: "Advanced nutrition topics", completed: true },
            { title: "Strength training introduction", completed: false },
         ],
      },
      {
         week: 5,
         activities: [
            { title: "Progress evaluation", completed: true },
            { title: "Habit formation review", completed: true },
            { title: "Workout variety introduction", completed: true },
            { title: "Mindfulness practices", completed: true },
         ],
      },
      {
         week: 6,
         activities: [
            { title: "Mid-program assessment", completed: true },
            { title: "Nutrition optimization", completed: true },
            { title: "Exercise routine refinement", completed: true },
            { title: "Recovery and rest strategies", completed: false },
         ],
      },
      {
         week: 7,
         activities: [
            { title: "Weekly check-in", completed: true },
            { title: "Advanced meal planning", completed: true },
            { title: "Performance tracking", completed: true },
            { title: "Lifestyle integration", completed: false },
         ],
      },
      {
         week: 8,
         activities: [
            { title: "Progress review", completed: true },
            { title: "Nutrition fine-tuning", completed: false },
            { title: "Workout optimization", completed: false },
            { title: "Stress resilience building", completed: false },
         ],
      },
      {
         week: 9,
         activities: [
            { title: "Weekly assessment", completed: false },
            { title: "Advanced nutrition strategies", completed: false },
            { title: "Performance enhancement", completed: false },
            { title: "Goal achievement planning", completed: false },
         ],
      },
      {
         week: 10,
         activities: [
            { title: "Progress evaluation", completed: false },
            { title: "Lifestyle maintenance strategies", completed: false },
            { title: "Long-term planning", completed: false },
            { title: "Community engagement", completed: false },
         ],
      },
      {
         week: 11,
         activities: [
            { title: "Final preparation", completed: false },
            { title: "Sustainability planning", completed: false },
            { title: "Transition strategies", completed: false },
            { title: "Future goal setting", completed: false },
         ],
      },
      {
         week: 12,
         activities: [
            { title: "Final assessment", completed: false },
            { title: "Program completion review", completed: false },
            { title: "Maintenance plan creation", completed: false },
            { title: "Graduation celebration", completed: false },
         ],
      },
   ],
};

// Goals Data
export const goalsData = [
   {
      id: "1",
      title: "Lose 10 pounds",
      description:
         "Achieve a healthy weight loss through balanced nutrition and exercise",
      status: "in-progress" as const,
      progress: 70,
      dueDate: "2024-02-15",
   },
   {
      id: "2",
      title: "Exercise 5 days per week",
      description:
         "Build a consistent exercise routine with at least 30 minutes of activity",
      status: "completed" as const,
      progress: 100,
      dueDate: "2024-01-30",
   },
   {
      id: "3",
      title: "Improve sleep quality",
      description:
         "Establish better sleep habits and achieve 7-8 hours of quality sleep",
      status: "in-progress" as const,
      progress: 60,
      dueDate: "2024-02-20",
   },
   {
      id: "4",
      title: "Reduce stress levels",
      description: "Learn and practice stress management techniques",
      status: "upcoming" as const,
      progress: 0,
      dueDate: "2024-03-01",
   },
   {
      id: "5",
      title: "Improve nutrition habits",
      description: "Develop healthy eating patterns and meal planning skills",
      status: "completed" as const,
      progress: 100,
      dueDate: "2024-01-25",
   },
   {
      id: "6",
      title: "Increase daily steps",
      description: "Achieve 10,000 steps per day consistently",
      status: "in-progress" as const,
      progress: 85,
      dueDate: "2024-02-10",
   },
];

// Milestones Data
export const milestonesData = [
   {
      id: "1",
      title: "First Week Complete",
      description: "Successfully completed the first week of the program",
      week: 1,
      status: "completed" as const,
      achievedDate: "2024-01-07",
   },
   {
      id: "2",
      title: "Habit Formation",
      description: "Established consistent daily routines",
      week: 3,
      status: "completed" as const,
      achievedDate: "2024-01-21",
   },
   {
      id: "3",
      title: "Mid-Program Assessment",
      description: "Completed comprehensive mid-program evaluation",
      week: 6,
      status: "completed" as const,
      achievedDate: "2024-02-11",
   },
   {
      id: "4",
      title: "Performance Optimization",
      description: "Advanced to higher intensity workouts and nutrition",
      week: 8,
      status: "upcoming" as const,
   },
   {
      id: "5",
      title: "Lifestyle Integration",
      description: "Successfully integrated healthy habits into daily life",
      week: 10,
      status: "upcoming" as const,
   },
   {
      id: "6",
      title: "Program Completion",
      description: "Graduated from the 12-week transformation program",
      week: 12,
      status: "upcoming" as const,
   },
];
