
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
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
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/hooks/useProducts"; // Use the cached hook instead
import { Product as DatabaseProduct } from "@/lib/types/database";
import { prescriptionSchema, type PrescriptionFormData } from "@/lib/zod_schemas/prescription.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type Patient } from "./mockData";

interface PrescriptionModalProps {
   patient: Patient | null;
   isOpen: boolean;
   onClose: () => void;
   onPrescribe: (prescription: PrescriptionData) => Promise<void>;
}

export type PrescriptionData = {
   id: string;
   patient_id: string;
   patient_name: string;
   product_name: string;
   product_id: string;
   dosage: string;
   frequency: string;
   duration: string;
   instructions: string;
   notes: string;
   status: string;
   created_at: string;
}

const frequencyOptions = [
   { value: "once_daily", label: "Once daily" },
   { value: "twice_daily", label: "Twice daily" },
   { value: "three_times_daily", label: "Three times daily" },
   { value: "four_times_daily", label: "Four times daily" },
   { value: "as_needed", label: "As needed" },
   { value: "weekly", label: "Weekly" },
   { value: "monthly", label: "Monthly" },
];

const durationOptions = [
   { value: "7_days", label: "7 days" },
   { value: "14_days", label: "14 days" },
   { value: "30_days", label: "30 days" },
   { value: "60_days", label: "60 days" },
   { value: "90_days", label: "90 days" },
   { value: "ongoing", label: "Ongoing" },
   { value: "until_finished", label: "Until finished" },
];

