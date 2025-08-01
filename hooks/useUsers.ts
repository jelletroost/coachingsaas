import { UserProfileWithDetails } from "@/lib/types/database";
import { getAllUsers } from "@/services/users_services";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
   return useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
   });
};

export const transformUserForComponent = (dbUser: UserProfileWithDetails) => {
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

   // Extract assigned coach info from the nested structure
   const patientData = dbUser.patients?.[0];
   const assignedCoach = patientData?.coach;
   const coachName = assignedCoach 
      ? `${assignedCoach.first_name} ${assignedCoach.last_name}`
      : "Not Assigned";

   return {
      id: dbUser.id,
      name: `${dbUser.first_name} ${dbUser.last_name}`,
      email: dbUser.email,
      role: dbUser.role?.name || "patient",
      status: mapStatus(dbUser.account_status),
      avatar: dbUser.avatar_url,
      phone: dbUser.phone,
      joinedDate: new Date(dbUser.created_at).toLocaleDateString(),
      lastActive: "Recently",
      subscription: "Active",
      coach: coachName,
      location: "N/A",
      bio: dbUser.coach_profile?.bio || "No bio available",
      specializations: dbUser.coach_profile?.specialization ? [dbUser.coach_profile.specialization] : [],
      certifications: dbUser.coach_profile?.certifications || [],
   };
}; 