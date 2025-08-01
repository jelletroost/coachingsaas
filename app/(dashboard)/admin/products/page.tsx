"use client";

import { ProductsManagement } from "@/components/admin/products";

export default function AdminProductsPage() {
   return (
      <div className="p-6">
         <div className="mb-6">
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">
               Manage the full catalog of medications, supplements,
               consultations, and services
            </p>
         </div>
         <ProductsManagement />
      </div>
   );
}
