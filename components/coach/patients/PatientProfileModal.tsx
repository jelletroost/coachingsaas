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
import { MessageSquare, Target } from "lucide-react";
import { type Patient } from "./mockData";
import { PrescriptionHistory } from "./PrescriptionHistory";

interface PatientProfileModalProps {
   patient: Patient;
   isOpen: boolean;
   onClose: () => void;
}

const getStatusColor = (status: Patient["status"]) => {
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

// Mock prescription data - in a real app, this would come from the database
const mockPrescriptions = [
   {
      id: "1",
      patientId: "1",
      patientName: "John Doe",
      productId: "1",
      productName: "Metformin 500mg",
      dosage: "500mg",
      frequency: "twice_daily",
      duration: "30_days",
      instructions: "Take with meals to reduce stomach upset",
      notes: "Monitor blood sugar levels regularly",
      status: "active" as const,
      prescribedAt: "2024-01-15T10:30:00Z",
   },
   {
      id: "2",
      patientId: "1",
      patientName: "John Doe",
      productId: "2",
      productName: "Omega-3 Fish Oil Supplement",
      dosage: "1000mg",
      frequency: "once_daily",
      duration: "90_days",
      instructions: "Take 1 softgel daily with meals",
      notes: "Good for heart health",
      status: "completed" as const,
      prescribedAt: "2024-01-10T09:15:00Z",
      completedAt: "2024-04-10T09:15:00Z",
   },
];

export function PatientProfileModal({
   patient,
   isOpen,
   onClose,
}: PatientProfileModalProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
               <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                     <AvatarFallback className="text-lg">
                        {patient.name
                           .split(" ")
                           .map((n) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>
                  <div>
                     <h2 className="text-xl font-semibold">{patient.name}</h2>
                     <p className="text-sm text-muted-foreground">
                        {patient.email}
                     </p>
                  </div>
               </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
               <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                     <TabsTrigger value="overview">Overview</TabsTrigger>
                     <TabsTrigger value="health">Health</TabsTrigger>
                     <TabsTrigger value="goals">Goals</TabsTrigger>
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
                                          patient.status
                                       )}>
                                       {patient.status}
                                    </Badge>
                                 </div>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Join Date
                                 </label>
                                 <p className="mt-1">
                                    {new Date(
                                       patient.joinDate
                                    ).toLocaleDateString()}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Last Active
                                 </label>
                                 <p className="mt-1">
                                    {new Date(
                                       patient.lastActive
                                    ).toLocaleDateString()}
                                 </p>
                              </div>
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Assigned Coach
                                 </label>
                                 <p className="mt-1">{patient.assignedCoach}</p>
                              </div>
                           </div>

                           {patient.notes && (
                              <div>
                                 <label className="text-sm font-medium text-muted-foreground">
                                    Notes
                                 </label>
                                 <p className="mt-1 text-sm">{patient.notes}</p>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="health" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Health Metrics
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {patient.healthMetrics.weight && (
                                 <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold">
                                       {patient.healthMetrics.weight} kg
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       Weight
                                    </div>
                                 </div>
                              )}
                              {patient.healthMetrics.bloodPressure && (
                                 <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold">
                                       {patient.healthMetrics.bloodPressure}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       Blood Pressure
                                    </div>
                                 </div>
                              )}
                              {patient.healthMetrics.heartRate && (
                                 <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold">
                                       {patient.healthMetrics.heartRate} bpm
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       Heart Rate
                                    </div>
                                 </div>
                              )}
                              {patient.healthMetrics.sleepHours && (
                                 <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold">
                                       {patient.healthMetrics.sleepHours}h
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                       Sleep
                                    </div>
                                 </div>
                              )}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="goals" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Health Goals
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-3">
                              {patient.goals.map((goal, index) => (
                                 <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <Target className="w-5 h-5 text-blue-500" />
                                    <span className="flex-1">{goal}</span>
                                    <Badge variant="outline">In Progress</Badge>
                                 </div>
                              ))}
                           </div>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  <TabsContent value="prescriptions" className="space-y-4">
                     <PrescriptionHistory
                        prescriptions={mockPrescriptions}
                        patientName={patient.name}
                     />
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
