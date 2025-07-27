"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { CreditCard, Database, Mail, Smartphone } from "lucide-react";
import {
   emailProviderOptions,
   smsProviderOptions,
   type IntegrationSettings as IntegrationSettingsType,
} from "./mockData";

interface IntegrationSettingsProps {
   settings: IntegrationSettingsType;
   onSettingsChange: (settings: IntegrationSettingsType) => void;
}

export function IntegrationSettings({
   settings,
   onSettingsChange,
}: IntegrationSettingsProps) {
   const handleChange = (
      key: keyof IntegrationSettingsType,
      value: string | boolean
   ) => {
      onSettingsChange({ ...settings, [key]: value });
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Integration Settings</h2>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Integration */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <CreditCard className="h-4 w-4" />
                     Payment Integration (Stripe)
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Checkbox
                        id="stripeEnabled"
                        checked={settings.stripeEnabled}
                        onCheckedChange={(checked) =>
                           handleChange("stripeEnabled", checked as boolean)
                        }
                     />
                     <Label htmlFor="stripeEnabled">
                        Enable Stripe Payments
                     </Label>
                  </div>

                  <div>
                     <Label htmlFor="stripePublishableKey">
                        Publishable Key
                     </Label>
                     <Input
                        id="stripePublishableKey"
                        type="password"
                        value={settings.stripePublishableKey}
                        onChange={(e) =>
                           handleChange("stripePublishableKey", e.target.value)
                        }
                        placeholder="pk_test_..."
                        disabled={!settings.stripeEnabled}
                     />
                  </div>

                  <div>
                     <Label htmlFor="stripeSecretKey">Secret Key</Label>
                     <Input
                        id="stripeSecretKey"
                        type="password"
                        value={settings.stripeSecretKey}
                        onChange={(e) =>
                           handleChange("stripeSecretKey", e.target.value)
                        }
                        placeholder="sk_test_..."
                        disabled={!settings.stripeEnabled}
                     />
                  </div>

                  <div className="pt-2">
                     <Button
                        variant="outline"
                        size="sm"
                        disabled={!settings.stripeEnabled}>
                        Test Connection
                     </Button>
                  </div>
               </CardContent>
            </Card>

            {/* Email Integration */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Mail className="h-4 w-4" />
                     Email Integration
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <Label htmlFor="emailProvider">Email Provider</Label>
                     <Select
                        value={settings.emailProvider}
                        onValueChange={(value) =>
                           handleChange("emailProvider", value)
                        }>
                        <SelectTrigger>
                           <SelectValue placeholder="Select email provider" />
                        </SelectTrigger>
                        <SelectContent>
                           {emailProviderOptions.map((option) => (
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
                     <Label htmlFor="emailApiKey">API Key</Label>
                     <Input
                        id="emailApiKey"
                        type="password"
                        value={settings.emailApiKey}
                        onChange={(e) =>
                           handleChange("emailApiKey", e.target.value)
                        }
                        placeholder="Enter API key"
                     />
                  </div>

                  <div>
                     <Label htmlFor="emailFromAddress">From Address</Label>
                     <Input
                        id="emailFromAddress"
                        type="email"
                        value={settings.emailFromAddress}
                        onChange={(e) =>
                           handleChange("emailFromAddress", e.target.value)
                        }
                        placeholder="noreply@example.com"
                     />
                  </div>

                  <div className="pt-2">
                     <Button variant="outline" size="sm">
                        Test Email
                     </Button>
                  </div>
               </CardContent>
            </Card>

            {/* SMS Integration */}
            <Card>
               <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                     <Smartphone className="h-4 w-4" />
                     SMS Integration
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div>
                     <Label htmlFor="smsProvider">SMS Provider</Label>
                     <Select
                        value={settings.smsProvider}
                        onValueChange={(value) =>
                           handleChange("smsProvider", value)
                        }>
                        <SelectTrigger>
                           <SelectValue placeholder="Select SMS provider" />
                        </SelectTrigger>
                        <SelectContent>
                           {smsProviderOptions.map((option) => (
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
                     <Label htmlFor="smsApiKey">API Key</Label>
                     <Input
                        id="smsApiKey"
                        type="password"
                        value={settings.smsApiKey}
                        onChange={(e) =>
                           handleChange("smsApiKey", e.target.value)
                        }
                        placeholder="Enter API key"
                     />
                  </div>

                  <div>
                     <Label htmlFor="smsFromNumber">From Number</Label>
                     <Input
                        id="smsFromNumber"
                        value={settings.smsFromNumber}
                        onChange={(e) =>
                           handleChange("smsFromNumber", e.target.value)
                        }
                        placeholder="+1234567890"
                     />
                  </div>

                  <div className="pt-2">
                     <Button variant="outline" size="sm">
                        Test SMS
                     </Button>
                  </div>
               </CardContent>
            </Card>

            {/* Integration Status */}
            <Card>
               <CardHeader>
                  <CardTitle>Integration Status</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Stripe</span>
                        <div
                           className={`w-3 h-3 rounded-full ${
                              settings.stripeEnabled
                                 ? "bg-green-500"
                                 : "bg-gray-300"
                           }`}></div>
                     </div>

                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                           Email ({settings.emailProvider})
                        </span>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     </div>

                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                           SMS ({settings.smsProvider})
                        </span>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                     </div>
                  </div>

                  <div className="pt-4">
                     <Button className="w-full">Test All Integrations</Button>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Security Note */}
         <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
               <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                     <h4 className="font-medium text-orange-900">
                        Security Notice
                     </h4>
                     <p className="text-sm text-orange-800 mt-1">
                        API keys and sensitive credentials are encrypted and
                        stored securely. Never share these credentials or commit
                        them to version control.
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
