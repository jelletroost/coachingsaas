"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

interface PrescriptionData {
   id: string;
   patientId: string;
   patientName: string;
   productId: string;
   productName: string;
   dosage: string;
   frequency: string;
   duration: string;
   instructions: string;
   notes: string;
   status: "active" | "completed" | "discontinued";
   prescribedAt: string;
   completedAt?: string;
}

interface PrescriptionHistoryProps {
   prescriptions: PrescriptionData[];
   patientName: string;
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
}: PrescriptionHistoryProps) {
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
               {prescriptions.map((prescription) => (
                  <div
                     key={prescription.id}
                     className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                     <div className="flex items-start justify-between">
                        <div className="flex-1">
                           <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">
                                 {prescription.productName}
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
                                    prescription.prescribedAt
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
         </CardContent>
      </Card>
   );
}
