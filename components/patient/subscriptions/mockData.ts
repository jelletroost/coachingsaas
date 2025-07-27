// Current Subscription Data
export const subscriptionData = {
   id: "sub_123456789",
   status: "active" as "active" | "cancelled" | "past_due" | "incomplete",
   plan: {
      id: "plan_premium",
      name: "Premium Health Coaching",
      description: "Comprehensive health coaching with unlimited support",
      price: 99.99,
      features: {
         coachingSessions: 8,
         resources: "Unlimited",
         support: "24/7",
         assessments: "Monthly",
         progressTracking: true,
         mealPlans: true,
         workoutPlans: true,
      },
   },
   nextBillingDate: "2024-02-15",
   billingCycle: "Monthly",
   startDate: "2023-12-15",
   paymentMethod: {
      id: "pm_123456789",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
   },
   usage: {
      sessionsUsed: 6,
      resourcesDownloaded: 15,
      sessionHistory: [
         {
            title: "Weekly Check-in with Dr. Johnson",
            date: "2024-01-10",
            duration: 30,
         },
         {
            title: "Nutrition Consultation",
            date: "2024-01-08",
            duration: 45,
         },
         {
            title: "Progress Review",
            date: "2024-01-05",
            duration: 30,
         },
         {
            title: "Goal Setting Session",
            date: "2024-01-03",
            duration: 45,
         },
         {
            title: "Fitness Assessment",
            date: "2024-01-01",
            duration: 60,
         },
         {
            title: "Initial Consultation",
            date: "2023-12-15",
            duration: 60,
         },
      ],
      resourceHistory: [
         {
            title: "Nutrition Guide - Week 1",
            date: "2024-01-10",
            type: "PDF",
         },
         {
            title: "Workout Plan - Beginner",
            date: "2024-01-08",
            type: "Video",
         },
         {
            title: "Meal Planning Template",
            date: "2024-01-05",
            type: "Template",
         },
         {
            title: "Stress Management Techniques",
            date: "2024-01-03",
            type: "Audio",
         },
         {
            title: "Progress Tracking Sheet",
            date: "2024-01-01",
            type: "Spreadsheet",
         },
      ],
   },
};

// Billing History Data
export const billingHistoryData = [
   {
      id: "inv_001",
      description: "Premium Health Coaching - January 2024",
      date: "2024-01-15",
      amount: 99.99,
      status: "paid" as "paid" | "pending" | "failed",
      invoiceUrl: "#",
   },
   {
      id: "inv_002",
      description: "Premium Health Coaching - December 2023",
      date: "2023-12-15",
      amount: 99.99,
      status: "paid" as "paid" | "pending" | "failed",
      invoiceUrl: "#",
   },
   {
      id: "inv_003",
      description: "Premium Health Coaching - November 2023",
      date: "2023-11-15",
      amount: 99.99,
      status: "paid" as "paid" | "pending" | "failed",
      invoiceUrl: "#",
   },
   {
      id: "inv_004",
      description: "Premium Health Coaching - October 2023",
      date: "2023-10-15",
      amount: 99.99,
      status: "paid" as "paid" | "pending" | "failed",
      invoiceUrl: "#",
   },
];

// Available Plans Data
export const planFeaturesData = [
   {
      id: "plan_basic",
      name: "Basic Plan",
      description: "Essential health coaching for beginners",
      price: 49.99,
      recommended: false,
      features: [
         "4 coaching sessions per month",
         "Basic health resources",
         "Email support",
         "Progress tracking",
         "Monthly assessments",
      ],
   },
   {
      id: "plan_premium",
      name: "Premium Plan",
      description: "Comprehensive health coaching with unlimited support",
      price: 99.99,
      recommended: true,
      features: [
         "8 coaching sessions per month",
         "Unlimited resources",
         "24/7 support",
         "Advanced progress tracking",
         "Monthly assessments",
         "Custom meal plans",
         "Personalized workout plans",
         "Priority scheduling",
      ],
   },
   {
      id: "plan_elite",
      name: "Elite Plan",
      description: "Premium health coaching with dedicated coach",
      price: 199.99,
      recommended: false,
      features: [
         "Unlimited coaching sessions",
         "Dedicated health coach",
         "Unlimited resources",
         "24/7 priority support",
         "Advanced progress tracking",
         "Weekly assessments",
         "Custom meal plans",
         "Personalized workout plans",
         "Priority scheduling",
         "Video consultations",
         "Family plan options",
      ],
   },
];
