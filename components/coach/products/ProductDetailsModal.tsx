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
import { Star } from "lucide-react";
import { Product } from "./mockData";

interface ProductDetailsModalProps {
   product: Product | null;
   isOpen: boolean;
   onClose: () => void;
}

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

export function ProductDetailsModal({
   product,
   isOpen,
   onClose,
}: ProductDetailsModalProps) {
   if (!product) return null;

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center justify-between">
                  <span>Product Details</span>
                  <div className="flex items-center space-x-2">
                     <Badge variant={getStatusBadgeVariant(product.status)}>
                        {product.status}
                     </Badge>
                     <Badge variant={getCategoryBadgeVariant(product.category)}>
                        {product.category}
                     </Badge>
                  </div>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
               {/* Basic Information */}
               <div>
                  <h3 className="text-lg font-semibold mb-3">
                     Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Product Name
                        </label>
                        <p className="text-base">{product.name}</p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           SKU
                        </label>
                        <p className="text-base">{product.sku}</p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Price
                        </label>
                        <p className="text-base font-semibold">
                           ${product.price.toFixed(2)} {product.currency}
                        </p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Rating
                        </label>
                        <div className="flex items-center space-x-1">
                           <Star className="h-4 w-4 text-yellow-500 fill-current" />
                           <span className="font-medium">{product.rating}</span>
                           <span className="text-sm text-muted-foreground">
                              ({product.reviewCount} reviews)
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="mt-4">
                     <label className="text-sm font-medium text-muted-foreground">
                        Description
                     </label>
                     <p className="text-base mt-1">{product.description}</p>
                  </div>
               </div>

               <Separator />

               {/* Specifications */}
               <div>
                  <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {product.specifications.dosage && (
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">
                              Dosage
                           </label>
                           <p className="text-base">
                              {product.specifications.dosage}
                           </p>
                        </div>
                     )}
                     {product.specifications.strength && (
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">
                              Strength
                           </label>
                           <p className="text-base">
                              {product.specifications.strength}
                           </p>
                        </div>
                     )}
                     {product.specifications.form && (
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">
                              Form
                           </label>
                           <p className="text-base">
                              {product.specifications.form}
                           </p>
                        </div>
                     )}
                     {product.specifications.quantity && (
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">
                              Quantity
                           </label>
                           <p className="text-base">
                              {product.specifications.quantity}{" "}
                              {product.specifications.unit}
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               <Separator />

               {/* Prescription Information */}
               <div>
                  <h3 className="text-lg font-semibold mb-3">
                     Prescription Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Prescription Required
                        </label>
                        <p className="text-base">
                           {product.prescription.required ? "Yes" : "No"}
                        </p>
                     </div>
                     {product.prescription.type && (
                        <div>
                           <label className="text-sm font-medium text-muted-foreground">
                              Type
                           </label>
                           <p className="text-base">
                              {product.prescription.type}
                           </p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Instructions */}
               {product.instructions && (
                  <>
                     <Separator />
                     <div>
                        <h3 className="text-lg font-semibold mb-3">
                           Instructions
                        </h3>
                        <p className="text-base">{product.instructions}</p>
                     </div>
                  </>
               )}

               {/* Tags */}
               {product.tags.length > 0 && (
                  <>
                     <Separator />
                     <div>
                        <h3 className="text-lg font-semibold mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                           {product.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                 {tag}
                              </Badge>
                           ))}
                        </div>
                     </div>
                  </>
               )}

               {/* Additional Information */}
               <Separator />
               <div>
                  <h3 className="text-lg font-semibold mb-3">
                     Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Created By
                        </label>
                        <p className="text-base">{product.createdBy}</p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Created Date
                        </label>
                        <p className="text-base">
                           {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
               <Button variant="outline" onClick={onClose}>
                  Close
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
