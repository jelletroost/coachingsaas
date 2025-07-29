"use client";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/lib/types/database";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { CoachProductTable } from "./CoachProductTable";
import { ProductDetailsModal } from "./ProductDetailsModal";

export function CoachProductsManagement() {
   const {
      data: products = [],
      isLoading,
      error,
      refetch,
      isRefetching,
   } = useProducts();
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

   const handleViewDetails = (product: Product) => {
      setSelectedProduct(product);
      setIsDetailsModalOpen(true);
   };

   const handleCloseDetailsModal = () => {
      setIsDetailsModalOpen(false);
      setSelectedProduct(null);
   };

   if (error) {
      return (
         <div className="space-y-6">
            <div>
               <h1 className="text-3xl font-bold tracking-tight">Products</h1>
               <p className="text-muted-foreground">
                  View available products and services that can be recommended to
                  patients.
               </p>
            </div>
            <div className="text-center py-8 text-muted-foreground">
               <p>Error loading products. Please try again.</p>
               <Button
                  variant="outline"
                  onClick={() => refetch()}
                  className="mt-4">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Retry
               </Button>
            </div>
         </div>
      );
   }

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
               View available products and services that can be recommended to
               patients.
            </p>
         </div>

         {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
               <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
               <p>Loading products...</p>
            </div>
         ) : (
            <>
               <CoachProductTable
                  products={products}
                  onViewDetails={handleViewDetails}
               />

               {/* Refresh Button */}
               <div className="flex justify-center">
                  <Button
                     variant="outline"
                     onClick={() => refetch()}
                     disabled={isLoading || isRefetching}
                     className="flex items-center gap-2">
                     <RefreshCw
                        className={`h-4 w-4 ${
                           isLoading || isRefetching ? "animate-spin" : ""
                        }`}
                     />
                     {isRefetching ? "Refreshing..." : "Refresh Products"}
                  </Button>
               </div>
            </>
         )}

         <ProductDetailsModal
            product={selectedProduct}
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
         />
      </div>
   );
}
