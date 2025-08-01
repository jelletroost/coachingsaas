"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type CoachNotificationSettings } from "./mockData";

interface NotificationSettingsProps {
   settings: CoachNotificationSettings;
   onSettingsChange: (settings: CoachNotificationSettings) => void;
}

export function NotificationSettings({
   settings,
   onSettingsChange,
}: NotificationSettingsProps) {
   const handleChange = (
      field: keyof CoachNotificationSettings,
      value: boolean
   ) => {
      onSettingsChange({
         ...settings,
         [field]: value,
      });
   };

   return (
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <CardTitle>Notification Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Email Notifications</Label>
                     <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                     </p>
                  </div>
                  <Switch
                     checked={settings.emailNotifications}
                     onCheckedChange={(checked) =>
                        handleChange("emailNotifications", checked)
                     }
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>SMS Notifications</Label>
                     <p className="text-sm text-muted-foreground">
                        Receive notifications via text message
                     </p>
                  </div>
                  <Switch
                     checked={settings.smsNotifications}
                     onCheckedChange={(checked) =>
                        handleChange("smsNotifications", checked)
                     }
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Push Notifications</Label>
                     <p className="text-sm text-muted-foreground">
                        Receive notifications in the app
                     </p>
                  </div>
                  <Switch
                     checked={settings.pushNotifications}
                     onCheckedChange={(checked) =>
                        handleChange("pushNotifications", checked)
                     }
                  />
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Patient & Appointment Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>New Patient Alerts</Label>
                     <p className="text-sm text-muted-foreground">
                        Notify when a new patient registers
                     </p>
                  </div>
                  <Switch
                     checked={settings.newPatientAlerts}
                     onCheckedChange={(checked) =>
                        handleChange("newPatientAlerts", checked)
                     }
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Appointment Reminders</Label>
                     <p className="text-sm text-muted-foreground">
                        Send reminders for upcoming appointments
                     </p>
                  </div>
                  <Switch
                     checked={settings.appointmentReminders}
                     onCheckedChange={(checked) =>
                        handleChange("appointmentReminders", checked)
                     }
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Message Notifications</Label>
                     <p className="text-sm text-muted-foreground">
                        Notify when patients send messages
                     </p>
                  </div>
                  <Switch
                     checked={settings.messageNotifications}
                     onCheckedChange={(checked) =>
                        handleChange("messageNotifications", checked)
                     }
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Payment Notifications</Label>
                     <p className="text-sm text-muted-foreground">
                        Notify when payments are received
                     </p>
                  </div>
                  <Switch
                     checked={settings.paymentNotifications}
                     onCheckedChange={(checked) =>
                        handleChange("paymentNotifications", checked)
                     }
                  />
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Reports & Marketing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Weekly Reports</Label>
                     <p className="text-sm text-muted-foreground">
                        Receive weekly performance reports
                     </p>
                  </div>
                  <Switch
                     checked={settings.weeklyReports}
                     onCheckedChange={(checked) =>
                        handleChange("weeklyReports", checked)
                     }
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Marketing Emails</Label>
                     <p className="text-sm text-muted-foreground">
                        Receive promotional and marketing emails
                     </p>
                  </div>
                  <Switch
                     checked={settings.marketingEmails}
                     onCheckedChange={(checked) =>
                        handleChange("marketingEmails", checked)
                     }
                  />
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
