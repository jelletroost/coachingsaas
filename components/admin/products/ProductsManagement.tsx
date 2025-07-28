"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AddProductDialog } from "./AddProductDialog";
import { mockProducts, productStats, type Product } from "./mockData";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ProductTable } from "./ProductTable";

export function ProductsManagement() {
   const [products, setProducts] = useState<Product[]>(mockProducts);
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
   const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);

   const handleViewDetails = (product: Product) => {
      setSelectedProduct(product);
      setIsDetailsModalOpen(true);
   };

   const handleEditProduct = (product: Product) => {
      toast.success(`Edit functionality for ${product.name} coming soon!`);
   };

   const handleAddProduct = () => {
      setIsAddProductDialogOpen(true);
   };

   const handleUpdateStatus = (
      product: Product,
      newStatus: Product["status"]
   ) => {
      setProducts((prev) =>
         prev.map((p) =>
            p.id === product.id
               ? {
                    ...p,
                    status: newStatus,
                    updatedAt: new Date().toISOString(),
                 }
               : p
         )
      );
      toast.success(`Product "${product.name}" status updated to ${newStatus}`);
   };

   const handleExportProducts = () => {
      toast.success("Export functionality coming soon!");
   };

   return (
      <div className="space-y-6">
         {/* Statistics Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">{productStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     {productStats.active} active
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Total Value
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     ${productStats.totalValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Avg: ${productStats.averagePrice.toFixed(2)}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Low Stock
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {productStats.lowStock}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     {productStats.outOfStock} out of stock
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Top Category
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {productStats.topCategory}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Most popular category
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Status Overview */}
         <Card>
            <CardHeader>
               <CardTitle>Product Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Active: {productStats.active}</Badge>
                  <Badge variant="outline">
                     Inactive: {productStats.inactive}
                  </Badge>
                  <Badge variant="outline">Draft: {productStats.draft}</Badge>
                  <Badge variant="outline">
                     Discontinued: {productStats.discontinued}
                  </Badge>
                  <Badge variant="outline">
                     Low Stock: {productStats.lowStock}
                  </Badge>
                  <Badge variant="outline">
                     Out of Stock: {productStats.outOfStock}
                  </Badge>
               </div>
            </CardContent>
         </Card>

         {/* Products Table */}
         <ProductTable
            products={products}
            onViewDetails={handleViewDetails}
            onEditProduct={handleEditProduct}
            onAddProduct={handleAddProduct}
            onUpdateStatus={handleUpdateStatus}
            onExportProducts={handleExportProducts}
         />

         {/* Product Details Modal */}
         <ProductDetailsModal
            product={selectedProduct}
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            onEdit={handleEditProduct}
         />

         {/* Add Product Dialog */}
         <AddProductDialog
            open={isAddProductDialogOpen}
            onOpenChange={setIsAddProductDialogOpen}
         />
      </div>
   );
}
