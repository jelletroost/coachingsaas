import { getPrescriptionsByPatient } from "@/services/patients_services";
import { useQuery } from "@tanstack/react-query";

const usePrescriptions = (patientId: string) => {
   return useQuery({
      queryKey: ["prescriptions", patientId],
      queryFn: () => getPrescriptionsByPatient(patientId),
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
   });
};

export default usePrescriptions;