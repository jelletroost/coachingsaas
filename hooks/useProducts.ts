import { getAllProducts } from "@/services/product_service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
   return useQuery({
      queryKey: ["products"],
      queryFn: getAllProducts,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
   });
};
