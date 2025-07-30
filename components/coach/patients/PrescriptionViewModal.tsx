"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import usePrescriptions from "@/hooks/usePrescriptions";
import { PrescriptionData } from "@/lib/zod_schemas/prescription.schema";
import { Loader2, Package } from "lucide-react";
import { useState } from "react";
import { type Patient } from "./mockData";

interface PrescriptionViewModalProps {
   patient: Patient | null;
   isOpen: boolean;
   onClose: () => void;
}

const getStatusBadgeVariant = (status: PrescriptionData["status"]) => {
   switch (status) {
      case "active":
         return "default";
      case "completed":
         return "secondary";
      case "discontinued":
         return "destructive";
      default:
         return "secondary";
   }
};

export function PrescriptionViewModal({
   patient,
   isOpen,
   onClose,
}: PrescriptionViewModalProps) {
   const [error, setError] = useState<string | null>(null);

   // Fetch prescriptions for the patient
   const {
      data: prescriptions = [],
      isLoading,
      error: prescriptionsError,
      refetch,
   } = usePrescriptions(patient?.id || "");



   // Don't render content if no patient
   if (!patient) {
      return null;
   }

   const handleClose = () => {
      setError(null);
      onClose();
   };

   const handleRetry = () => {
      setError(null);
      refetch();
   };

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>
                     Prescription History - {patient ? `${patient.user.first_name} ${patient.user.last_name}` : ''}
                  </span>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">


               {/* Loading State */}
               {isLoading && (
                  <div className="flex items-center justify-center py-12">
                     <Loader2 className="h-8 w-8 animate-spin" />
                     <span className="ml-2">Loading prescriptions...</span>
                  </div>
               )}

               {/* Error State */}
               {prescriptionsError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                     <p className="text-red-600 text-sm mb-2">
                        Failed to load prescriptions. Please try again.
                     </p>
                     <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleRetry}
                     >
                        Retry
                     </Button>
                  </div>
               )}

               {/* Error from component */}
               {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                     <p className="text-red-600 text-sm">{error}</p>
                  </div>
               )}

               {/* No Prescriptions */}
               {!isLoading && !prescriptionsError && prescriptions.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                     <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                     <p className="text-lg font-medium mb-2">No Prescriptions Found</p>
                     <p className="text-sm">
                        {patient ? `${patient.user.first_name} ${patient.user.last_name}` : 'This patient'} has no prescription history yet.
                     </p>
                  </div>
               )}

               {/* Prescriptions List */}
               {!isLoading && !prescriptionsError && prescriptions.length > 0 && (
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                           Showing {prescriptions.length} prescription{prescriptions.length !== 1 ? 's' : ''}
                        </p>
                        <Button 
                           variant="outline" 
                           size="sm" 
                           onClick={() => refetch()}
                        >
                           Refresh
                        </Button>
                     </div>

                     <div className="space-y-4">
                        {prescriptions.map((prescription: PrescriptionData) => (
                           <div
                              key={prescription.id}
                              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-start justify-between">
                                 <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                       <h4 className="font-medium text-lg">
                                          {prescription.product_name}
                                       </h4>
                                       <Badge
                                          variant={getStatusBadgeVariant(
                                             prescription.status
                                          )}>
                                          {prescription.status}
                                       </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                                       <div>
                                          <span className="font-medium text-foreground">Dosage:</span>{" "}
                                          {prescription.dosage}
                                       </div>
                                       <div>
                                          <span className="font-medium text-foreground">Frequency:</span>{" "}
                                          {prescription.frequency}
                                       </div>
                                       <div>
                                          <span className="font-medium text-foreground">Duration:</span>{" "}
                                          {prescription.duration}
                                       </div>
                                       <div>
                                          <span className="font-medium text-foreground">
                                             Prescribed:
                                          </span>{" "}
                                          {new Date(
                                             prescription.created_at
                                          ).toLocaleDateString()}
                                       </div>
                                    </div>

                                    {prescription.instructions && (
                                       <div className="mb-3">
                                          <span className="text-sm font-medium text-foreground">
                                             Instructions:
                                          </span>
                                          <p className="text-sm mt-1 text-muted-foreground">
                                             {prescription.instructions}
                                          </p>
                                       </div>
                                    )}

                                    {prescription.notes && (
                                       <div className="mb-3">
                                          <span className="text-sm font-medium text-foreground">
                                             Notes:
                                          </span>
                                          <p className="text-sm mt-1 text-muted-foreground">
                                             {prescription.notes}
                                          </p>
                                       </div>
                                    )}

                                    <div className="text-xs text-muted-foreground">
                                       Last updated: {new Date(prescription.updated_at).toLocaleString()}
                                    </div>
                                 </div>

                                 <div className="flex items-center space-x-2 ml-4">
                                    {prescription.status === "active" && (
                                       <>
                                          <Button variant="outline" size="sm">
                                             Mark Complete
                                          </Button>
                                          <Button variant="outline" size="sm">
                                             Discontinue
                                          </Button>
                                       </>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            <div className="flex justify-end pt-4">
               <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
               >
                  Close
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
} 