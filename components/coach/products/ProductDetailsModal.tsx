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
                     <Badge variant={getTypeBadgeVariant(product.type)}>
                        {product.type}
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
                           Product Type
                        </label>
                        <p className="text-base capitalize">{product.type}</p>
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
                           Stock Quantity
                        </label>
                        <p className="text-base">{product.stock_quantity}</p>
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
                           {product.prescription_required ? "Yes" : "No"}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Additional Information */}
               <Separator />
               <div>
                  <h3 className="text-lg font-semibold mb-3">
                     Additional Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Created Date
                        </label>
                        <p className="text-base">
                           {new Date(product.created_at).toLocaleDateString()}
                        </p>
                     </div>
                     <div>
                        <label className="text-sm font-medium text-muted-foreground">
                           Last Updated
                        </label>
                        <p className="text-base">
                           {new Date(product.updated_at).toLocaleDateString()}
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
