import { useQuery } from "@tanstack/react-query";
import { getPatientsByCoach } from "@/services/patients_services";
import { useAuthStore } from "@/store/useAuthStore";

export const usePatientsByCoach = () => {
   const { user } = useAuthStore();
   
   return useQuery({
      queryKey: ["patients", "coach", user?.id],
      queryFn: () => getPatientsByCoach(user?.id || ""),
      enabled: !!user?.id,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
   });
}; 