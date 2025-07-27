"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Clock, Key, Lock, Shield } from "lucide-react";
import { type CoachSecuritySettings } from "./mockData";

interface SecuritySettingsProps {
   settings: CoachSecuritySettings;
   onSettingsChange: (settings: CoachSecuritySettings) => void;
}

export function SecuritySettings({
   settings,
   onSettingsChange,
}: SecuritySettingsProps) {
   const handleChange = (field: keyof CoachSecuritySettings, value: any) => {
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
                  <Shield className="h-5 w-5" />
                  Two-Factor Authentication
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Enable 2FA</Label>
                     <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                     </p>
                  </div>
                  <Switch
                     checked={settings.twoFactorAuth}
                     onCheckedChange={(checked) =>
                        handleChange("twoFactorAuth", checked)
                     }
                  />
               </div>
               {settings.twoFactorAuth && (
                  <div className="p-4 bg-muted rounded-lg">
                     <p className="text-sm text-muted-foreground">
                        Two-factor authentication is enabled. You&apos;ll need
                        to enter a code from your authenticator app when signing
                        in.
                     </p>
                  </div>
               )}
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Session Management
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                     Session Timeout (minutes)
                  </Label>
                  <Input
                     id="sessionTimeout"
                     type="number"
                     value={settings.sessionTimeout}
                     onChange={(e) =>
                        handleChange("sessionTimeout", parseInt(e.target.value))
                     }
                     min={5}
                     max={480}
                  />
                  <p className="text-sm text-muted-foreground">
                     Automatically log out after this many minutes of inactivity
                  </p>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Password Requirements
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
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
                     max={50}
                  />
               </div>

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label>Require Special Characters</Label>
                     <p className="text-sm text-muted-foreground">
                        Passwords must include special characters (!@#$%^&*)
                     </p>
                  </div>
                  <Switch
                     checked={settings.requireSpecialChars}
                     onCheckedChange={(checked) =>
                        handleChange("requireSpecialChars", checked)
                     }
                  />
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Login Protection
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
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
                     min={3}
                     max={10}
                  />
                  <p className="text-sm text-muted-foreground">
                     Account will be temporarily locked after this many failed
                     attempts
                  </p>
               </div>

               <div className="space-y-2">
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
                     min={5}
                     max={1440}
                  />
                  <p className="text-sm text-muted-foreground">
                     How long the account remains locked after too many failed
                     attempts
                  </p>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Current Security Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Badge
                     variant={settings.twoFactorAuth ? "default" : "secondary"}>
                     {settings.twoFactorAuth ? "Enabled" : "Disabled"}
                  </Badge>
               </div>
               <div className="flex items-center justify-between">
                  <span>Session Timeout</span>
                  <Badge variant="outline">
                     {settings.sessionTimeout} minutes
                  </Badge>
               </div>
               <div className="flex items-center justify-between">
                  <span>Password Requirements</span>
                  <Badge variant="outline">
                     {settings.passwordMinLength} chars min
                     {settings.requireSpecialChars && " + special chars"}
                  </Badge>
               </div>
               <div className="flex items-center justify-between">
                  <span>Login Protection</span>
                  <Badge variant="outline">
                     {settings.maxLoginAttempts} attempts,{" "}
                     {settings.lockoutDuration} min lockout
                  </Badge>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
