export interface Subscription {
   id: string;
   userId: string;
   userName: string;
   userEmail: string;
   planName: string;
   planType: "basic" | "premium" | "enterprise";
   status: "active" | "cancelled" | "expired" | "pending" | "suspended";
   startDate: string;
   endDate: string;
   nextBillingDate: string;
   amount: number;
   currency: string;
   billingCycle: "monthly" | "quarterly" | "yearly";
   autoRenew: boolean;
   paymentMethod: string;
   lastPaymentDate: string;
   lastPaymentAmount: number;
   coachId?: string;
   coachName?: string;
   features: string[];
   notes?: string;
}

export const mockSubscriptions: Subscription[] = [
   {
      id: "1",
      userId: "1",
      userName: "Sarah Johnson",
      userEmail: "sarah.johnson@email.com",
      planName: "Premium Health Plan",
      planType: "premium",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      nextBillingDate: "2024-12-15",
      amount: 99.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: true,
      paymentMethod: "Visa ****1234",
      lastPaymentDate: "2024-11-15",
      lastPaymentAmount: 99.99,
      coachId: "6",
      coachName: "Dr. Michael Chen",
      features: [
         "Personalized meal plans",
         "24/7 coach support",
         "Progress tracking",
         "Video consultations",
         "Nutrition database access",
      ],
      notes: "Very engaged patient, excellent progress",
   },
   {
      id: "2",
      userId: "2",
      userName: "John Smith",
      userEmail: "john.smith@email.com",
      planName: "Basic Health Plan",
      planType: "basic",
      status: "active",
      startDate: "2024-02-20",
      endDate: "2025-02-20",
      nextBillingDate: "2024-12-20",
      amount: 49.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: true,
      paymentMethod: "Mastercard ****5678",
      lastPaymentDate: "2024-11-20",
      lastPaymentAmount: 49.99,
      coachId: "7",
      coachName: "Dr. Emily Rodriguez",
      features: [
         "Basic meal plans",
         "Weekly coach check-ins",
         "Progress tracking",
         "Nutrition guidelines",
      ],
   },
   {
      id: "3",
      userId: "3",
      userName: "Maria Garcia",
      userEmail: "maria.garcia@email.com",
      planName: "Premium Health Plan",
      planType: "premium",
      status: "pending",
      startDate: "2024-03-10",
      endDate: "2025-03-10",
      nextBillingDate: "2024-12-10",
      amount: 99.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: false,
      paymentMethod: "PayPal",
      lastPaymentDate: "2024-11-10",
      lastPaymentAmount: 99.99,
      features: [
         "Personalized meal plans",
         "24/7 coach support",
         "Progress tracking",
         "Video consultations",
         "Nutrition database access",
      ],
      notes: "Payment verification pending",
   },
   {
      id: "4",
      userId: "4",
      userName: "David Wilson",
      userEmail: "david.wilson@email.com",
      planName: "Basic Health Plan",
      planType: "basic",
      status: "suspended",
      startDate: "2024-01-05",
      endDate: "2024-12-05",
      nextBillingDate: "2024-12-05",
      amount: 49.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: false,
      paymentMethod: "Visa ****9012",
      lastPaymentDate: "2024-10-05",
      lastPaymentAmount: 49.99,
      coachId: "8",
      coachName: "Dr. Sarah Thompson",
      features: [
         "Basic meal plans",
         "Weekly coach check-ins",
         "Progress tracking",
         "Nutrition guidelines",
      ],
      notes: "Payment failed - account suspended",
   },
   {
      id: "5",
      userId: "5",
      userName: "Lisa Brown",
      userEmail: "lisa.brown@email.com",
      planName: "Premium Health Plan",
      planType: "premium",
      status: "active",
      startDate: "2024-02-28",
      endDate: "2025-02-28",
      nextBillingDate: "2024-12-28",
      amount: 99.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: true,
      paymentMethod: "American Express ****3456",
      lastPaymentDate: "2024-11-28",
      lastPaymentAmount: 99.99,
      coachId: "6",
      coachName: "Dr. Michael Chen",
      features: [
         "Personalized meal plans",
         "24/7 coach support",
         "Progress tracking",
         "Video consultations",
         "Nutrition database access",
      ],
   },
   {
      id: "6",
      userId: "12",
      userName: "Robert Davis",
      userEmail: "robert.davis@email.com",
      planName: "Enterprise Team Plan",
      planType: "enterprise",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      nextBillingDate: "2024-12-31",
      amount: 299.99,
      currency: "USD",
      billingCycle: "yearly",
      autoRenew: true,
      paymentMethod: "Corporate Account",
      lastPaymentDate: "2024-01-01",
      lastPaymentAmount: 299.99,
      features: [
         "Team management",
         "Advanced analytics",
         "Custom integrations",
         "Priority support",
         "Dedicated coach",
         "White-label options",
      ],
      notes: "Corporate client - 5 team members",
   },
   {
      id: "7",
      userId: "13",
      userName: "Jennifer Lee",
      userEmail: "jennifer.lee@email.com",
      planName: "Basic Health Plan",
      planType: "basic",
      status: "cancelled",
      startDate: "2024-03-01",
      endDate: "2024-11-30",
      nextBillingDate: "2024-11-30",
      amount: 49.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: false,
      paymentMethod: "Visa ****7890",
      lastPaymentDate: "2024-10-30",
      lastPaymentAmount: 49.99,
      features: [
         "Basic meal plans",
         "Weekly coach check-ins",
         "Progress tracking",
         "Nutrition guidelines",
      ],
      notes: "Cancelled by user - moving to different platform",
   },
   {
      id: "8",
      userId: "14",
      userName: "Michael Taylor",
      userEmail: "michael.taylor@email.com",
      planName: "Premium Health Plan",
      planType: "premium",
      status: "expired",
      startDate: "2024-01-01",
      endDate: "2024-11-30",
      nextBillingDate: "2024-11-30",
      amount: 99.99,
      currency: "USD",
      billingCycle: "monthly",
      autoRenew: false,
      paymentMethod: "Mastercard ****2345",
      lastPaymentDate: "2024-10-30",
      lastPaymentAmount: 99.99,
      features: [
         "Personalized meal plans",
         "24/7 coach support",
         "Progress tracking",
         "Video consultations",
         "Nutrition database access",
      ],
      notes: "Subscription expired - no renewal",
   },
];

export const subscriptionStats = {
   total: mockSubscriptions.length,
   active: mockSubscriptions.filter((s) => s.status === "active").length,
   cancelled: mockSubscriptions.filter((s) => s.status === "cancelled").length,
   expired: mockSubscriptions.filter((s) => s.status === "expired").length,
   suspended: mockSubscriptions.filter((s) => s.status === "suspended").length,
   pending: mockSubscriptions.filter((s) => s.status === "pending").length,
   basic: mockSubscriptions.filter((s) => s.planType === "basic").length,
   premium: mockSubscriptions.filter((s) => s.planType === "premium").length,
   enterprise: mockSubscriptions.filter((s) => s.planType === "enterprise")
      .length,
   monthlyRevenue: mockSubscriptions
      .filter((s) => s.status === "active")
      .reduce((sum, s) => sum + s.amount, 0),
   yearlyRevenue: mockSubscriptions
      .filter((s) => s.status === "active")
      .reduce((sum, s) => {
         const multiplier =
            s.billingCycle === "yearly"
               ? 1
               : s.billingCycle === "quarterly"
               ? 4
               : 12;
         return sum + s.amount * multiplier;
      }, 0),
};
