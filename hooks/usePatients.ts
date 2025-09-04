import { useAuth } from "@/lib/providers/authProvider";
import { getPatientsByCoach } from "@/services/patients_services";
import { useQuery } from "@tanstack/react-query";

export const usePatientsByCoach = () => {
   const { user } = useAuth();

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
