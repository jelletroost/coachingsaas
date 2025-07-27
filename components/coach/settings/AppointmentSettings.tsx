"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Calendar, Clock, Users } from "lucide-react";
import {
   type CoachAppointmentSettings,
   appointmentDurationOptions,
} from "./mockData";

interface AppointmentSettingsProps {
   settings: CoachAppointmentSettings;
   onSettingsChange: (settings: CoachAppointmentSettings) => void;
}

export function AppointmentSettings({
   settings,
   onSettingsChange,
}: AppointmentSettingsProps) {
   const handleChange = (field: keyof CoachAppointmentSettings, value: any) => {
      onSettingsChange({
         ...settings,
         [field]: value,
      });
   };

   return (
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Appointment Duration & Timing
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="appointmentDuration">
                     Default Appointment Duration
                  </Label>
                  <Select
                     value={settings.appointmentDuration.toString()}
                     onValueChange={(value) =>
                        handleChange("appointmentDuration", parseInt(value))
                     }>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {appointmentDurationOptions.map((option) => (
                           <SelectItem
                              key={option.value}
                              value={option.value.toString()}>
                              {option.label}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="bufferTime">
                     Buffer Time Between Appointments (minutes)
                  </Label>
                  <Input
                     id="bufferTime"
                     type="number"
                     value={settings.bufferTime}
                     onChange={(e) =>
                        handleChange("bufferTime", parseInt(e.target.value))
                     }
                     min={0}
                     max={60}
                  />
                  <p className="text-sm text-muted-foreground">
                     Time between appointments for preparation and documentation
                  </p>
               </div>

               <div className="space-y-2">
                  <Label htmlFor="maxPatientsPerDay">
                     Maximum Patients Per Day
                  </Label>
                  <Input
                     id="maxPatientsPerDay"
                     type="number"
                     value={settings.maxPatientsPerDay}
                     onChange={(e) =>
                        handleChange(
                           "maxPatientsPerDay",
                           parseInt(e.target.value)
                        )
                     }
                     min={1}
                     max={20}
                  />
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Booking Preferences
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Allow Same-Day Bookings</Label>
                     <p className="text-sm text-muted-foreground">
                        Patients can book appointments for the same day
                     </p>
                  </div>
                  <Switch
                     checked={settings.allowSameDayBookings}
                     onCheckedChange={(checked) =>
                        handleChange("allowSameDayBookings", checked)
                     }
                  />
               </div>

               <div className="space-y-2">
                  <Label htmlFor="requireAdvanceNotice">
                     Advance Notice Required (hours)
                  </Label>
                  <Input
                     id="requireAdvanceNotice"
                     type="number"
                     value={settings.requireAdvanceNotice}
                     onChange={(e) =>
                        handleChange(
                           "requireAdvanceNotice",
                           parseInt(e.target.value)
                        )
                     }
                     min={0}
                     max={168}
                  />
                  <p className="text-sm text-muted-foreground">
                     Minimum notice required before an appointment can be booked
                  </p>
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Auto-Confirm Appointments</Label>
                     <p className="text-sm text-muted-foreground">
                        Automatically confirm appointments without manual
                        approval
                     </p>
                  </div>
                  <Switch
                     checked={settings.autoConfirmAppointments}
                     onCheckedChange={(checked) =>
                        handleChange("autoConfirmAppointments", checked)
                     }
                  />
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Cancellation Policy
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="cancellationPolicy">
                     Cancellation Policy
                  </Label>
                  <Textarea
                     id="cancellationPolicy"
                     value={settings.cancellationPolicy}
                     onChange={(e) =>
                        handleChange("cancellationPolicy", e.target.value)
                     }
                     rows={4}
                     placeholder="Enter your cancellation policy..."
                  />
                  <p className="text-sm text-muted-foreground">
                     This policy will be shown to patients when they book
                     appointments
                  </p>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Reminders & Notifications
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="reminderTiming">
                     Appointment Reminder Timing (hours before)
                  </Label>
                  <Input
                     id="reminderTiming"
                     type="number"
                     value={settings.reminderTiming}
                     onChange={(e) =>
                        handleChange("reminderTiming", parseInt(e.target.value))
                     }
                     min={1}
                     max={72}
                  />
                  <p className="text-sm text-muted-foreground">
                     When to send appointment reminders to patients
                  </p>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Current Settings Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <Label className="text-sm font-medium">
                        Appointment Duration
                     </Label>
                     <p className="text-sm text-muted-foreground">
                        {
                           appointmentDurationOptions.find(
                              (opt) =>
                                 opt.value === settings.appointmentDuration
                           )?.label
                        }
                     </p>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-sm font-medium">Buffer Time</Label>
                     <p className="text-sm text-muted-foreground">
                        {settings.bufferTime} minutes
                     </p>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-sm font-medium">
                        Max Patients/Day
                     </Label>
                     <p className="text-sm text-muted-foreground">
                        {settings.maxPatientsPerDay} patients
                     </p>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-sm font-medium">
                        Advance Notice
                     </Label>
                     <p className="text-sm text-muted-foreground">
                        {settings.requireAdvanceNotice} hours
                     </p>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-sm font-medium">
                        Same-Day Bookings
                     </Label>
                     <p className="text-sm text-muted-foreground">
                        {settings.allowSameDayBookings
                           ? "Allowed"
                           : "Not Allowed"}
                     </p>
                  </div>
                  <div className="space-y-2">
                     <Label className="text-sm font-medium">Auto-Confirm</Label>
                     <p className="text-sm text-muted-foreground">
                        {settings.autoConfirmAppointments
                           ? "Enabled"
                           : "Manual Approval"}
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
