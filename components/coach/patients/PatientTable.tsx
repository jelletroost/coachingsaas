import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
   Calendar,
   MessageSquare,
   MoreHorizontal,
   Star,
   User,
} from "lucide-react";
import { type Patient } from "./mockData";

interface PatientTableProps {
   patients: Patient[];
   onViewProfile: (patient: Patient) => void;
   onSendMessage: (patient: Patient) => void;
   onScheduleAppointment: (patient: Patient) => void;
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

const getProgressColor = (progress: number) => {
   if (progress >= 80) return "bg-green-500";
   if (progress >= 50) return "bg-yellow-500";
   return "bg-red-500";
};

export function PatientTable({
   patients,
   onViewProfile,
   onSendMessage,
   onScheduleAppointment,
}: PatientTableProps) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg font-semibold">
               Patients ({patients.length})
            </CardTitle>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {patients.length === 0 ? (
                  <div className="text-center py-8">
                     <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                     <p className="text-muted-foreground">
                        No patients found matching your filters
                     </p>
                  </div>
               ) : (
                  patients.map((patient) => (
                     <div
                        key={patient.id}
                        className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        {/* Avatar and Name */}
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                           <Avatar className="w-12 h-12">
                              <AvatarFallback className="text-sm">
                                 {patient.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                           <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium text-foreground truncate">
                                 {patient.name}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">
                                 {patient.email}
                              </p>
                           </div>
                        </div>

                        {/* Status */}
                        <div className="hidden sm:block">
                           <Badge
                              variant="secondary"
                              className={getStatusColor(patient.status)}>
                              {patient.status}
                           </Badge>
                        </div>

                        {/* Progress */}
                        <div className="hidden md:block w-32">
                           <div className="flex items-center space-x-2">
                              <Progress
                                 value={patient.progress}
                                 className="w-16 h-2"
                              />
                              <span className="text-xs text-muted-foreground">
                                 {patient.progress}%
                              </span>
                           </div>
                        </div>

                        {/* Satisfaction */}
                        <div className="hidden lg:block">
                           <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs">
                                 {patient.satisfaction}
                              </span>
                           </div>
                        </div>

                        {/* Next Appointment */}
                        <div className="hidden xl:block">
                           {patient.nextAppointment ? (
                              <div className="text-xs text-muted-foreground">
                                 <div className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{patient.nextAppointment.date}</span>
                                 </div>
                                 <div>{patient.nextAppointment.time}</div>
                              </div>
                           ) : (
                              <span className="text-xs text-muted-foreground">
                                 No upcoming
                              </span>
                           )}
                        </div>

                        {/* Unread Messages */}
                        <div className="hidden lg:block">
                           {patient.unreadMessages > 0 ? (
                              <div className="flex items-center space-x-1">
                                 <MessageSquare className="w-4 h-4 text-blue-500" />
                                 <Badge
                                    variant="destructive"
                                    className="text-xs">
                                    {patient.unreadMessages}
                                 </Badge>
                              </div>
                           ) : (
                              <span className="text-xs text-muted-foreground">
                                 No messages
                              </span>
                           )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onViewProfile(patient)}>
                              View
                           </Button>
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                 <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                 </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                 <DropdownMenuItem
                                    onClick={() => onViewProfile(patient)}>
                                    <User className="mr-2 h-4 w-4" />
                                    View Profile
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onClick={() => onSendMessage(patient)}>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Message
                                 </DropdownMenuItem>
                                 <DropdownMenuItem
                                    onClick={() =>
                                       onScheduleAppointment(patient)
                                    }>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Appointment
                                 </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </CardContent>
      </Card>
   );
}
