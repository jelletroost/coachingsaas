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
import { Search, Star } from "lucide-react";
import { useState } from "react";
import { type Product, mockProducts } from "../products/mockData";
import { type Patient } from "./mockData";

interface PrescriptionModalProps {
   patient: Patient | null;
   isOpen: boolean;
   onClose: () => void;
   onPrescribe: (prescription: PrescriptionData) => void;
}

interface PrescriptionData {
   patientId: string;
   patientName: string;
   productId: string;
   productName: string;
   dosage: string;
   frequency: string;
   duration: string;
   instructions: string;
   notes: string;
   prescribedAt: string;
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
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [dosage, setDosage] = useState("");
   const [frequency, setFrequency] = useState("");
   const [duration, setDuration] = useState("");
   const [instructions, setInstructions] = useState("");
   const [notes, setNotes] = useState("");

   const filteredProducts = mockProducts.filter((product) => {
      const matchesSearch =
         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
         product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
   });

   const handleProductSelect = (product: Product) => {
      setSelectedProduct(product);
      // Pre-fill dosage if available
      if (product.specifications.dosage) {
         setDosage(product.specifications.dosage);
      }
      // Pre-fill instructions if available
      if (product.instructions) {
         setInstructions(product.instructions);
      }
   };

   const handlePrescribe = () => {
      if (!patient || !selectedProduct) return;

      const prescription: PrescriptionData = {
         patientId: patient.id,
         patientName: patient.name,
         productId: selectedProduct.id,
         productName: selectedProduct.name,
         dosage,
         frequency,
         duration,
         instructions,
         notes,
         prescribedAt: new Date().toISOString(),
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
      onClose();
   };

   const isFormValid = selectedProduct && dosage && frequency && duration;

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle>Prescribe Product to {patient?.name}</DialogTitle>
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
                     />
                  </div>

                  <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
                     {filteredProducts.map((product) => (
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
                                       {product.category}
                                    </Badge>
                                    <div className="flex items-center space-x-1">
                                       <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                       <span className="text-xs">
                                          {product.rating} (
                                          {product.reviewCount})
                                       </span>
                                    </div>
                                    <span className="text-sm font-medium">
                                       ${product.price}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
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
                           Selected Product
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
                                 {selectedProduct.category}
                              </Badge>
                              <span className="text-sm">
                                 ${selectedProduct.price}
                              </span>
                              {selectedProduct.prescription.required && (
                                 <Badge variant="destructive">
                                    Prescription Required
                                 </Badge>
                              )}
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
