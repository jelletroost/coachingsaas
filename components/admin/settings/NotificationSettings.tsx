"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { type NotificationSettings as NotificationSettingsType } from "./mockData";

interface NotificationSettingsProps {
   settings: NotificationSettingsType;
   onSettingsChange: (settings: NotificationSettingsType) => void;
}

export function NotificationSettings({
   settings,
   onSettingsChange,
}: NotificationSettingsProps) {
   const handleChange = (
      key: keyof NotificationSettingsType,
      value: boolean
   ) => {
      onSettingsChange({ ...settings, [key]: value });
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Notification Settings</h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Notifications */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Mail className="h-4 w-4" />
                     Email Notifications
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                           handleChange(
                              "emailNotifications",
                              checked as boolean
                           )
                        }
                     />
                     <Label htmlFor="emailNotifications">
                        Enable Email Notifications
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="newUserAlerts"
                        checked={settings.newUserAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("newUserAlerts", checked as boolean)
                        }
                        disabled={!settings.emailNotifications}
                     />
                     <Label htmlFor="newUserAlerts">
                        New User Registration Alerts
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="paymentAlerts"
                        checked={settings.paymentAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("paymentAlerts", checked as boolean)
                        }
                        disabled={!settings.emailNotifications}
                     />
                     <Label htmlFor="paymentAlerts">
                        Payment Processing Alerts
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="systemAlerts"
                        checked={settings.systemAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("systemAlerts", checked as boolean)
                        }
                        disabled={!settings.emailNotifications}
                     />
                     <Label htmlFor="systemAlerts">System Error Alerts</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="marketingEmails"
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) =>
                           handleChange("marketingEmails", checked as boolean)
                        }
                        disabled={!settings.emailNotifications}
                     />
                     <Label htmlFor="marketingEmails">
                        Marketing & Promotional Emails
                     </Label>
                  </div>
               </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Smartphone className="h-4 w-4" />
                     SMS Notifications
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) =>
                           handleChange("smsNotifications", checked as boolean)
                        }
                     />
                     <Label htmlFor="smsNotifications">
                        Enable SMS Notifications
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="paymentAlertsSMS"
                        checked={settings.paymentAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("paymentAlerts", checked as boolean)
                        }
                        disabled={!settings.smsNotifications}
                     />
                     <Label htmlFor="paymentAlertsSMS">
                        Payment Alerts (SMS)
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="systemAlertsSMS"
                        checked={settings.systemAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("systemAlerts", checked as boolean)
                        }
                        disabled={!settings.smsNotifications}
                     />
                     <Label htmlFor="systemAlertsSMS">
                        Critical System Alerts (SMS)
                     </Label>
                  </div>
               </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Bell className="h-4 w-4" />
                     Push Notifications
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) =>
                           handleChange("pushNotifications", checked as boolean)
                        }
                     />
                     <Label htmlFor="pushNotifications">
                        Enable Push Notifications
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="newUserAlertsPush"
                        checked={settings.newUserAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("newUserAlerts", checked as boolean)
                        }
                        disabled={!settings.pushNotifications}
                     />
                     <Label htmlFor="newUserAlertsPush">
                        New User Alerts (Push)
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="paymentAlertsPush"
                        checked={settings.paymentAlerts}
                        onCheckedChange={(checked) =>
                           handleChange("paymentAlerts", checked as boolean)
                        }
                        disabled={!settings.pushNotifications}
                     />
                     <Label htmlFor="paymentAlertsPush">
                        Payment Alerts (Push)
                     </Label>
                  </div>
               </CardContent>
            </Card>

            {/* Reports */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <MessageSquare className="h-4 w-4" />
                     Automated Reports
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="weeklyReports"
                        checked={settings.weeklyReports}
                        onCheckedChange={(checked) =>
                           handleChange("weeklyReports", checked as boolean)
                        }
                     />
                     <Label htmlFor="weeklyReports">
                        Weekly Performance Reports
                     </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="monthlyReports"
                        checked={settings.monthlyReports}
                        onCheckedChange={(checked) =>
                           handleChange("monthlyReports", checked as boolean)
                        }
                     />
                     <Label htmlFor="monthlyReports">
                        Monthly Analytics Reports
                     </Label>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Notification Summary */}
         <Card>
            <CardHeader>
               <CardTitle>Notification Summary</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                     <p className="font-medium">Email</p>
                     <p className="text-muted-foreground">
                        {settings.emailNotifications ? "Enabled" : "Disabled"}
                     </p>
                  </div>
                  <div>
                     <p className="font-medium">SMS</p>
                     <p className="text-muted-foreground">
                        {settings.smsNotifications ? "Enabled" : "Disabled"}
                     </p>
                  </div>
                  <div>
                     <p className="font-medium">Push</p>
                     <p className="text-muted-foreground">
                        {settings.pushNotifications ? "Enabled" : "Disabled"}
                     </p>
                  </div>
                  <div>
                     <p className="font-medium">Reports</p>
                     <p className="text-muted-foreground">
                        {settings.weeklyReports || settings.monthlyReports
                           ? "Scheduled"
                           : "Disabled"}
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
