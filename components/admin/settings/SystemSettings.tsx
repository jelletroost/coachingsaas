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
import { Globe, Settings } from "lucide-react";
import {
   currencyOptions,
   dateFormatOptions,
   timezoneOptions,
   type SystemSettings as SystemSettingsType,
} from "./mockData";

interface SystemSettingsProps {
   settings: SystemSettingsType;
   onSettingsChange: (settings: SystemSettingsType) => void;
}

export function SystemSettings({
   settings,
   onSettingsChange,
}: SystemSettingsProps) {
   const handleChange = (
      key: keyof SystemSettingsType,
      value: string | boolean | number
   ) => {
      onSettingsChange({ ...settings, [key]: value });
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h2 className="text-xl font-semibold">System Settings</h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Site Information */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Globe className="h-4 w-4" />
                     Site Information
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <Label htmlFor="siteName">Site Name</Label>
                     <Input
                        id="siteName"
                        value={settings.siteName}
                        onChange={(e) =>
                           handleChange("siteName", e.target.value)
                        }
                        placeholder="Enter site name"
                     />
                  </div>

                  <div>
                     <Label htmlFor="siteDescription">Site Description</Label>
                     <Textarea
                        id="siteDescription"
                        value={settings.siteDescription}
                        onChange={(e) =>
                           handleChange("siteDescription", e.target.value)
                        }
                        placeholder="Enter site description"
                        rows={3}
                     />
                  </div>

                  <div>
                     <Label htmlFor="contactEmail">Contact Email</Label>
                     <Input
                        id="contactEmail"
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) =>
                           handleChange("contactEmail", e.target.value)
                        }
                        placeholder="admin@example.com"
                     />
                  </div>

                  <div>
                     <Label htmlFor="supportPhone">Support Phone</Label>
                     <Input
                        id="supportPhone"
                        value={settings.supportPhone}
                        onChange={(e) =>
                           handleChange("supportPhone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                     />
                  </div>
               </CardContent>
            </Card>

            {/* Regional Settings */}
            <Card>
               <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <Label htmlFor="timezone">Timezone</Label>
                     <Select
                        value={settings.timezone}
                        onValueChange={(value) =>
                           handleChange("timezone", value)
                        }>
                        <SelectTrigger>
                           <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                           {timezoneOptions.map((option) => (
                              <SelectItem
                                 key={option.value}
                                 value={option.value}>
                                 {option.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div>
                     <Label htmlFor="dateFormat">Date Format</Label>
                     <Select
                        value={settings.dateFormat}
                        onValueChange={(value) =>
                           handleChange("dateFormat", value)
                        }>
                        <SelectTrigger>
                           <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                           {dateFormatOptions.map((option) => (
                              <SelectItem
                                 key={option.value}
                                 value={option.value}>
                                 {option.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  <div>
                     <Label htmlFor="currency">Currency</Label>
                     <Select
                        value={settings.currency}
                        onValueChange={(value) =>
                           handleChange("currency", value)
                        }>
                        <SelectTrigger>
                           <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                           {currencyOptions.map((option) => (
                              <SelectItem
                                 key={option.value}
                                 value={option.value}>
                                 {option.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
               </CardContent>
            </Card>

            {/* System Controls */}
            <Card>
               <CardHeader>
                  <CardTitle>System Controls</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                           Enable maintenance mode to restrict access
                        </p>
                     </div>
                     <Switch
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) =>
                           handleChange("maintenanceMode", checked)
                        }
                     />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label>Allow Registration</Label>
                        <p className="text-sm text-muted-foreground">
                           Allow new users to register
                        </p>
                     </div>
                     <Switch
                        checked={settings.allowRegistration}
                        onCheckedChange={(checked) =>
                           handleChange("allowRegistration", checked)
                        }
                     />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label>Require Email Verification</Label>
                        <p className="text-sm text-muted-foreground">
                           Require email verification for new accounts
                        </p>
                     </div>
                     <Switch
                        checked={settings.requireEmailVerification}
                        onCheckedChange={(checked) =>
                           handleChange("requireEmailVerification", checked)
                        }
                     />
                  </div>
               </CardContent>
            </Card>

            {/* Preview */}
            <Card>
               <CardHeader>
                  <CardTitle>Site Preview</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                     <h3 className="font-semibold">{settings.siteName}</h3>
                     <p className="text-sm text-muted-foreground mt-1">
                        {settings.siteDescription}
                     </p>
                     <div className="mt-2 text-xs text-muted-foreground">
                        <p>Contact: {settings.contactEmail}</p>
                        <p>Support: {settings.supportPhone}</p>
                        <p>Timezone: {settings.timezone}</p>
                        <p>Currency: {settings.currency}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
