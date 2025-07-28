"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

interface AddProductDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onAddProduct: (product: {
      name: string;
      type: "medicine" | "supplement" | "service";
      price: number;
      currency: string;
      stock_quantity: number;
      status: "active" | "inactive";
      prescription_required: boolean;
   }) => void;
}

export function AddProductDialog({
   open,
   onOpenChange,
   onAddProduct,
}: AddProductDialogProps) {
   const [formData, setFormData] = useState({
      name: "",
      type: "supplement" as "medicine" | "supplement" | "service",
      price: "",
      currency: "USD",
      stock_quantity: "",
      status: "active" as "active" | "inactive",
      prescription_required: false,
   });

   const [errors, setErrors] = useState<Record<string, string>>({});

   const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) {
         newErrors.name = "Product name is required";
      }

      if (!formData.price || parseFloat(formData.price) <= 0) {
         newErrors.price = "Price must be greater than 0";
      }

      if (!formData.stock_quantity || parseInt(formData.stock_quantity) < 0) {
         newErrors.stock_quantity = "Stock quantity must be 0 or greater";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      onAddProduct({
         name: formData.name.trim(),
         type: formData.type,
         price: parseFloat(formData.price),
         currency: formData.currency,
         stock_quantity: parseInt(formData.stock_quantity),
         status: formData.status,
         prescription_required: formData.prescription_required,
      });

      // Reset form
      setFormData({
         name: "",
         type: "supplement",
         price: "",
         currency: "USD",
         stock_quantity: "",
         status: "active",
         prescription_required: false,
      });
      setErrors({});
      onOpenChange(false);
   };

   const handleInputChange = (
      field: string,
      value:
         | string
         | boolean
         | "medicine"
         | "supplement"
         | "service"
         | "active"
         | "inactive"
   ) => {
      setFormData((prev) => ({
         ...prev,
         [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
         setErrors((prev) => ({
            ...prev,
            [field]: "",
         }));
      }
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
               <DialogTitle>Add New Product</DialogTitle>
               <DialogDescription>
                  Fill in the product details below. All fields marked with *
                  are required.
               </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                     id="name"
                     value={formData.name}
                     onChange={(e) => handleInputChange("name", e.target.value)}
                     placeholder="Enter product name"
                     className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                     <p className="text-sm text-red-500">{errors.name}</p>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="type">Product Type *</Label>
                  <Select
                     value={formData.type}
                     onValueChange={(
                        value: "medicine" | "supplement" | "service"
                     ) => handleInputChange("type", value)}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="supplement">Supplement</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label htmlFor="price">Price *</Label>
                     <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                           handleInputChange("price", e.target.value)
                        }
                        placeholder="0.00"
                        className={errors.price ? "border-red-500" : ""}
                     />
                     {errors.price && (
                        <p className="text-sm text-red-500">{errors.price}</p>
                     )}
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="currency">Currency</Label>
                     <Select
                        value={formData.currency}
                        onValueChange={(value) =>
                           handleInputChange("currency", value)
                        }>
                        <SelectTrigger>
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="USD">USD</SelectItem>
                           <SelectItem value="EUR">EUR</SelectItem>
                           <SelectItem value="GBP">GBP</SelectItem>
                           <SelectItem value="CAD">CAD</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="stock_quantity">Stock Quantity *</Label>
                  <Input
                     id="stock_quantity"
                     type="number"
                     min="0"
                     value={formData.stock_quantity}
                     onChange={(e) =>
                        handleInputChange("stock_quantity", e.target.value)
                     }
                     placeholder="0"
                     className={errors.stock_quantity ? "border-red-500" : ""}
                  />
                  {errors.stock_quantity && (
                     <p className="text-sm text-red-500">
                        {errors.stock_quantity}
                     </p>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                     value={formData.status}
                     onValueChange={(value: "active" | "inactive") =>
                        handleInputChange("status", value)
                     }>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="flex items-center space-x-2">
                  <Switch
                     id="prescription_required"
                     checked={formData.prescription_required}
                     onCheckedChange={(checked) =>
                        handleInputChange("prescription_required", checked)
                     }
                  />
                  <Label htmlFor="prescription_required">
                     Prescription Required
                  </Label>
               </div>

               <DialogFooter>
                  <Button
                     type="button"
                     variant="outline"
                     onClick={() => onOpenChange(false)}>
                     Cancel
                  </Button>
                  <Button type="submit">Add Product</Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
