import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

interface Appointment {
   id: string;
   patientName: string;
   time: string;
   duration: string;
   type: string;
   status: "confirmed" | "pending" | "cancelled";
}

interface AppointmentScheduleProps {
   appointments: Appointment[];
   title?: string;
}

const getStatusColor = (status: Appointment["status"]) => {
   switch (status) {
      case "confirmed":
         return "bg-green-100 text-green-800";
      case "pending":
         return "bg-yellow-100 text-yellow-800";
      case "cancelled":
         return "bg-red-100 text-red-800";
      default:
         return "bg-gray-100 text-gray-800";
   }
};

const getSessionTypeIcon = (type: string) => {
   if (
      type.toLowerCase().includes("video") ||
      type.toLowerCase().includes("call")
   ) {
      return Video;
   }
   return Calendar;
};

export function AppointmentSchedule({
   appointments,
   title = "Today's Schedule",
}: AppointmentScheduleProps) {
   return (
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <CardTitle className="text-lg font-semibold">{title}</CardTitle>
               <Button variant="outline" size="sm">
                  View All
               </Button>
            </div>
         </CardHeader>
         <CardContent>
            <div className="space-y-4">
               {appointments.length === 0 ? (
                  <div className="text-center py-8">
                     <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                     <p className="text-muted-foreground">
                        No appointments scheduled
                     </p>
                  </div>
               ) : (
                  appointments.map((appointment) => {
                     const SessionIcon = getSessionTypeIcon(appointment.type);
                     return (
                        <div
                           key={appointment.id}
                           className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                           <div className="flex-shrink-0">
                              <Avatar className="w-10 h-10">
                                 <AvatarFallback className="text-sm">
                                    {appointment.patientName
                                       .split(" ")
                                       .map((n) => n[0])
                                       .join("")}
                                 </AvatarFallback>
                              </Avatar>
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                 <h4 className="text-sm font-medium text-foreground">
                                    {appointment.patientName}
                                 </h4>
                                 <Badge
                                    variant="secondary"
                                    className={getStatusColor(
                                       appointment.status
                                    )}>
                                    {appointment.status}
                                 </Badge>
                              </div>
                              <div className="flex items-center space-x-4 mt-1">
                                 <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span>{appointment.time}</span>
                                 </div>
                                 <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <SessionIcon className="w-3 h-3" />
                                    <span>{appointment.type}</span>
                                 </div>
                                 <span className="text-xs text-muted-foreground">
                                    {appointment.duration}
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  })
               )}
            </div>
            {appointments.length > 0 && (
               <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-muted-foreground">
                        Total: {appointments.length} appointments
                     </span>
                     <Button variant="ghost" size="sm">
                        Schedule New
                     </Button>
                  </div>
               </div>
            )}
         </CardContent>
      </Card>
   );
}
