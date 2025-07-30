"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrescriptionData } from "@/lib/zod_schemas/prescription.schema";
import { updatePrescriptionStatus } from "@/services/patients_services";
import { Package } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";


interface PrescriptionHistoryProps {
   prescriptions: PrescriptionData[];
   patientName: string;
   onRefetch?: () => void;
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

export function PrescriptionHistory({
   prescriptions,
   patientName,
   onRefetch,
}: PrescriptionHistoryProps) {
   const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

   const handleStatusChange = async (prescriptionId: string, newStatus: "completed" | "discontinued") => {
      try {
         setUpdatingStatus(prescriptionId);
         
         await updatePrescriptionStatus(prescriptionId, newStatus);
         
         toast.success(`Prescription ${newStatus === "completed" ? "marked as complete" : "discontinued"} successfully`);
         
         // Refetch prescriptions to show updated data
         if (onRefetch) {
            onRefetch();
         }
      } catch (error) {
         console.error("Error updating prescription status:", error);
         toast.error("Failed to update prescription status. Please try again.");
      } finally {
         setUpdatingStatus(null);
      }
   };
   // Sort prescriptions: active first, then by created_at date (latest first)
   const sortedPrescriptions = [...prescriptions].sort((a, b) => {
      // First, sort by status: active first, then completed, then discontinued
      const statusOrder = { active: 0, completed: 1, discontinued: 2 };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      
      // If status is different, sort by status
      if (statusDiff !== 0) {
         return statusDiff;
      }
      
      // If status is the same, sort by date (latest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
   });
   if (prescriptions.length === 0) {
      return (
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Prescription History</span>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No prescriptions found for {patientName}</p>
               </div>
            </CardContent>
         </Card>
      );
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center space-x-2">
               <Package className="h-5 w-5" />
               <span>Prescription History ({prescriptions.length})</span>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {sortedPrescriptions.map((prescription) => (
                  <div
                     key={prescription.id}
                     className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                     <div className="flex items-start justify-between">
                        <div className="flex-1">
                           <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">
                                 {prescription.product_name}
                              </h4>
                              <Badge
                                 variant={getStatusBadgeVariant(
                                    prescription.status
                                 )}>
                                 {prescription.status}
                              </Badge>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div>
                                 <span className="font-medium">Dosage:</span>{" "}
                                 {prescription.dosage}
                              </div>
                              <div>
                                 <span className="font-medium">Frequency:</span>{" "}
                                 {prescription.frequency}
                              </div>
                              <div>
                                 <span className="font-medium">Duration:</span>{" "}
                                 {prescription.duration}
                              </div>
                              <div>
                                 <span className="font-medium">
                                    Prescribed:
                                 </span>{" "}
                                 {new Date(
                                    prescription.created_at
                                 ).toLocaleDateString()}
                              </div>
                           </div>

                           {prescription.instructions && (
                              <div className="mt-2">
                                 <span className="text-sm font-medium text-muted-foreground">
                                    Instructions:
                                 </span>
                                 <p className="text-sm mt-1">
                                    {prescription.instructions}
                                 </p>
                              </div>
                           )}

                           {prescription.notes && (
                              <div className="mt-2">
                                 <span className="text-sm font-medium text-muted-foreground">
                                    Notes:
                                 </span>
                                 <p className="text-sm mt-1">
                                    {prescription.notes}
                                 </p>
                              </div>
                           )}
                        </div>

                        <div className="flex items-center space-x-2">
                           {prescription.status === "active" && (
                              <>
                                 <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleStatusChange(prescription.id, "completed")}
                                    disabled={updatingStatus === prescription.id}
                                 >
                                    {updatingStatus === prescription.id ? "Updating..." : "Mark Complete"}
                                 </Button>
                                 <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleStatusChange(prescription.id, "discontinued")}
                                    disabled={updatingStatus === prescription.id}
                                 >
                                    {updatingStatus === prescription.id ? "Updating..." : "Discontinue"}
                                 </Button>
                              </>
                           )}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
   );
}
