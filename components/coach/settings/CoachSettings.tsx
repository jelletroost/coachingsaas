"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Clock, Save, Shield, User } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AppointmentSettings } from "./AppointmentSettings";
import {
   defaultCoachAppointmentSettings,
   defaultCoachNotificationSettings,
   defaultCoachProfileSettings,
   defaultCoachSecuritySettings,
   type CoachAppointmentSettings,
   type CoachNotificationSettings,
   type CoachProfileSettings,
   type CoachSecuritySettings,
} from "./mockData";
import { NotificationSettings } from "./NotificationSettings";
import { ProfileSettings } from "./ProfileSettings";
import { SecuritySettings } from "./SecuritySettings";

export function CoachSettings() {
   const [profileSettings, setProfileSettings] = useState<CoachProfileSettings>(
      defaultCoachProfileSettings
   );
   const [notificationSettings, setNotificationSettings] =
      useState<CoachNotificationSettings>(defaultCoachNotificationSettings);
   const [securitySettings, setSecuritySettings] =
      useState<CoachSecuritySettings>(defaultCoachSecuritySettings);
   const [appointmentSettings, setAppointmentSettings] =
      useState<CoachAppointmentSettings>(defaultCoachAppointmentSettings);
   const [isSaving, setIsSaving] = useState(false);

   const handleSaveAll = async () => {
      setIsSaving(true);
      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 1000));

         toast.success("All settings have been saved successfully!");
      } catch {
         toast.error("Failed to save settings. Please try again.");
      } finally {
         setIsSaving(false);
      }
   };

   const handleProfileSettingsChange = (settings: CoachProfileSettings) => {
      setProfileSettings(settings);
   };

   const handleNotificationSettingsChange = (
      settings: CoachNotificationSettings
   ) => {
      setNotificationSettings(settings);
   };

   const handleSecuritySettingsChange = (settings: CoachSecuritySettings) => {
      setSecuritySettings(settings);
   };

   const handleAppointmentSettingsChange = (
      settings: CoachAppointmentSettings
   ) => {
      setAppointmentSettings(settings);
   };

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold">Coach Settings</h1>
               <p className="text-muted-foreground">
                  Manage your profile, preferences, and account settings
               </p>
            </div>
            <Button onClick={handleSaveAll} disabled={isSaving}>
               <Save className="h-4 w-4 mr-2" />
               {isSaving ? "Saving..." : "Save All Changes"}
            </Button>
         </div>

         {/* Settings Overview Cards */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Profile Status
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Badge variant="default">
                        {profileSettings.specialization.length} Specializations
                     </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                     {profileSettings.yearsOfExperience} years experience
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Security
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Badge
                        variant={
                           securitySettings.twoFactorAuth
                              ? "default"
                              : "secondary"
                        }>
                        {securitySettings.twoFactorAuth
                           ? "2FA Enabled"
                           : "2FA Disabled"}
                     </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                     Session timeout: {securitySettings.sessionTimeout} minutes
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Notifications
                  </CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Badge
                        variant={
                           notificationSettings.emailNotifications
                              ? "default"
                              : "secondary"
                        }>
                        {notificationSettings.emailNotifications
                           ? "Email On"
                           : "Email Off"}
                     </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                     {notificationSettings.smsNotifications
                        ? "SMS enabled"
                        : "SMS disabled"}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Appointments
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Badge variant="outline">
                        {appointmentSettings.appointmentDuration} min
                     </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                     Max {appointmentSettings.maxPatientsPerDay} patients/day
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Settings Tabs */}
         <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
               </TabsTrigger>
               <TabsTrigger
                  value="security"
                  className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security
               </TabsTrigger>
               <TabsTrigger
                  value="notifications"
                  className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
               </TabsTrigger>
               <TabsTrigger
                  value="appointments"
                  className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Appointments
               </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
               <ProfileSettings
                  settings={profileSettings}
                  onSettingsChange={handleProfileSettingsChange}
               />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
               <SecuritySettings
                  settings={securitySettings}
                  onSettingsChange={handleSecuritySettingsChange}
               />
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
               <NotificationSettings
                  settings={notificationSettings}
                  onSettingsChange={handleNotificationSettingsChange}
               />
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
               <AppointmentSettings
                  settings={appointmentSettings}
                  onSettingsChange={handleAppointmentSettingsChange}
               />
            </TabsContent>
         </Tabs>
      </div>
   );
}
