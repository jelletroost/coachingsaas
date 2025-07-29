import { UserProfileWithDetails } from "@/lib/types/database";
import { getAllUsers } from "@/services/users_services";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
   return useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
   });
};

// Transform database user to component user format
export const transformUserForComponent = (dbUser: UserProfileWithDetails) => {
   // Map database status to component status
   const mapStatus = (status: string) => {
      switch (status) {
         case "active":
         case "verified":
            return "active";
         case "pending":
            return "pending";
         case "suspended":
            return "suspended";
         default:
            return "pending";
      }
   };

   return {
      id: dbUser.id,
      name: `${dbUser.first_name} ${dbUser.last_name}`,
      email: dbUser.email,
      role: dbUser.role,
      status: mapStatus(dbUser.account_status),
      avatar: dbUser.avatar_url,
      phone: dbUser.phone,
      joinedDate: new Date(dbUser.created_at).toLocaleDateString(),
      lastActive: "Recently", // This would need to be calculated from session data
      subscription: "Active", // This would need to be fetched from subscription data
      coach: dbUser.coach_profile ? "Assigned" : "Not Assigned",
      location: "N/A", // This would need to be added to the database
      bio: dbUser.coach_profile?.bio || "No bio available",
      specializations: dbUser.coach_profile?.specialization ? [dbUser.coach_profile.specialization] : [],
      certifications: dbUser.coach_profile?.certifications || [],
   };
}; 