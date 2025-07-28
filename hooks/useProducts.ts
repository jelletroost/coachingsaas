import { getAllProducts } from "@/services/product_service";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
   return useQuery({
      queryKey: ["products"],
      queryFn: getAllProducts,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
   });
};
