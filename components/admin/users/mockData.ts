export interface User {
   id: string;
   name: string;
   email: string;
   role: "patient" | "coach" | "admin";
   status: "active" | "suspended" | "pending";
   avatar?: string;
   phone?: string;
   joinedDate: string;
   lastActive: string;
   subscription?: string;
   coach?: string;
   location?: string;
   bio?: string;
   specializations?: string[];
   certifications?: string[];
}

export const mockUsers: User[] = [
   // Patients
   {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "patient",
      status: "active",
      avatar: "/avatars/sarah.jpg",
      phone: "+1 (555) 123-4567",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
      subscription: "Premium Plan",
      coach: "Dr. Michael Chen",
      location: "New York, NY",
      bio: "Fitness enthusiast looking to improve overall health and wellness.",
   },
   {
      id: "2",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "patient",
      status: "active",
      phone: "+1 (555) 234-5678",
      joinedDate: "2024-02-20",
      lastActive: "1 day ago",
      subscription: "Basic Plan",
      coach: "Dr. Emily Rodriguez",
      location: "Los Angeles, CA",
      bio: "Working on weight management and cardiovascular health.",
   },
   {
      id: "3",
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      role: "patient",
      status: "pending",
      avatar: "/avatars/maria.jpg",
      phone: "+1 (555) 345-6789",
      joinedDate: "2024-03-10",
      lastActive: "3 days ago",
      subscription: "Premium Plan",
      location: "Miami, FL",
      bio: "New patient seeking guidance on nutrition and exercise.",
   },
   {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@email.com",
      role: "patient",
      status: "suspended",
      phone: "+1 (555) 456-7890",
      joinedDate: "2024-01-05",
      lastActive: "1 week ago",
      subscription: "Basic Plan",
      coach: "Dr. Sarah Thompson",
      location: "Chicago, IL",
      bio: "Account suspended due to payment issues.",
   },
   {
      id: "5",
      name: "Lisa Brown",
      email: "lisa.brown@email.com",
      role: "patient",
      status: "active",
      avatar: "/avatars/lisa.jpg",
      phone: "+1 (555) 567-8901",
      joinedDate: "2024-02-28",
      lastActive: "5 hours ago",
      subscription: "Premium Plan",
      coach: "Dr. Michael Chen",
      location: "Seattle, WA",
      bio: "Focusing on stress management and mental wellness.",
   },

   // Coaches
   {
      id: "6",
      name: "Dr. Michael Chen",
      email: "michael.chen@healthcoach.com",
      role: "coach",
      status: "active",
      avatar: "/avatars/michael.jpg",
      phone: "+1 (555) 678-9012",
      joinedDate: "2023-06-15",
      lastActive: "30 minutes ago",
      location: "New York, NY",
      bio: "Certified health coach with 8 years of experience in nutrition and fitness.",
      specializations: [
         "Weight Management",
         "Sports Nutrition",
         "Diabetes Management",
      ],
      certifications: [
         "ACE Health Coach",
         "Precision Nutrition Level 1",
         "Diabetes Educator",
      ],
   },
   {
      id: "7",
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@healthcoach.com",
      role: "coach",
      status: "active",
      avatar: "/avatars/emily.jpg",
      phone: "+1 (555) 789-0123",
      joinedDate: "2023-08-20",
      lastActive: "2 hours ago",
      location: "Los Angeles, CA",
      bio: "Specialized in women's health and prenatal nutrition.",
      specializations: [
         "Women's Health",
         "Prenatal Nutrition",
         "Hormone Balance",
      ],
      certifications: [
         "NASM Women's Fitness Specialist",
         "Prenatal Nutrition Certification",
      ],
   },
   {
      id: "8",
      name: "Dr. Sarah Thompson",
      email: "sarah.thompson@healthcoach.com",
      role: "coach",
      status: "active",
      phone: "+1 (555) 890-1234",
      joinedDate: "2023-09-10",
      lastActive: "1 day ago",
      location: "Chicago, IL",
      bio: "Expert in cardiovascular health and stress management.",
      specializations: [
         "Cardiovascular Health",
         "Stress Management",
         "Meditation",
      ],
      certifications: [
         "ACSM Exercise Physiologist",
         "Mindfulness-Based Stress Reduction",
      ],
   },
   {
      id: "9",
      name: "Dr. James Wilson",
      email: "james.wilson@healthcoach.com",
      role: "coach",
      status: "pending",
      avatar: "/avatars/james.jpg",
      phone: "+1 (555) 901-2345",
      joinedDate: "2024-03-01",
      lastActive: "5 days ago",
      location: "Austin, TX",
      bio: "New coach specializing in functional fitness and injury prevention.",
      specializations: [
         "Functional Fitness",
         "Injury Prevention",
         "Rehabilitation",
      ],
      certifications: ["NASM Personal Trainer", "Functional Movement Screen"],
   },

   // Admins
   {
      id: "10",
      name: "Admin User",
      email: "admin@healthcoach.com",
      role: "admin",
      status: "active",
      avatar: "/avatars/admin.jpg",
      phone: "+1 (555) 012-3456",
      joinedDate: "2023-01-01",
      lastActive: "10 minutes ago",
      location: "San Francisco, CA",
      bio: "Platform administrator with full system access.",
   },
   {
      id: "11",
      name: "Support Admin",
      email: "support@healthcoach.com",
      role: "admin",
      status: "active",
      phone: "+1 (555) 123-4567",
      joinedDate: "2023-03-15",
      lastActive: "1 hour ago",
      location: "Remote",
      bio: "Customer support administrator.",
   },
];

export const userStats = {
   total: mockUsers.length,
   patients: mockUsers.filter((u) => u.role === "patient").length,
   coaches: mockUsers.filter((u) => u.role === "coach").length,
   admins: mockUsers.filter((u) => u.role === "admin").length,
   active: mockUsers.filter((u) => u.status === "active").length,
   suspended: mockUsers.filter((u) => u.status === "suspended").length,
   pending: mockUsers.filter((u) => u.status === "pending").length,
};
