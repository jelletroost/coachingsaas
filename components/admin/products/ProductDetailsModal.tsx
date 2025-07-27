/* eslint-disable no-unused-vars */
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
import {
   AlertTriangle,
   CheckCircle,
   Edit,
   Package,
   Star,
   TrendingUp,
   XCircle,
} from "lucide-react";
import { Product } from "./mockData";

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
      case "draft":
         return <Package className="h-4 w-4 text-yellow-500" />;
      case "discontinued":
         return <AlertTriangle className="h-4 w-4 text-red-500" />;
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
      case "draft":
         return "outline";
      case "discontinued":
         return "destructive";
      default:
         return "secondary";
   }
};

const getCategoryBadgeVariant = (category: Product["category"]) => {
   switch (category) {
      case "medication":
         return "destructive";
      case "supplement":
         return "default";
      case "consultation":
         return "secondary";
      case "program":
         return "default";
      case "equipment":
         return "outline";
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
                     <div className="text-sm text-muted-foreground">SKU</div>
                     <div className="font-mono font-medium">{product.sku}</div>
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
                           <div className="text-sm font-medium">Category</div>
                           <div className="flex items-center space-x-2">
                              <Badge
                                 variant={getCategoryBadgeVariant(
                                    product.category
                                 )}>
                                 {product.category}
                              </Badge>
                              {product.subcategory && (
                                 <span className="text-sm text-muted-foreground">
                                    - {product.subcategory}
                                 </span>
                              )}
                           </div>
                        </div>
                        <div>
                           <div className="text-sm font-medium">Tags</div>
                           <div className="flex flex-wrap gap-1 mt-1">
                              {product.tags.map((tag) => (
                                 <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs">
                                    {tag}
                                 </Badge>
                              ))}
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
                           <span className="text-sm font-medium">Cost:</span>
                           <span className="text-sm text-muted-foreground">
                              ${product.cost.toFixed(2)}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Profit Margin:
                           </span>
                           <span className="text-sm text-green-600">
                              {product.profitMargin.toFixed(1)}%
                           </span>
                        </div>
                        <Separator />
                        <div className="flex items-center space-x-1">
                           <Star className="h-4 w-4 text-yellow-500 fill-current" />
                           <span className="font-medium">{product.rating}</span>
                           <span className="text-sm text-muted-foreground">
                              ({product.reviewCount} reviews)
                           </span>
                        </div>
                        <div className="flex items-center space-x-1">
                           <TrendingUp className="h-4 w-4 text-blue-500" />
                           <span className="text-sm font-medium">
                              Popularity:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              #{product.popularity}
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
                                 product.inventory.inStock,
                                 product.inventory.lowStockThreshold
                              )}>
                              {getStockStatusText(
                                 product.inventory.inStock,
                                 product.inventory.lowStockThreshold
                              )}
                           </Badge>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              In Stock:
                           </span>
                           <span className="font-medium">
                              {product.inventory.inStock}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Low Stock Threshold:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              {product.inventory.lowStockThreshold}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Reorder Point:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              {product.inventory.reorderPoint}
                           </span>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Supplier:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              {product.inventory.supplier}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Lead Time:
                           </span>
                           <span className="text-sm text-muted-foreground">
                              {product.inventory.leadTime} days
                           </span>
                        </div>
                        {product.inventory.inStock <=
                           product.inventory.lowStockThreshold && (
                           <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="text-sm font-medium text-orange-800">
                                 Low Stock Alert
                              </div>
                              <div className="text-xs text-orange-600 mt-1">
                                 Consider reordering soon. Current stock:{" "}
                                 {product.inventory.inStock}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Prescription Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                     Prescription Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm font-medium">
                              Prescription Required:
                           </span>
                           <Badge
                              variant={
                                 product.prescription.required
                                    ? "destructive"
                                    : "default"
                              }>
                              {product.prescription.required ? "Yes" : "No"}
                           </Badge>
                        </div>
                        {product.prescription.type && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">Type:</span>
                              <span className="text-sm text-muted-foreground">
                                 {product.prescription.type}
                              </span>
                           </div>
                        )}
                        {product.prescription.schedule && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                 Schedule:
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 Schedule {product.prescription.schedule}
                              </span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               <Separator />

               {/* Specifications */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                     Product Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-3">
                        {product.specifications.dosage && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                 Dosage:
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 {product.specifications.dosage}
                              </span>
                           </div>
                        )}
                        {product.specifications.strength && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                 Strength:
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 {product.specifications.strength}
                              </span>
                           </div>
                        )}
                        {product.specifications.form && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">Form:</span>
                              <span className="text-sm text-muted-foreground">
                                 {product.specifications.form}
                              </span>
                           </div>
                        )}
                        {product.specifications.quantity && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                 Quantity:
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 {product.specifications.quantity}{" "}
                                 {product.specifications.unit}
                              </span>
                           </div>
                        )}
                     </div>
                     <div className="space-y-3">
                        {product.specifications.expirationDays && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                 Expiration:
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 {product.specifications.expirationDays} days
                              </span>
                           </div>
                        )}
                        {product.specifications.storage && (
                           <div className="flex justify-between">
                              <span className="text-sm font-medium">
                                 Storage:
                              </span>
                              <span className="text-sm text-muted-foreground">
                                 {product.specifications.storage}
                              </span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* Additional Information */}
               <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                     Additional Information
                  </h3>
                  <div className="space-y-4">
                     {product.ingredients && product.ingredients.length > 0 && (
                        <div>
                           <div className="text-sm font-medium mb-2">
                              Ingredients:
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {product.ingredients.join(", ")}
                           </div>
                        </div>
                     )}
                     {product.contraindications &&
                        product.contraindications.length > 0 && (
                           <div>
                              <div className="text-sm font-medium mb-2">
                                 Contraindications:
                              </div>
                              <div className="text-sm text-muted-foreground">
                                 {product.contraindications.join(", ")}
                              </div>
                           </div>
                        )}
                     {product.sideEffects && product.sideEffects.length > 0 && (
                        <div>
                           <div className="text-sm font-medium mb-2">
                              Side Effects:
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {product.sideEffects.join(", ")}
                           </div>
                        </div>
                     )}
                     {product.instructions && (
                        <div>
                           <div className="text-sm font-medium mb-2">
                              Instructions:
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {product.instructions}
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               <Separator />

               {/* Metadata */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                     <div className="flex justify-between">
                        <span className="text-sm font-medium">Created:</span>
                        <span className="text-sm text-muted-foreground">
                           {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-sm font-medium">Created By:</span>
                        <span className="text-sm text-muted-foreground">
                           {product.createdBy}
                        </span>
                     </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between">
                        <span className="text-sm font-medium">
                           Last Updated:
                        </span>
                        <span className="text-sm text-muted-foreground">
                           {new Date(product.updatedAt).toLocaleDateString()}
                        </span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-sm font-medium">
                           Modified By:
                        </span>
                        <span className="text-sm text-muted-foreground">
                           {product.lastModifiedBy}
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
