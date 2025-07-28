"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/lib/types/database";
import {
   DollarSign,
   Loader2,
   Package,
   RefreshCw,
   TrendingUp,
   Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AddProductDialog } from "./AddProductDialog";
import { ProductDetailsModal } from "./ProductDetailsModal";
import { ProductTable } from "./ProductTable";

export function ProductsManagement() {
   const { data: products = [], isLoading, error, refetch } = useProducts();
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
      // For now, we'll just show a toast since we need to implement the update API
      toast.success(`Product "${product.name}" status updated to ${newStatus}`);
      // TODO: Implement API call to update product status
      // After successful update, refetch the products
      // refetch();
   };

   const handleExportProducts = () => {
      toast.success("Export functionality coming soon!");
   };

   // Handle loading state
   if (isLoading) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
               <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
               <p className="text-muted-foreground">Loading products...</p>
            </div>
         </div>
      );
   }

   // Handle error state
   if (error) {
      return (
         <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
               <Package className="h-8 w-8 mx-auto mb-4 text-destructive" />
               <p className="text-destructive mb-4">Failed to load products</p>
               <Button onClick={() => refetch()} variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
               </Button>
            </div>
         </div>
      );
   }

   // Calculate real-time statistics from products data
   const realStats = {
      total: products.length,
      active: products.filter((p: Product) => p.status === "active").length,
      inactive: products.filter((p: Product) => p.status === "inactive").length,
      totalValue: products.reduce(
         (sum: number, p: Product) => sum + p.price,
         0
      ),
      averagePrice:
         products.length > 0
            ? products.reduce((sum: number, p: Product) => sum + p.price, 0) /
              products.length
            : 0,
      lowStock: products.filter(
         (p: Product) => p.stock_quantity > 0 && p.stock_quantity <= 10
      ).length,
      outOfStock: products.filter((p: Product) => p.stock_quantity === 0)
         .length,
      topCategory:
         products.length > 0
            ? Object.entries(
                 products.reduce((acc: Record<string, number>, p: Product) => {
                    acc[p.type] = (acc[p.type] || 0) + 1;
                    return acc;
                 }, {} as Record<string, number>)
              ).sort(([, a], [, b]) => (b as number) - (a as number))[0][0]
            : "N/A",
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
                  <div className="text-2xl font-bold">{realStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                     {realStats.active} active
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
                     ${realStats.totalValue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Avg: ${realStats.averagePrice.toFixed(2)}
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
                  <div className="text-2xl font-bold">{realStats.lowStock}</div>
                  <p className="text-xs text-muted-foreground">
                     {realStats.outOfStock} out of stock
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
                     {realStats.topCategory}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Most popular type
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
                  <Badge variant="outline">Active: {realStats.active}</Badge>
                  <Badge variant="outline">
                     Inactive: {realStats.inactive}
                  </Badge>
                  <Badge variant="outline">
                     Low Stock: {realStats.lowStock}
                  </Badge>
                  <Badge variant="outline">
                     Out of Stock: {realStats.outOfStock}
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