export function PrescriptionModal({
   patient,
   isOpen,
   onClose,
   onPrescribe,
}: PrescriptionModalProps) {
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedProduct, setSelectedProduct] = useState<DatabaseProduct | null>(null);
   const [submitting, setSubmitting] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);

   // Use the cached products hook instead of direct API call
   const { data: products = [], isLoading: loading, error: productsError } = useProducts();

   // React Hook Form setup
   const {
      register,
      handleSubmit,
      setValue,
      watch,
      reset,
      formState: { errors, isValid },
   } = useForm<PrescriptionFormData>({
      resolver: zodResolver(prescriptionSchema),
      mode: "onChange",
      defaultValues: {
         product_id: "",
         dosage: "",
         frequency: "",
         duration: "",
         instructions: "",
         notes: "",
      },
   });

   const watchedProductId = watch("product_id");

   // Filter products based on search term and status
   const filteredProducts = products.filter((product: DatabaseProduct) => {
      if (!product.status || product.status !== "active") return false;
      
      const matchesSearch =
         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
   });

   const handleProductSelect = (product: DatabaseProduct) => {
      setSelectedProduct(product);
      setValue("product_id", product.id);
      setValue("dosage", "");
      setValue("frequency", "");
      setValue("duration", "");
      setValue("instructions", "");
      setValue("notes", "");
   };

   const onSubmit = async (data: PrescriptionFormData) => {
      if (!patient) return;

      setSubmitting(true);
      setError(null);
      try {
         const prescription: PrescriptionData = {
            patient_id: patient.id,
            product_id: data.product_id,
            product_name: selectedProduct?.name || "",
            patient_name: patient.user.first_name + " " + patient.user.last_name,
            dosage: data.dosage,
            frequency: data.frequency,
            duration: data.duration,
            instructions: data.instructions,
            notes: data.notes || "",
            status: 'active'
         };

         await onPrescribe(prescription);
         setSuccess(true);
      } catch {
         setError("Something went wrong. Please try again.");
      } finally {
         setSubmitting(false);
      }
   };

   const handleClose = () => {
      setSearchTerm("");
      setSelectedProduct(null);
      setError(null);
      setSuccess(false);
      reset();
      onClose();
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>Prescribe Product to {patient ? `${patient.user.first_name} ${patient.user.last_name}` : ''}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
               {/* Product Selection */}
               <div>
                  <Label className="text-base font-semibold">
                     Select Product
                  </Label>
                  <div className="relative mt-2">
                     <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                     <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                     />
                  </div>

                  {loading && (
                     <div className="mt-4 flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="ml-2">Loading products from cache...</span>
                     </div>
                  )}

                  {productsError && (
                     <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">Failed to load products. Please try again.</p>
                        <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => window.location.reload()}
                           className="mt-2"
                        >
                           Retry
                        </Button>
                     </div>
                  )}

                  {error && (
                     <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                     </div>
                  )}

                  {!loading && !productsError && (
                     <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                        {filteredProducts.length === 0 ? (
                           <div className="text-center py-8 text-muted-foreground">
                              {searchTerm ? "No products found matching your search." : "No products available in database."}
                           </div>
                        ) : (
                           filteredProducts.map((product: DatabaseProduct) => (
                              <div
                                 key={product.id}
                                 className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                    watchedProductId === product.id
                                       ? "border-blue-500 bg-blue-50"
                                       : "border-border hover:bg-muted/50"
                                 }`}
                                 onClick={() => handleProductSelect(product)}>
                                 <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                       <div className="font-medium">
                                          {product.name}
                                       </div>
                                       <div className="text-sm text-muted-foreground">
                                          {product.description}
                                       </div>
                                       <div className="flex items-center space-x-2 mt-1">
                                          <Badge variant="outline">
                                             {product.type}
                                          </Badge>
                                          <span className="text-sm font-medium">
                                             ${product.price} {product.currency}
                                          </span>
                                          {product.prescription_required && (
                                             <Badge variant="destructive">
                                                Prescription Required
                                             </Badge>
                                          )}
                                          <span className="text-xs text-muted-foreground">
                                             Stock: {product.stock_quantity}
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))
                        )}
                     </div>
                  )}
                  
                  {errors.product_id && (
                     <p className="mt-2 text-sm text-red-600">{errors.product_id.message}</p>
                  )}
               </div>

               {watchedProductId && (
                  <>
                     {/* Prescription Details */}
                     <div className="space-y-4">
                        <Label className="text-base font-semibold">
                           Prescription Details
                        </Label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="dosage">Dosage</Label>
                              <Input
                                 id="dosage"
                                 {...register("dosage")}
                                 placeholder="e.g., 500mg, 1 tablet"
                                 className={errors.dosage ? "border-red-500" : ""}
                              />
                              {errors.dosage && (
                                 <p className="mt-1 text-sm text-red-600">{errors.dosage.message}</p>
                              )}
                           </div>

                           <div>
                              <Label htmlFor="frequency">Frequency</Label>
                              <Select
                                 value={watch("frequency")}
                                 onValueChange={(value) => setValue("frequency", value)}>
                                 <SelectTrigger className={errors.frequency ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select frequency" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {frequencyOptions.map((option) => (
                                       <SelectItem
                                          key={option.value}
                                          value={option.value}>
                                          {option.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              {errors.frequency && (
                                 <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
                              )}
                           </div>

                           <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Select
                                 value={watch("duration")}
                                 onValueChange={(value) => setValue("duration", value)}>
                                 <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select duration" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {durationOptions.map((option) => (
                                       <SelectItem
                                          key={option.value}
                                          value={option.value}>
                                          {option.label}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              {errors.duration && (
                                 <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                              )}
                           </div>

                           <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Input
                                 id="notes"
                                 {...register("notes")}
                                 placeholder="Additional notes for the patient"
                              />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="instructions">Instructions</Label>
                           <Textarea
                              id="instructions"
                              {...register("instructions")}
                              placeholder="Detailed instructions for the patient"
                              rows={3}
                              className={errors.instructions ? "border-red-500" : ""}
                           />
                           {errors.instructions && (
                              <p className="mt-1 text-sm text-red-600">{errors.instructions.message}</p>
                           )}
                        </div>
                     </div>

                     {/* Selected Product Summary */}
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <Label className="text-sm font-medium text-muted-foreground">
                           Selected Product (From Cache)
                        </Label>
                        <div className="mt-2">
                           <div className="font-medium">
                              {selectedProduct?.name}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {selectedProduct?.description}
                           </div>
                           <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">
                                 {selectedProduct?.type}
                              </Badge>
                              <span className="text-sm">
                                 ${selectedProduct?.price} {selectedProduct?.currency}
                              </span>
                              {selectedProduct?.prescription_required && (
                                 <Badge variant="destructive">
                                    Prescription Required
                                 </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                 Stock: {selectedProduct?.stock_quantity}
                              </span>
                           </div>
                        </div>
                     </div>
                  </>
               )}

               <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                     type="button" 
                     variant="outline" 
                     onClick={handleClose}
                     disabled={submitting}
                  >
                     Cancel
                  </Button>
                  <Button 
                     type="submit" 
                     disabled={!isValid || submitting || success}
                  >
                     {submitting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Prescribing...
                        </>
                     ) : success ? (
                        "Prescription Submitted ✓"
                     ) : (
                        "Prescribe Product"
                     )}
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}