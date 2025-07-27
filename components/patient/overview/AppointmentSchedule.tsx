import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Calendar,
   Clock,
   MessageSquare,
   Plus,
   User,
   Video,
} from "lucide-react";

interface Appointment {
   id: string;
   title: string;
   date: string;
   time: string;
   duration: number;
   type: "video" | "phone" | "in-person";
   coachName: string;
   coachAvatar?: string;
   coachSpecialty: string;
   status: "confirmed" | "pending" | "cancelled";
   notes?: string;
}

interface AppointmentScheduleProps {
   appointments: Appointment[];
   title?: string;
}

const getAppointmentTypeIcon = (type: Appointment["type"]) => {
   switch (type) {
      case "video":
         return Video;
      case "phone":
         return MessageSquare;
      case "in-person":
         return User;
      default:
         return Calendar;
   }
};

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

const formatDate = (dateString: string) => {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
   });
};

export function AppointmentSchedule({
   appointments,
   title = "Upcoming Appointments",
}: AppointmentScheduleProps) {
   const upcomingAppointments = appointments.filter(
      (apt) => apt.status === "confirmed" || apt.status === "pending"
   );

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Button size="sm" className="h-8">
               <Plus className="h-4 w-4 mr-1" />
               Schedule
            </Button>
         </CardHeader>
         <CardContent className="space-y-3">
            {upcomingAppointments.length === 0 ? (
               <div className="text-center py-6 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No upcoming appointments</p>
                  <Button variant="outline" size="sm" className="mt-2">
                     Schedule Appointment
                  </Button>
               </div>
            ) : (
               upcomingAppointments.map((appointment) => {
                  const TypeIcon = getAppointmentTypeIcon(appointment.type);
                  return (
                     <div
                        key={appointment.id}
                        className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                        <div className="flex-shrink-0">
                           <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                 {appointment.coachName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                              </AvatarFallback>
                           </Avatar>
                        </div>
                        <div className="flex-1 space-y-1">
                           <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                 {appointment.title}
                              </p>
                              <Badge
                                 className={`text-xs ${getStatusColor(
                                    appointment.status
                                 )}`}>
                                 {appointment.status}
                              </Badge>
                           </div>
                           <p className="text-sm text-muted-foreground">
                              {appointment.coachName} •{" "}
                              {appointment.coachSpecialty}
                           </p>
                           <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                 <Calendar className="h-3 w-3" />
                                 <span>{formatDate(appointment.date)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                 <Clock className="h-3 w-3" />
                                 <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                 <TypeIcon className="h-3 w-3" />
                                 <span>{appointment.type}</span>
                              </div>
                           </div>
                           {appointment.notes && (
                              <p className="text-xs text-muted-foreground">
                                 {appointment.notes}
                              </p>
                           )}
                           <div className="flex items-center space-x-2 pt-2">
                              <Button
                                 variant="outline"
                                 size="sm"
                                 className="text-xs">
                                 Reschedule
                              </Button>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 className="text-xs">
                                 Cancel
                              </Button>
                              <Button
                                 variant="outline"
                                 size="sm"
                                 className="text-xs">
                                 Message
                              </Button>
                           </div>
                        </div>
                     </div>
                  );
               })
            )}
         </CardContent>
      </Card>
   );
}
