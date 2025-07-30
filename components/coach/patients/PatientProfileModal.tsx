import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { type Patient } from "./mockData";

interface PatientProfileModalProps {
   patient: Patient;
   isOpen: boolean;
   onClose: () => void;
}

const getStatusColor = (status: Patient["account_status"]) => {
   switch (status) {
      case "active":
         return "bg-green-100 text-green-800";
      case "inactive":
         return "bg-gray-100 text-gray-800";
      case "pending":
         return "bg-yellow-100 text-yellow-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

export function PatientProfileModal({
   patient,
   isOpen,
   onClose,
}: PatientProfileModalProps) {
   const patientName = `${patient.user.first_name} ${patient.user.last_name}`;
   
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                     <AvatarFallback className="text-lg">
                        {patientName
                           .split(" ")
                           .map((n) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <h2 className="text-xl font-semibold">{patientName}</h2>
                     <p className="text-sm text-muted-foreground">
                        {patient.user.email}
                     </p>
                  </div>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
               <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="overview">Profile</TabsTrigger>
                     <TabsTrigger value="prescriptions">
                        Prescriptions
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Patient Information
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Status
                                 </label>
                                 <div className="mt-1">
                                    <Badge
                                       variant="secondary"
                                       className={getStatusColor(
                                          patient.account_status
                                       )}>
                                       {patient.account_status}
                                    </Badge>
                                 </div>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Join Date
                                 </label>
                                 <p className="mt-1">
                                    {new Date(
                                       patient.created_at
                                    ).toLocaleDateString()}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Last Active
                                 </label>
                                 <p className="mt-1">
                                    {new Date(
                                       patient.updated_at
                                    ).toLocaleDateString()}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Phone
                                 </label>
                                 <p className="mt-1">
                                    {patient.phone || "Not provided"}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Date of Birth
                                 </label>
                                 <p className="mt-1">
                                    {patient.date_of_birth 
                                       ? new Date(patient.date_of_birth).toLocaleDateString()
                                       : "Not provided"}
                                 </p>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="prescriptions" className="space-y-4">
                     {/* <PrescriptionHistory
                        prescriptions={prescriptions}
                        patientName={patientName}
                     /> */}
                  </TabsContent>
               </Tabs>

               {/* Action Buttons */}
               <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={onClose}>
                     Close
                  </Button>
                  <Button>
                     <MessageSquare className="w-4 h-4 mr-2" />
                     Send Message
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
