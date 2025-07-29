"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/lib/types/database";
import { CheckCircle, Edit, Package, XCircle } from "lucide-react";

interface ProductDetailsModalProps {
   product: Product | null;
   isOpen: boolean;
   onClose: () => void;
   onEdit: (product: Product) => void;
}

const getStatusIcon = (status: Product["status"]) => {
   switch (status) {
      case "active":
         return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "inactive":
         return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
         return <Package className="h-4 w-4 text-gray-500" />;
   }
};

const getStatusBadgeVariant = (status: Product["status"]) => {
   switch (status) {
      case "active":
         return "default";
      case "inactive":
         return "secondary";
      default:
         return "secondary";
   }
};

const getTypeBadgeVariant = (type: Product["type"]) => {
   switch (type) {
      case "medicine":
         return "destructive";
      case "supplement":
         return "default";
      case "service":
         return "secondary";
      default:
         return "secondary";
   }
};

const getStockStatusBadgeVariant = (
   inStock: number,
   lowStockThreshold: number
) => {
   if (inStock === 0) return "destructive";
   if (inStock <= lowStockThreshold) return "secondary";
   return "default";
};

const getStockStatusText = (inStock: number, lowStockThreshold: number) => {
   if (inStock === 0) return "Out of Stock";
   if (inStock <= lowStockThreshold) return "Low Stock";
   return "In Stock";
};

export function ProductDetailsModal({
   product,
   isOpen,
   onClose,
   onEdit,
}: ProductDetailsModalProps) {
   if (!product) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold">
                     Product Details - {product.name}
                  </DialogTitle>
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => onEdit(product)}>
                     <Edit className="h-4 w-4 mr-2" />
                     Edit Product
                  </Button>
               </div>
            </DialogHeader>

            <div className="space-y-6">
               {/* Product Status and Basic Info */}
               <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                     {getStatusIcon(product.status)}
                     <div>
                        <div className="font-medium">Product Status</div>
                        <Badge variant={getStatusBadgeVariant(product.status)}>
                           {product.status}
                        </Badge>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-sm text-muted-foreground">ID</div>
                     <div className="font-mono font-medium">{product.id}</div>
                  </div>
               </div>

               {/* Product Information */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">
                        Product Information
                     </h3>
                     <div className="space-y-3">
                        <div>
                           <div className="text-sm font-medium">Name</div>
                           <div className="text-sm text-muted-foreground">
                              {product.name}
                           </div>
                        </div>
                        <div>
                           <div className="text-sm font-medium">
                              Description
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {product.description}
                           </div>
                        </div>
                        <div>
                           <div className="text-sm font-medium">Type</div>
                           <div className="flex items-center space-x-2">
                              <Badge
                                 variant={getTypeBadgeVariant(product.type)}>
                                 {product.type}
                              </Badge>
                           </div>
                        </div>
                        <div>
                           <div className="text-sm font-medium">
                              Prescription Required
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {product.prescription_required ? "Yes" : "No"}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-lg font-semibold">
                        Pricing & Performance
                     </h3>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">Price:</span>
                           <span className="font-medium">
                              ${product.price.toFixed(2)} {product.currency}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Currency:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              {product.currency}
                           </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">Created:</span>
                           <span className="text-sm text-muted-foreground">
                              {new Date(
                                 product.created_at
                              ).toLocaleDateString()}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">Updated:</span>
                           <span className="text-sm text-muted-foreground">
                              {new Date(
                                 product.updated_at
                              ).toLocaleDateString()}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Inventory Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                     Inventory Management
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Current Stock:
                           </span>
                           <Badge
                              variant={getStockStatusBadgeVariant(
                                 product.stock_quantity,
                                 10
                              )}>
                              {getStockStatusText(product.stock_quantity, 10)}
                           </Badge>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Stock Quantity:
                           </span>
                           <span className="font-medium">
                              {product.stock_quantity}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Low Stock Threshold:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              10
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">Status:</span>
                           <span className="text-sm text-muted-foreground">
                              {product.status}
                           </span>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Prescription Required:
                           </span>
                           <Badge
                              variant={
                                 product.prescription_required
                                    ? "destructive"
                                    : "default"
                              }>
                              {product.prescription_required ? "Yes" : "No"}
                           </Badge>
                        </div>
                        {product.stock_quantity <= 10 && (
                           <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="text-sm font-medium text-orange-800">
                                 Low Stock Alert
                              </div>
                              <div className="text-xs text-orange-600 mt-1">
                                 Consider reordering soon. Current stock:{" "}
                                 {product.stock_quantity}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
