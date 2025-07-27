"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, Users } from "lucide-react";
import { type SecuritySettings as SecuritySettingsType } from "./mockData";

interface SecuritySettingsProps {
   settings: SecuritySettingsType;
   onSettingsChange: (settings: SecuritySettingsType) => void;
}

export function SecuritySettings({
   settings,
   onSettingsChange,
}: SecuritySettingsProps) {
   const handleChange = (
      key: keyof SecuritySettingsType,
      value: string | boolean | number | string[]
   ) => {
      onSettingsChange({ ...settings, [key]: value });
   };

   const addIpToWhitelist = () => {
      const ip = prompt("Enter IP address to whitelist:");
      if (ip && !settings.ipWhitelist.includes(ip)) {
         handleChange("ipWhitelist", [...settings.ipWhitelist, ip]);
      }
   };

   const removeIpFromWhitelist = (ip: string) => {
      handleChange(
         "ipWhitelist",
         settings.ipWhitelist.filter((i) => i !== ip)
      );
   };

   const addDomain = () => {
      const domain = prompt("Enter domain to allow:");
      if (domain && !settings.allowedDomains.includes(domain)) {
         handleChange("allowedDomains", [...settings.allowedDomains, domain]);
      }
   };

   const removeDomain = (domain: string) => {
      handleChange(
         "allowedDomains",
         settings.allowedDomains.filter((d) => d !== domain)
      );
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Security Settings</h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Authentication */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Lock className="h-4 w-4" />
                     Authentication
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="twoFactorAuth"
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                           handleChange("twoFactorAuth", checked)
                        }
                     />
                     <Label htmlFor="twoFactorAuth">
                        Enable Two-Factor Authentication
                     </Label>
                  </div>

                  <div>
                     <Label htmlFor="sessionTimeout">
                        Session Timeout (minutes)
                     </Label>
                     <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) =>
                           handleChange(
                              "sessionTimeout",
                              parseInt(e.target.value)
                           )
                        }
                        min={5}
                        max={1440}
                     />
                  </div>

                  <div>
                     <Label htmlFor="passwordMinLength">
                        Minimum Password Length
                     </Label>
                     <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) =>
                           handleChange(
                              "passwordMinLength",
                              parseInt(e.target.value)
                           )
                        }
                        min={6}
                        max={32}
                     />
                  </div>

                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="requireSpecialChars"
                        checked={settings.requireSpecialChars}
                        onCheckedChange={(checked) =>
                           handleChange("requireSpecialChars", checked)
                        }
                     />
                     <Label htmlFor="requireSpecialChars">
                        Require Special Characters
                     </Label>
                  </div>
               </CardContent>
            </Card>

            {/* Access Control */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Users className="h-4 w-4" />
                     Access Control
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <Label htmlFor="maxLoginAttempts">
                        Maximum Login Attempts
                     </Label>
                     <Input
                        id="maxLoginAttempts"
                        type="number"
                        value={settings.maxLoginAttempts}
                        onChange={(e) =>
                           handleChange(
                              "maxLoginAttempts",
                              parseInt(e.target.value)
                           )
                        }
                        min={1}
                        max={10}
                     />
                  </div>

                  <div>
                     <Label htmlFor="lockoutDuration">
                        Lockout Duration (minutes)
                     </Label>
                     <Input
                        id="lockoutDuration"
                        type="number"
                        value={settings.lockoutDuration}
                        onChange={(e) =>
                           handleChange(
                              "lockoutDuration",
                              parseInt(e.target.value)
                           )
                        }
                        min={1}
                        max={1440}
                     />
                  </div>
               </CardContent>
            </Card>

            {/* IP Whitelist */}
            <Card>
               <CardHeader>
                  <CardTitle>IP Whitelist</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {settings.ipWhitelist.map((ip, index) => (
                        <div
                           key={index}
                           className="flex items-center justify-between p-2 border rounded">
                           <span className="font-mono text-sm">{ip}</span>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeIpFromWhitelist(ip)}>
                              Remove
                           </Button>
                        </div>
                     ))}
                     {settings.ipWhitelist.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                           No IP addresses whitelisted
                        </p>
                     )}
                  </div>
                  <Button variant="outline" onClick={addIpToWhitelist}>
                     Add IP Address
                  </Button>
               </CardContent>
            </Card>

            {/* Allowed Domains */}
            <Card>
               <CardHeader>
                  <CardTitle>Allowed Domains</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     {settings.allowedDomains.map((domain, index) => (
                        <div
                           key={index}
                           className="flex items-center justify-between p-2 border rounded">
                           <span className="text-sm">{domain}</span>
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeDomain(domain)}>
                              Remove
                           </Button>
                        </div>
                     ))}
                  </div>
                  <Button variant="outline" onClick={addDomain}>
                     Add Domain
                  </Button>
               </CardContent>
            </Card>
         </div>

         {/* Security Summary */}
         <Card>
            <CardHeader>
               <CardTitle>Security Summary</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                     <p className="font-medium">Authentication</p>
                     <p className="text-muted-foreground">
                        {settings.twoFactorAuth
                           ? "2FA Enabled"
                           : "2FA Disabled"}
                     </p>
                  </div>
                  <div>
                     <p className="font-medium">Session Management</p>
                     <p className="text-muted-foreground">
                        {settings.sessionTimeout} minute timeout
                     </p>
                  </div>
                  <div>
                     <p className="font-medium">Access Control</p>
                     <p className="text-muted-foreground">
                        {settings.maxLoginAttempts} max attempts,{" "}
                        {settings.lockoutDuration} min lockout
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
