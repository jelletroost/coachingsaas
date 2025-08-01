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
import { Product } from "@/lib/types/database";
import { createProduct } from "@/services/product_service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddProductDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onProductAdded?: () => void;
}

export function AddProductDialog({
   open,
   onOpenChange,
   onProductAdded,
}: AddProductDialogProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      watch,
   } = useForm<Product>({
      defaultValues: {
         name: "",
         type: "supplement",
         description: "",
         price: 0,
         currency: "USD",
         stock_quantity: 0,
         status: "active",
         prescription_required: false,
      },
   });

   const { mutate: createProductMutation, isPending } = useMutation({
      mutationFn: createProduct,
      onSuccess: () => {
         toast.success("Product created successfully!");
         reset();
         onOpenChange(false);
         // Trigger refetch to show the new product in real-time
         onProductAdded?.();
      },
      onError: (error) => {
         toast.error(error.message);
      },
   });

   const onSubmit = (data: Product) => {
      createProductMutation(data);
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                     id="name"
                     {...register("name", {
                        required: "Product name is required",
                     })}
                     placeholder="Enter product name"
                     className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                     <p className="text-sm text-red-500">
                        {errors.name.message}
                     </p>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Input
                     id="description"
                     {...register("description", {
                        required: "Description is required",
                     })}
                     placeholder="Enter product description"
                     className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                     <p className="text-sm text-red-500">
                        {errors.description.message}
                     </p>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="type">Product Type *</Label>
                  <Select
                     value={watch("type")}
                     onValueChange={(
                        value: "medicine" | "supplement" | "service"
                     ) => setValue("type", value)}>
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
                        {...register("price", {
                           required: "Price is required",
                           min: {
                              value: 0.01,
                              message: "Price must be greater than 0",
                           },
                        })}
                        placeholder="0.00"
                        className={errors.price ? "border-red-500" : ""}
                     />
                     {errors.price && (
                        <p className="text-sm text-red-500">
                           {errors.price.message}
                        </p>
                     )}
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="currency">Currency</Label>
                     <Select
                        value={watch("currency")}
                        onValueChange={(value) => setValue("currency", value)}>
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
                     {...register("stock_quantity", {
                        required: "Stock quantity is required",
                        min: {
                           value: 0,
                           message: "Stock quantity must be 0 or greater",
                        },
                     })}
                     placeholder="0"
                     className={errors.stock_quantity ? "border-red-500" : ""}
                  />
                  {errors.stock_quantity && (
                     <p className="text-sm text-red-500">
                        {errors.stock_quantity.message}
                     </p>
                  )}
               </div>

               <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                     value={watch("status")}
                     onValueChange={(value: "active" | "inactive") =>
                        setValue("status", value)
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
                     checked={watch("prescription_required")}
                     onCheckedChange={(checked) =>
                        setValue("prescription_required", checked)
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
                  <Button type="submit" disabled={isPending}>
                     {isPending ? (
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                           <span className="animate-pulse">Requesting...</span>
                        </div>
                     ) : (
                        "Submit"
                     )}
                  </Button>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
}
