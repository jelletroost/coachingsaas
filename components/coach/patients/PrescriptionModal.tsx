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
import { Product as DatabaseProduct } from "@/lib/types/database";
import { getAllProducts } from "@/services/product_service";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { type Patient } from "./mockData";

interface PrescriptionModalProps {
   patient: Patient | null;
   isOpen: boolean;
   onClose: () => void;
   onPrescribe: (prescription: PrescriptionData) => void;
}

export type PrescriptionData ={
   patient_id: string;
   product_id: string;
   dosage: string;
   frequency: string;
   duration: string;
   instructions: string;
   notes: string;
   status: string;
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
   const [products, setProducts] = useState<DatabaseProduct[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [dosage, setDosage] = useState("");
   const [frequency, setFrequency] = useState("");
   const [duration, setDuration] = useState("");
   const [instructions, setInstructions] = useState("");
   const [notes, setNotes] = useState("");

   // Fetch products from database when modal opens
   useEffect(() => {
      if (isOpen) {
         fetchProducts();
      }
   }, [isOpen]);

   const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await getAllProducts();
         setProducts(response || []);
      } catch{
         setError("Failed to load products. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const filteredProducts = products.filter((product) => {
      if (!product.status || product.status !== "active") return false;
      
      const matchesSearch =
         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
   });

   const handleProductSelect = (product: DatabaseProduct) => {
      setSelectedProduct(product);
      setDosage("");
      setFrequency("");
      setDuration("");
      setInstructions("");
      setNotes("");
   };

   const handlePrescribe = () => {
      if (!patient || !selectedProduct) return;

      const prescription: PrescriptionData = {
         patient_id: patient.id,
         product_id: selectedProduct.id,
         dosage,
         frequency,
         duration,
         instructions,
         notes,
         status:'active'
      };

      onPrescribe(prescription);
      handleClose();
   };

   const handleClose = () => {
      setSearchTerm("");
      setSelectedProduct(null);
      setDosage("");
      setFrequency("");
      setDuration("");
      setInstructions("");
      setNotes("");
      setError(null);
      onClose();
   };

   const isFormValid = selectedProduct && dosage && frequency && duration;

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>Prescribe Product to {patient ? `${patient.user.first_name} ${patient.user.last_name}` : ''}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
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
                        <span className="ml-2">Loading products from database...</span>
                     </div>
                  )}

                  {error && (
                     <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                        <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={fetchProducts}
                           className="mt-2"
                        >
                           Retry
                        </Button>
                     </div>
                  )}

                  {!loading && !error && (
                     <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                        {filteredProducts.length === 0 ? (
                           <div className="text-center py-8 text-muted-foreground">
                              {searchTerm ? "No products found matching your search." : "No products available in database."}
                           </div>
                        ) : (
                           filteredProducts.map((product) => (
                              <div
                                 key={product.id}
                                 className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                                    selectedProduct?.id === product.id
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
               </div>

               {selectedProduct && (
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
                                 value={dosage}
                                 onChange={(e) => setDosage(e.target.value)}
                                 placeholder="e.g., 500mg, 1 tablet"
                              />
                           </div>

                           <div>
                              <Label htmlFor="frequency">Frequency</Label>
                              <Select
                                 value={frequency}
                                 onValueChange={setFrequency}>
                                 <SelectTrigger>
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
                           </div>

                           <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Select
                                 value={duration}
                                 onValueChange={setDuration}>
                                 <SelectTrigger>
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
                           </div>

                           <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Input
                                 id="notes"
                                 value={notes}
                                 onChange={(e) => setNotes(e.target.value)}
                                 placeholder="Additional notes for the patient"
                              />
                           </div>
                        </div>

                        <div>
                           <Label htmlFor="instructions">Instructions</Label>
                           <Textarea
                              id="instructions"
                              value={instructions}
                              onChange={(e) => setInstructions(e.target.value)}
                              placeholder="Detailed instructions for the patient"
                              rows={3}
                           />
                        </div>
                     </div>

                     {/* Selected Product Summary */}
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <Label className="text-sm font-medium text-muted-foreground">
                           Selected Product (From Database)
                        </Label>
                        <div className="mt-2">
                           <div className="font-medium">
                              {selectedProduct.name}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {selectedProduct.description}
                           </div>
                           <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">
                                 {selectedProduct.type}
                              </Badge>
                              <span className="text-sm">
                                 ${selectedProduct.price} {selectedProduct.currency}
                              </span>
                              {selectedProduct.prescription_required && (
                                 <Badge variant="destructive">
                                    Prescription Required
                                 </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                 Stock: {selectedProduct.stock_quantity}
                              </span>
                           </div>
                        </div>
                     </div>
                  </>
               )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
               <Button variant="outline" onClick={handleClose}>
                  Cancel
               </Button>
               <Button onClick={handlePrescribe} disabled={!isFormValid}>
                  Prescribe Product
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
