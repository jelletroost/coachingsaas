import { getPatientsByCoach } from "@/services/patients_services";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export const usePatientsByCoach = () => {
   const { user } = useAuthStore();
   
   return useQuery({
      queryKey: ["patients", "coach", user?.id],
      queryFn: () => getPatientsByCoach(user?.id || ""),
      enabled: !!user?.id,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
   });
}; 