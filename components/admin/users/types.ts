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