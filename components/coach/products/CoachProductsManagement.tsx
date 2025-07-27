"use client";

import { useState } from "react";
import { CoachProductTable } from "./CoachProductTable";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { Product, mockProducts } from "./mockData";

export function CoachProductsManagement() {
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

   return (
      <div className="space-y-6">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
               View available products and services that can be recommended to
               patients.
            </p>
         </div>

         <CoachProductTable
            products={mockProducts}
            onViewDetails={handleViewDetails}
         />

         <ProductDetailsModal
            product={selectedProduct}
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
         />
      </div>
   );
}
