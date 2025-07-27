"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Database, Globe, Save, Settings, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { IntegrationSettings } from "./IntegrationSettings";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import { SystemSettings } from "./SystemSettings";
import {
   defaultIntegrationSettings,
   defaultNotificationSettings,
   defaultSecuritySettings,
   defaultSystemSettings,
   type IntegrationSettings as IntegrationSettingsType,
   type NotificationSettings as NotificationSettingsType,
   type SecuritySettings as SecuritySettingsType,
   type SystemSettings as SystemSettingsType,
} from "./mockData";

export function AdminSettings() {
   const [systemSettings, setSystemSettings] = useState<SystemSettingsType>(
      defaultSystemSettings
   );
   const [notificationSettings, setNotificationSettings] =
      useState<NotificationSettingsType>(defaultNotificationSettings);
   const [securitySettings, setSecuritySettings] =
      useState<SecuritySettingsType>(defaultSecuritySettings);
   const [integrationSettings, setIntegrationSettings] =
      useState<IntegrationSettingsType>(defaultIntegrationSettings);
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

   const handleSystemSettingsChange = (settings: SystemSettingsType) => {
      setSystemSettings(settings);
   };

   const handleNotificationSettingsChange = (
      settings: NotificationSettingsType
   ) => {
      setNotificationSettings(settings);
   };

   const handleSecuritySettingsChange = (settings: SecuritySettingsType) => {
      setSecuritySettings(settings);
   };

   const handleIntegrationSettingsChange = (
      settings: IntegrationSettingsType
   ) => {
      setIntegrationSettings(settings);
   };

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-3xl font-bold">Admin Settings</h1>
               <p className="text-muted-foreground">
                  Manage your platform configuration and preferences
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
                     System Status
                  </CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Badge
                        variant={
                           systemSettings.maintenanceMode
                              ? "destructive"
                              : "default"
                        }>
                        {systemSettings.maintenanceMode
                           ? "Maintenance"
                           : "Active"}
                     </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                     {systemSettings.maintenanceMode
                        ? "Site is in maintenance mode"
                        : "Site is running normally"}
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
                     Integrations
                  </CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="flex items-center gap-2">
                     <Badge
                        variant={
                           integrationSettings.stripeEnabled
                              ? "default"
                              : "secondary"
                        }>
                        {integrationSettings.stripeEnabled
                           ? "Stripe Active"
                           : "Stripe Inactive"}
                     </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                     Email: {integrationSettings.emailProvider}
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Settings Tabs */}
         <Tabs defaultValue="system" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="system" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  System
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
                  value="integrations"
                  className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Integrations
               </TabsTrigger>
            </TabsList>

            <TabsContent value="system" className="space-y-6">
               <SystemSettings
                  settings={systemSettings}
                  onSettingsChange={handleSystemSettingsChange}
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

            <TabsContent value="integrations" className="space-y-6">
               <IntegrationSettings
                  settings={integrationSettings}
                  onSettingsChange={handleIntegrationSettingsChange}
               />
            </TabsContent>
         </Tabs>
      </div>
   );
}
