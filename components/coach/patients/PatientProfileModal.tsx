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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Calendar,
   Clock,
   MessageSquare,
   Star,
   Target,
   TrendingUp,
} from "lucide-react";
import { type Patient } from "./mockData";

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
               {/* Quick Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                     <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                           <TrendingUp className="w-4 h-4 text-blue-500" />
                           <span className="text-sm font-medium">Progress</span>
                        </div>
                        <div className="text-2xl font-bold mt-1">
                           {patient.progress}%
                        </div>
                        <Progress value={patient.progress} className="mt-2" />
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                           <Star className="w-4 h-4 text-yellow-500" />
                           <span className="text-sm font-medium">
                              Satisfaction
                           </span>
                        </div>
                        <div className="text-2xl font-bold mt-1">
                           {patient.satisfaction}/5
                        </div>
                        <div className="flex space-x-1 mt-2">
                           {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                 key={star}
                                 className={`w-3 h-3 ${
                                    star <= patient.satisfaction
                                       ? "text-yellow-500 fill-current"
                                       : "text-gray-300"
                                 }`}
                              />
                           ))}
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                           <Calendar className="w-4 h-4 text-green-500" />
                           <span className="text-sm font-medium">Sessions</span>
                        </div>
                        <div className="text-2xl font-bold mt-1">
                           {patient.totalSessions}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                           Total completed
                        </p>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                           <MessageSquare className="w-4 h-4 text-blue-500" />
                           <span className="text-sm font-medium">Messages</span>
                        </div>
                        <div className="text-2xl font-bold mt-1">
                           {patient.unreadMessages}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                           Unread
                        </p>
                     </CardContent>
                  </Card>
               </div>

               <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                     <TabsTrigger value="overview">Overview</TabsTrigger>
                     <TabsTrigger value="health">Health</TabsTrigger>
                     <TabsTrigger value="goals">Goals</TabsTrigger>
                     <TabsTrigger value="activity">Activity</TabsTrigger>
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

                           {patient.nextAppointment && (
                              <div className="border rounded-lg p-4 bg-muted/50">
                                 <h4 className="font-medium mb-2">
                                    Next Appointment
                                 </h4>
                                 <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                       <Calendar className="w-4 h-4 text-blue-500" />
                                       <span>
                                          {patient.nextAppointment.date}
                                       </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                       <Clock className="w-4 h-4 text-green-500" />
                                       <span>
                                          {patient.nextAppointment.time}
                                       </span>
                                    </div>
                                    <Badge variant="outline">
                                       {patient.nextAppointment.type}
                                    </Badge>
                                 </div>
                              </div>
                           )}

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

                  <TabsContent value="activity" className="space-y-4">
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Recent Activity
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-3">
                              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                 <div className="flex-1">
                                    <p className="text-sm font-medium">
                                       Weekly Assessment Completed
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       2 hours ago
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                 <div className="flex-1">
                                    <p className="text-sm font-medium">
                                       Message Sent
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       1 day ago
                                    </p>
                                 </div>
                              </div>
                              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                                 <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                 <div className="flex-1">
                                    <p className="text-sm font-medium">
                                       Appointment Scheduled
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                       2 days ago
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </CardContent>
                     </Card>
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
                  <Button>
                     <Calendar className="w-4 h-4 mr-2" />
                     Schedule Appointment
                  </Button>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
}
